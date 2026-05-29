"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { type LeadSubmissionState, validateLeadFormData } from "@/lib/lead";
import { checkLeadSubmissionRateLimit, hasFilledHoneypot } from "@/lib/spam";

function getClientIdentifier(
  requestHeaders: Pick<Headers, "get">,
  fallbackIdentifier: string
) {
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  const forwardedClient = forwardedFor?.split(",")[0]?.trim();
  const realIp = requestHeaders.get("x-real-ip")?.trim();

  return forwardedClient || realIp || fallbackIdentifier;
}

function formatRetryMessage(retryAfterSeconds: number) {
  const retryAfterMinutes = Math.max(1, Math.ceil(retryAfterSeconds / 60));

  return `Too many submissions. Please try again in ${retryAfterMinutes} minute${
    retryAfterMinutes === 1 ? "" : "s"
  }.`;
}

export async function submitLead(
  _previousState: LeadSubmissionState,
  formData: FormData
): Promise<LeadSubmissionState> {
  if (hasFilledHoneypot(formData)) {
    return {
      status: "error",
      fieldErrors: {},
      formError: "We could not save your message. Please try again."
    };
  }

  const validation = validateLeadFormData(formData);

  if (!validation.ok) {
    return {
      status: "error",
      fieldErrors: validation.fieldErrors
    };
  }

  const requestHeaders = await headers();
  const rateLimit = checkLeadSubmissionRateLimit(
    getClientIdentifier(requestHeaders, validation.data.email)
  );

  if (!rateLimit.allowed) {
    return {
      status: "error",
      fieldErrors: {},
      formError: formatRetryMessage(rateLimit.retryAfterSeconds)
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
