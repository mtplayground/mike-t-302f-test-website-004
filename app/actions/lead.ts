"use server";

import { prisma } from "@/lib/db";
import { type LeadSubmissionState, validateLeadFormData } from "@/lib/lead";

export async function submitLead(
  _previousState: LeadSubmissionState,
  formData: FormData
): Promise<LeadSubmissionState> {
  const validation = validateLeadFormData(formData);

  if (!validation.ok) {
    return {
      status: "error",
      fieldErrors: validation.fieldErrors
    };
  }

  try {
    const lead = await prisma.lead.create({
      data: validation.data,
      select: {
        id: true
      }
    });

    return {
      status: "success",
      leadId: lead.id
    };
  } catch (error) {
    console.error("Failed to persist lead submission.", error);

    return {
      status: "error",
      fieldErrors: {},
      formError: "We could not save your message. Please try again."
    };
  }
}
