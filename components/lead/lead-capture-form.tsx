"use client";

import type { FormEvent } from "react";
import { useActionState, useEffect, useRef, useState } from "react";
import { submitLead } from "@/app/actions/lead";
import { Button } from "@/components/ui";
import {
  type LeadSubmissionField,
  type LeadSubmissionFieldErrors,
  initialLeadSubmissionState,
  leadSubmissionMaxLengths,
  validateLeadFormData
} from "@/lib/lead";
import { leadHoneypotFieldName } from "@/lib/spam";

const fieldOrder: LeadSubmissionField[] = ["name", "email", "message"];

function fieldErrorId(field: LeadSubmissionField) {
  return `lead-${field}-error`;
}

function fieldHelpId(field: LeadSubmissionField) {
  return `lead-${field}-help`;
}

function describeField(field: LeadSubmissionField, error?: string) {
  return error
    ? `${fieldHelpId(field)} ${fieldErrorId(field)}`
    : fieldHelpId(field);
}

export function LeadCaptureForm() {
  const [state, formAction, isPending] = useActionState(
    submitLead,
    initialLeadSubmissionState
  );
  const [clientErrors, setClientErrors] = useState<LeadSubmissionFieldErrors>(
    {}
  );
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const serverErrors = state.status === "error" ? state.fieldErrors : {};
  const fieldErrors = {
    ...serverErrors,
    ...clientErrors
  };
  const formError = state.status === "error" ? state.formError : undefined;
  const isSuccess = state.status === "success";

  useEffect(() => {
    if (isSuccess) {
      formRef.current?.reset();
    }
  }, [isSuccess]);

  function focusField(field: LeadSubmissionField) {
    if (field === "name") {
      nameRef.current?.focus();
      return;
    }

    if (field === "email") {
      emailRef.current?.focus();
      return;
    }

    messageRef.current?.focus();
  }

  function focusFirstError(errors: LeadSubmissionFieldErrors) {
    const firstInvalidField = fieldOrder.find((field) => errors[field]);

    if (firstInvalidField) {
      focusField(firstInvalidField);
    }
  }

  function clearClientError(field: LeadSubmissionField) {
    setClientErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const validation = validateLeadFormData(new FormData(event.currentTarget));

    if (!validation.ok) {
      event.preventDefault();
      setClientErrors(validation.fieldErrors);
      focusFirstError(validation.fieldErrors);
      return;
    }

    setClientErrors({});
  }

  return (
    <form
      action={formAction}
      className="rounded-lg border border-white/15 bg-white p-5 text-left text-foreground shadow-xl sm:p-6"
      noValidate
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div className="space-y-5">
        <div>
          <h3 className="text-xl font-bold">Start the conversation</h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            Share a few details and the team will follow up on the next software
            move.
          </p>
        </div>

        {formError ? (
          <p
            className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-800"
            role="alert"
          >
            {formError}
          </p>
        ) : null}

        {isSuccess ? (
          <p
            className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800"
            role="status"
          >
            Thank you. Your message was received successfully.
          </p>
        ) : null}

        <div className="hidden" aria-hidden="true">
          <label htmlFor="lead-company">Company</label>
          <input
            autoComplete="off"
            id="lead-company"
            name={leadHoneypotFieldName}
            tabIndex={-1}
            type="text"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold" htmlFor="lead-name">
            Name
          </label>
          <input
            aria-describedby={describeField("name", fieldErrors.name)}
            aria-invalid={fieldErrors.name ? "true" : "false"}
            autoComplete="name"
            className="h-11 w-full rounded-md border border-[#cfd8d2] bg-white px-3 text-base text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
            id="lead-name"
            maxLength={leadSubmissionMaxLengths.name}
            name="name"
            onChange={() => clearClientError("name")}
            ref={nameRef}
            type="text"
          />
          <p className="text-xs leading-5 text-muted" id={fieldHelpId("name")}>
            Use the name the reply should be addressed to.
          </p>
          {fieldErrors.name ? (
            <p
              className="text-sm font-semibold text-red-700"
              id={fieldErrorId("name")}
            >
              {fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold" htmlFor="lead-email">
            Email
          </label>
          <input
            aria-describedby={describeField("email", fieldErrors.email)}
            aria-invalid={fieldErrors.email ? "true" : "false"}
            autoComplete="email"
            className="h-11 w-full rounded-md border border-[#cfd8d2] bg-white px-3 text-base text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
            id="lead-email"
            maxLength={leadSubmissionMaxLengths.email}
            name="email"
            onChange={() => clearClientError("email")}
            ref={emailRef}
            type="email"
          />
          <p className="text-xs leading-5 text-muted" id={fieldHelpId("email")}>
            Use the best address for a follow-up.
          </p>
          {fieldErrors.email ? (
            <p
              className="text-sm font-semibold text-red-700"
              id={fieldErrorId("email")}
            >
              {fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold" htmlFor="lead-message">
            Message
          </label>
          <textarea
            aria-describedby={describeField("message", fieldErrors.message)}
            aria-invalid={fieldErrors.message ? "true" : "false"}
            className="min-h-32 w-full resize-y rounded-md border border-[#cfd8d2] bg-white px-3 py-3 text-base text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
            id="lead-message"
            maxLength={leadSubmissionMaxLengths.message}
            name="message"
            onChange={() => clearClientError("message")}
            ref={messageRef}
          />
          <p
            className="text-xs leading-5 text-muted"
            id={fieldHelpId("message")}
          >
            Optional context, goals, timeline, or constraints.
          </p>
          {fieldErrors.message ? (
            <p
              className="text-sm font-semibold text-red-700"
              id={fieldErrorId("message")}
            >
              {fieldErrors.message}
            </p>
          ) : null}
        </div>

        <Button className="w-full" disabled={isPending} size="lg" type="submit">
          {isPending ? "Submitting..." : "Submit request"}
        </Button>
      </div>
    </form>
  );
}
