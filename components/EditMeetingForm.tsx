
'use client';

import { useActionState } from 'react';
import { updateMeeting, type State } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

type EditMeetingFormProps = {
  meeting: SacramentMeeting;
};

const initialState: State = {
  message: null,
  errors: {},
};

const inputClass =
  'w-full rounded-md border border-gray-400 bg-white p-2 text-gray-900';

const labelClass =
  'mb-1 block font-medium text-gray-900';

type FieldErrorProps = {
  name: string;
  errors?: Record<string, string[]>;
};

function FieldError({ name, errors }: FieldErrorProps) {
  return (
    <div id={`${name}-error`} aria-live="polite">
      {errors?.[name]?.map((error, index) => (
        <p key={index} className="mt-1 text-sm text-red-700">
          {error}
        </p>
      ))}
    </div>
  );
}


export default function EditMeetingForm({
  meeting,
}: EditMeetingFormProps) {
  const boundAction = updateMeeting.bind(null, meeting.id);

  const [state, formAction, isPending] = useActionState(
    boundAction,
    initialState
  );

  

  function textField(
    name: string,
    label: string,
    value: string | number,
    type = 'text'
  ) {
    return (
      <div>
        <label htmlFor={name} className={labelClass}>
          {label}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={value}
          className={inputClass}
          aria-describedby={`${name}-error`}
          aria-invalid={Boolean(state.errors?.[name]?.length)}
        />
        <FieldError name={name} errors={state.errors} />
      </div>
    );
  }

  function textareaField(
    name: string,
    label: string,
    value: string,
    help: string
  ) {
    return (
      <div>
        <label htmlFor={name} className={labelClass}>
          {label}
        </label>
        <p
          id={`${name}-help`}
          className="mb-2 text-sm text-gray-600"
        >
          {help}
        </p>
        <textarea
          id={name}
          name={name}
          rows={4}
          defaultValue={value}
          className={inputClass}
          aria-describedby={`${name}-help ${name}-error`}
          aria-invalid={Boolean(state.errors?.[name]?.length)}
        />
        <FieldError name={name} errors={state.errors} />
      </div>
    );
  }

  const speakersText = meeting.speakers
    .map((speaker) =>
      `${speaker.name} | ${speaker.topic} | ${speaker.type}`
    )
    .join('\n');

  const wardBusinessText = meeting.wardBusiness
    .map((item) => item.description)
    .join('\n');

  return (
    <form action={formAction} className="max-w-3xl space-y-8">

      <fieldset className="space-y-4">
        <legend className="mb-3 text-xl font-semibold">
          Meeting Details
        </legend>

        {textField('date', 'Meeting Date', meeting.date, 'date')}

        <div>
          <label htmlFor="meetingType" className={labelClass}>
            Meeting Type
          </label>
          <select
            id="meetingType"
            name="meetingType"
            defaultValue={meeting.meetingType}
            className={inputClass}
            aria-describedby="meetingType-error"
            aria-invalid={Boolean(state.errors?.meetingType?.length)}
          >
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>
          <FieldError name="meetingType" errors={state.errors} /><FieldError name="meetingType" />
        </div>

        {textField('presiding', 'Presiding', meeting.presiding)}
        {textField('conducting', 'Conducting', meeting.conducting)}
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-3 text-xl font-semibold">
          Opening
        </legend>

        {textField(
          'openingHymnNumber',
          'Opening Hymn Number',
          meeting.openingHymn.number,
          'number'
        )}
        {textField(
          'openingHymnTitle',
          'Opening Hymn Title',
          meeting.openingHymn.title
        )}
        {textField(
          'openingPrayer',
          'Opening Prayer',
          meeting.openingPrayer
        )}
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-3 text-xl font-semibold">
          Sacrament
        </legend>

        {textField(
          'sacramentHymnNumber',
          'Sacrament Hymn Number',
          meeting.sacramentHymn.number,
          'number'
        )}
        {textField(
          'sacramentHymnTitle',
          'Sacrament Hymn Title',
          meeting.sacramentHymn.title
        )}
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-3 text-xl font-semibold">
          Speakers and Business
        </legend>

        {textareaField(
          'announcements',
          'Announcements',
          (meeting.announcements ?? []).join('\n'),
          'Enter one announcement per line.'
        )}

        {textareaField(
          'wardBusiness',
          'Ward Business',
          wardBusinessText,
          'Enter one ward business item per line.'
        )}

        <div className="flex items-center gap-2">
          <input
            id="stakeBusiness"
            name="stakeBusiness"
            type="checkbox"
            defaultChecked={meeting.stakeBusiness}
          />
          <label htmlFor="stakeBusiness">
            Stake Business Included
          </label>
        </div>

        {textareaField(
          'speakers',
          'Speakers and Musical Numbers',
          speakersText,
          'One per line: Name | Topic | speaker or musical-number'
        )}
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-3 text-xl font-semibold">
          Closing
        </legend>

        {textField(
          'closingHymnNumber',
          'Closing Hymn Number',
          meeting.closingHymn.number,
          'number'
        )}
        {textField(
          'closingHymnTitle',
          'Closing Hymn Title',
          meeting.closingHymn.title
        )}
        {textField(
          'closingPrayer',
          'Closing Prayer',
          meeting.closingPrayer
        )}
      </fieldset>

      <div aria-live="polite">
        {state.message && (
          <p className="text-red-700">{state.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
      >
        {isPending ? 'Updating Meeting...' : 'Save Changes'}
      </button>
    </form>
  );
}
