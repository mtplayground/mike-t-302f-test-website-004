import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { initialLeadSubmissionState } from "@/lib/lead";

const mocks = vi.hoisted(() => ({
  createLead: vi.fn(),
  headers: vi.fn()
}));

vi.mock("@/lib/db", () => ({
  prisma: {
    lead: {
      create: mocks.createLead
    }
  }
}));

vi.mock("next/headers", () => ({
  headers: mocks.headers
}));

import { submitLead } from "@/app/actions/lead";

function buildFormData(fields: Record<string, string>) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(fields)) {
    formData.set(key, value);
  }

  return formData;
}

function clearRateLimitStore() {
  const globalWithRateLimitStore = globalThis as typeof globalThis & {
    leadSubmissionRateLimitStore?: Map<string, unknown>;
  };

  globalWithRateLimitStore.leadSubmissionRateLimitStore?.clear();
}

describe("submitLead", () => {
  beforeEach(() => {
    mocks.createLead.mockReset();
    mocks.headers.mockReset();
    mocks.headers.mockResolvedValue(
      new Headers({
        "x-forwarded-for": "203.0.113.10"
      })
    );
    clearRateLimitStore();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns validation errors without persisting invalid data", async () => {
    const result = await submitLead(
      initialLeadSubmissionState,
      buildFormData({})
    );

    expect(result).toEqual({
      status: "error",
      fieldErrors: {
        name: "Name is required.",
        email: "Email is required."
      }
    });
    expect(mocks.headers).not.toHaveBeenCalled();
    expect(mocks.createLead).not.toHaveBeenCalled();
  });

  it("persists valid lead data and returns the lead id", async () => {
    mocks.createLead.mockResolvedValue({ id: "lead_123" });

    const result = await submitLead(
      initialLeadSubmissionState,
      buildFormData({
        name: "  Katherine Johnson  ",
        email: "  KATHERINE@EXAMPLE.COM  ",
        message: "  I need a launch plan.  "
      })
    );

    expect(mocks.createLead).toHaveBeenCalledWith({
      data: {
        name: "Katherine Johnson",
        email: "katherine@example.com",
        message: "I need a launch plan."
      },
      select: {
        id: true
      }
    });
    expect(result).toEqual({
      status: "success",
      leadId: "lead_123"
    });
  });

  it("returns a form error when persistence fails", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mocks.createLead.mockRejectedValue(new Error("database unavailable"));

    const result = await submitLead(
      initialLeadSubmissionState,
      buildFormData({
        name: "Margaret Hamilton",
        email: "margaret@example.com"
      })
    );

    expect(consoleError).toHaveBeenCalledWith(
      "Failed to persist lead submission.",
      expect.any(Error)
    );
    expect(result).toEqual({
      status: "error",
      fieldErrors: {},
      formError: "We could not save your message. Please try again."
    });
  });
});
