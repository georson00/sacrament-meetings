
'use client';

import { useState } from 'react';
import { deleteMeeting } from '@/lib/actions';

interface DeleteMeetingButtonProps {
  meetingId: number;
  meetingDate: string;
}

export default function DeleteMeetingButton({
  meetingId,
  meetingDate,
}: DeleteMeetingButtonProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (showConfirmation) {
    return (
      <div className="mt-3 rounded-md border border-red-300 bg-red-50 p-3">
        <p className="mb-3 text-sm text-gray-900">
          Are you sure you want to delete the meeting on {meetingDate}?
          This action cannot be undone.
        </p>

        <div className="flex flex-wrap gap-2">
          <form action={deleteMeeting}>
            <input type="hidden" name="id" value={meetingId} />
            <button
              type="submit"
              className="rounded-md bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800"
            >
              Yes, Delete
            </button>
          </form>

          <button
            type="button"
            onClick={() => setShowConfirmation(false)}
            className="rounded-md border border-gray-400 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setShowConfirmation(true)}
      className="rounded-md border border-red-600 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
      aria-label={`Delete meeting on ${meetingDate}`}
    >
      Delete
    </button>
  );
}
