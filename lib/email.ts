import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { Resend } from "resend";
import {
  getEmailApiKey,
  getNotificationRecipient,
  getNotificationSender
} from "@/lib/env";
import type { LeadSubmissionData } from "@/lib/lead";
import { siteConfig } from "@/lib/site";

export type LeadNotification = {
  leadId: string;
  lead: LeadSubmissionData;
};

function buildTextBody({ lead, leadId }: LeadNotification) {
  return [
    `New lead for ${siteConfig.name}`,
    "",
    `Lead ID: ${leadId}`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    "",
    "Message:",
    lead.message || "(No message provided.)"
  ].join("\n");
}

function buildHtmlBody({ lead, leadId }: LeadNotification) {
  const message = lead.message || "(No message provided.)";

  return `
    <h1>New lead for ${escapeHtml(siteConfig.name)}</h1>
    <p><strong>Lead ID:</strong> ${escapeHtml(leadId)}</p>
    <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function captureNotification(notification: LeadNotification) {
  const logPath = process.env.E2E_NOTIFICATION_LOG_PATH?.trim();

  if (!logPath) {
    return false;
  }

  await mkdir(path.dirname(logPath), { recursive: true });
  await appendFile(logPath, `${JSON.stringify(notification)}\n`, "utf8");
  return true;
}

export async function sendLeadNotification(notification: LeadNotification) {
  if (await captureNotification(notification)) {
    return;
  }

  const resend = new Resend(getEmailApiKey());

  const { error } = await resend.emails.send({
    from: getNotificationSender(),
    to: getNotificationRecipient(),
    replyTo: notification.lead.email,
    subject: `New lead from ${notification.lead.name}`,
    text: buildTextBody(notification),
    html: buildHtmlBody(notification)
  });

  if (error) {
    throw new Error(
      `Resend failed to send lead notification: ${error.message}`
    );
  }
}
