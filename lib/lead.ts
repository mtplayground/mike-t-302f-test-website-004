export type LeadSubmissionData = {
  name: string;
  email: string;
  message?: string;
};

export type LeadSubmissionField = keyof LeadSubmissionData;

export type LeadSubmissionFieldErrors = Partial<
  Record<LeadSubmissionField, string>
>;

export type LeadSubmissionState =
  | {
      status: "idle";
    }
  | {
      status: "success";
      leadId: string;
    }
  | {
      status: "error";
      fieldErrors: LeadSubmissionFieldErrors;
      formError?: string;
    };

export type LeadValidationResult =
  | {
      ok: true;
      data: LeadSubmissionData;
    }
  | {
      ok: false;
      fieldErrors: LeadSubmissionFieldErrors;
    };

export const leadSubmissionMaxLengths = {
  name: 100,
  email: 254,
  message: 1000
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const initialLeadSubmissionState: LeadSubmissionState = {
  status: "idle"
};

function readTextField(formData: FormData, field: LeadSubmissionField) {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

export function validateLeadFormData(formData: FormData): LeadValidationResult {
  const name = readTextField(formData, "name");
  const email = readTextField(formData, "email").toLowerCase();
  const message = readTextField(formData, "message");
  const fieldErrors: LeadSubmissionFieldErrors = {};

  if (!name) {
    fieldErrors.name = "Name is required.";
  } else if (name.length > leadSubmissionMaxLengths.name) {
    fieldErrors.name = `Name must be ${leadSubmissionMaxLengths.name} characters or fewer.`;
  }

  if (!email) {
    fieldErrors.email = "Email is required.";
  } else if (
    email.length > leadSubmissionMaxLengths.email ||
    !emailPattern.test(email)
  ) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (message.length > leadSubmissionMaxLengths.message) {
    fieldErrors.message = `Message must be ${leadSubmissionMaxLengths.message} characters or fewer.`;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      fieldErrors
    };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      ...(message ? { message } : {})
    }
  };
}
