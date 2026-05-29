import { describe, expect, it } from "vitest";
import { validateLeadFormData } from "@/lib/lead";

function buildFormData(fields: Record<string, string>) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(fields)) {
    formData.set(key, value);
  }

  return formData;
}

describe("validateLeadFormData", () => {
  it("accepts valid lead data and normalizes text fields", () => {
    const result = validateLeadFormData(
      buildFormData({
        name: "  Ada Lovelace  ",
        email: "  ADA@EXAMPLE.COM  ",
        message: "  Ship the first milestone.  "
      })
    );

    expect(result).toEqual({
      ok: true,
      data: {
        name: "Ada Lovelace",
        email: "ada@example.com",
        message: "Ship the first milestone."
      }
    });
  });

  it("omits an empty optional message", () => {
    const result = validateLeadFormData(
      buildFormData({
        name: "Grace Hopper",
        email: "grace@example.com",
        message: "   "
      })
    );

    expect(result).toEqual({
      ok: true,
      data: {
        name: "Grace Hopper",
        email: "grace@example.com"
      }
    });
  });

  it("returns field errors for missing required fields", () => {
    const result = validateLeadFormData(buildFormData({}));

    expect(result).toEqual({
      ok: false,
      fieldErrors: {
        name: "Name is required.",
        email: "Email is required."
      }
    });
  });

  it("returns field errors for invalid email and long fields", () => {
    const result = validateLeadFormData(
      buildFormData({
        name: "x".repeat(101),
        email: "not-an-email",
        message: "x".repeat(1001)
      })
    );

    expect(result).toEqual({
      ok: false,
      fieldErrors: {
        name: "Name must be 100 characters or fewer.",
        email: "Enter a valid email address.",
        message: "Message must be 1000 characters or fewer."
      }
    });
  });
});
