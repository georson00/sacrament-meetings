
'use client';

import { useActionState } from 'react';
import {
  createMeeting, type State } from '@/lib/actions';

const inputClass =
  'w-full rounded-md border border-gray-400 bg-white p-2 text-gray-900';

const labelClass = 'mb-1 block font-medium text-gray-900';

const initialState: State = {
  message: null,
  errors: {},
};

function FieldError({
  name,
  state,
}: {
  name: string;
  state: State;
}) {
  const errors = state.errors?.[name];

  return (
    <div id={`${name}-error`} aria-live="polite">
      {errors?.map((error, index) => (
        <p key={index} className="mt-1 text-sm text-red-700">
          {error}
        </p>
      ))}
    </div>
  );
}

export default function MeetingForm() {
  const [state, formAction, isPending] = useActionState(
    createMeeting,
    initialState
  );

  const textField = (
    name: string,
    label: string,
    type: string = 'text'
  ) => (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={inputClass}
        aria-describedby={`${name}-error`}
        aria-invalid={Boolean(state.errors?.[name]?.length)}
      />
      <FieldError name={name} state={state} />
    </div>
  );

  const textareaField = (
    name: string,
    label: string,
    help: string
  ) => (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <p id={`${name}-help`} className="mb-2 text-sm text-gray-600">
        {help}
      </p>
      <textarea
        id={name}
        name={name}
        rows={4}
        className={inputClass}
        aria-describedby={`${name}-help ${name}-error`}
        aria-invalid={Boolean(state.errors?.[name]?.length)}
      />
      <FieldError name={name} state={state} />
    </div>
  );

  return (
    <form action={formAction} className="max-w-3xl space-y-8">
      <fieldset className="space-y-4">
        <legend className="mb-3 text-xl font-semibold">
          Meeting Details
        </legend>

        {textField('date', 'Meeting Date', 'date')}

        <div>
          <label htmlFor="meetingType" className={labelClass}>
            Meeting Type
          </label>
          <select
            id="meetingType"
            name="meetingType"
            className={inputClass}
            aria-describedby="meetingType-error"
            aria-invalid={Boolean(state.errors?.meetingType?.length)}
          >
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>
          <FieldError name="meetingType" state={state} />
        </div>

        {textField('presiding', 'Presiding')}
        {textField('conducting', 'Conducting')}
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-3 text-xl font-semibold">
          Opening
        </legend>
        {textField('openingHymnNumber', 'Opening Hymn Number', 'number')}
        {textField('openingHymnTitle', 'Opening Hymn Title')}
        {textField('openingPrayer', 'Opening Prayer')}
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-3 text-xl font-semibold">
          Sacrament
        </legend>
        {textField('sacramentHymnNumber', 'Sacrament Hymn Number', 'number')}
        {textField('sacramentHymnTitle', 'Sacrament Hymn Title')}
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-3 text-xl font-semibold">
          Speakers and Business
        </legend>

        {textareaField(
          'announcements',
          'Announcements',
          'Enter one announcement per line.'
        )}

        {textareaField(
          'wardBusiness',
          'Ward Business',
          'Enter one ward business item per line.'
        )}

        <div className="flex items-center gap-2">
          <input
            id="stakeBusiness"
            name="stakeBusiness"
            type="checkbox"
          />
          <label htmlFor="stakeBusiness">
            Stake Business Included
          </label>
        </div>

        {textareaField(
          'speakers',
          'Speakers and Musical Numbers',
          'One per line: Name | Topic | speaker or musical-number'
        )}
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-3 text-xl font-semibold">
          Closing
        </legend>
        {textField('closingHymnNumber', 'Closing Hymn Number', 'number')}
        {textField('closingHymnTitle', 'Closing Hymn Title')}
        {textField('closingPrayer', 'Closing Prayer')}
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
        {isPending ? 'Creating Meeting...' : 'Create Meeting'}
      </button>
    </form>
  );
}
