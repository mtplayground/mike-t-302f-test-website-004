import { readFile } from "node:fs/promises";
import { test, expect } from "@playwright/test";
import { prisma } from "../../lib/db";

const shouldRunLeadE2E = process.env.RUN_LEAD_E2E === "1";
const notificationLogPath = process.env.E2E_NOTIFICATION_LOG_PATH;

test.skip(
  !shouldRunLeadE2E,
  "Set RUN_LEAD_E2E=1 when the lead form and notification transport are available."
);

test.describe("lead submission happy path", () => {
  const email = `founder-${Date.now()}@example.com`;

  test.afterEach(async () => {
    await prisma.lead.deleteMany({
      where: {
        email
      }
    });
  });

  test("creates a lead row and dispatches a notification", async ({ page }) => {
    test.skip(
      !notificationLogPath,
      "Set E2E_NOTIFICATION_LOG_PATH to the notification capture log."
    );

    await prisma.lead.deleteMany({
      where: {
        email
      }
    });

    await page.goto("/");
    await page.getByLabel("Name").fill("E2E Founder");
    await page.getByLabel("Email").fill(email);
    await page
      .getByLabel("Message")
      .fill("I want to validate the full lead capture path.");
    await page.getByRole("button", { name: /submit|start|send/i }).click();

    await expect(
      page.getByText(/thank|received|sent|saved|success/i)
    ).toBeVisible();

    await expect
      .poll(async () =>
        prisma.lead.findFirst({
          where: {
            email
          }
        })
      )
      .not.toBeNull();

    await expect
      .poll(async () => readNotificationLog(notificationLogPath))
      .toContain(email);
  });
});

async function readNotificationLog(path: string | undefined) {
  if (!path) {
    return "";
  }

  try {
    return await readFile(path, "utf8");
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return "";
    }

    throw error;
  }
}
