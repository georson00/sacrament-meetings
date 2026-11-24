
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
    addMeeting,
    updateMeeting as updateMeetingInDb,
    deleteMeeting as deleteMeetingInDb,
 } from './meetings-db';

import type { SacramentMeeting } from './types';

const requiredText = z.string().trim().min(1, 'This field is required.');



const MeetingFormSchema = z.object({
  date: z.iso.date(),
  meetingType: z.enum([
    'testimony',
    'regular',
    'stake',
    'general',
  ]),
  presiding: requiredText,
  conducting: requiredText,
  openingHymnNumber: z.coerce.number<number>().int().positive(),
  openingHymnTitle: requiredText,
  openingPrayer: requiredText,
  sacramentHymnNumber: z.coerce.number<number>().int().positive(),
  sacramentHymnTitle: requiredText,
  closingHymnNumber: z.coerce.number<number>().int().positive(),
  closingHymnTitle: requiredText,
  closingPrayer: requiredText,
  stakeBusiness: z.boolean(),
  announcements: z.array(z.string()),
  wardBusiness: z.array(
    z.object({ description: requiredText })
  ),
  
speakers: z.array(
  z.object({
    name: requiredText,
    topic: z.string().trim(),
    type: z.enum(['speaker', 'musical-number']),
  }).refine(
    (speaker) =>
      speaker.type === 'musical-number' ||
      speaker.topic.length > 0,
    {
      message: 'A speaker must have a topic.',
      path: ['topic'],
    }
  )
),

});

export type State = {
  message: string | null;
  errors?: Record<string, string[]>;
};


function lines(value: FormDataEntryValue | null): string[] {
  return String(value ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseSpeakers(value: FormDataEntryValue | null) {
  return lines(value).map((line) => {
    const [name = '', topic = '', type = 'speaker'] =
      line.split('|').map((part) => part.trim());

    return { name, topic, type };
  });
}

function getMeetingFormData(formData: FormData) {
  return {
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    openingPrayer: formData.get('openingPrayer'),
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
    closingPrayer: formData.get('closingPrayer'),
    stakeBusiness: formData.get('stakeBusiness') === 'on',
    announcements: lines(formData.get('announcements')),
    wardBusiness: lines(formData.get('wardBusiness')).map(
      (description) => ({ description })
    ),
    speakers: parseSpeakers(formData.get('speakers')),
  };
}


function toMeetingData(
  data: z.infer<typeof MeetingFormSchema>
): Omit<SacramentMeeting, 'id'> {
  return {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    openingHymn: {
      number: data.openingHymnNumber,
      title: data.openingHymnTitle,
    },
    openingPrayer: data.openingPrayer,
    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },
    closingHymn: {
      number: data.closingHymnNumber,
      title: data.closingHymnTitle,
    },
    closingPrayer: data.closingPrayer,
    stakeBusiness: data.stakeBusiness,
    announcements: data.announcements,
    wardBusiness: data.wardBusiness,
    speakers: data.speakers,
  };
}


export async function createMeeting(
  prevState: State,
  formData: FormData
): Promise<State> {
  void prevState;

  const rawData = getMeetingFormData(formData);

  const validated = MeetingFormSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      message: 'Please correct the errors below.',
      errors: z.flattenError(validated.error).fieldErrors,
    };
  }

 const meeting = toMeetingData(validated.data);

  try {
  await addMeeting(meeting);
} catch (error) {
  console.error('Failed to create meeting:', error);

  if (
    error instanceof Error &&
    'code' in error &&
    error.code === '23505'
  ) {
    return {
      message: 'A meeting already exists for this date.',
      errors: {
        date: ['Please choose a different date.'],
      },
    };
  }

  throw new Error(
    'Unable to create the meeting. Please try again.'
  );
}

  revalidatePath('/meetings');
  redirect('/meetings');
}


export async function updateMeeting(
  id: number,
  prevState: State,
  formData: FormData
): Promise<State> {
  void prevState;

  if (!Number.isSafeInteger(id) || id <= 0) {
    return {
      message: 'Invalid meeting ID.',
      errors: {},
    };
  }

  // Reuse the same form-data parsing and validation
  // rules as the create action.
  const rawData = getMeetingFormData(formData);
  const validated = MeetingFormSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      message: 'Please correct the errors below.',
      errors: z.flattenError(validated.error).fieldErrors,
    };
  }

  const data = toMeetingData(validated.data);

  try {
    const updated = await updateMeetingInDb(id, data);

    if (!updated) {
      return {
        message: 'Meeting not found.',
        errors: {},
      };
    }
  } catch (error) {
    console.error('Failed to update meeting:', error);

    if (
      error instanceof Error &&
      'code' in error &&
      error.code === '23505'
    ) {
      return {
        message: 'A meeting already exists for this date.',
        errors: {
          date: ['Please choose a different date.'],
        },
      };
    }

    throw new Error(
      'Unable to update the meeting. Please try again.'
    );
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  redirect('/meetings');
}


export async function deleteMeeting(
  formData: FormData
): Promise<void> {
  const id = Number(formData.get('id'));

  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error('Invalid meeting ID.');
  }

  try {
    const deleted = await deleteMeetingInDb(id);

    if (!deleted) {
      throw new Error('Meeting not found.');
    }
  } catch (error) {
    console.error('Failed to delete meeting:', error);
    throw new Error(
      'Unable to delete the meeting. Please try again.'
    );
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}
