export const requiredServerEnvKeys = [
  "DATABASE_URL",
  "EMAIL_API_KEY",
  "NOTIFICATION_RECIPIENT",
  "NOTIFICATION_SENDER"
] as const;

export type RequiredServerEnvKey = (typeof requiredServerEnvKeys)[number];

export type ServerEnv = {
  DATABASE_URL: string;
  EMAIL_API_KEY: string;
  NOTIFICATION_RECIPIENT: string;
  NOTIFICATION_SENDER: string;
};

type EnvSource = Record<string, string | undefined>;

function getRequiredEnv(key: RequiredServerEnvKey, source: EnvSource) {
  const value = source[key]?.trim();

  if (!value) {
    throw new Error(`${key} is required but was not provided.`);
  }

  return value;
}

export function getDatabaseUrl(source: EnvSource = process.env) {
  const databaseUrl = getRequiredEnv("DATABASE_URL", source);

  try {
    const parsedUrl = new URL(databaseUrl);
    const isPostgres =
      parsedUrl.protocol === "postgresql:" ||
      parsedUrl.protocol === "postgres:";

    if (!isPostgres) {
      throw new Error("Expected a PostgreSQL URL.");
    }
  } catch {
    throw new Error(
      "DATABASE_URL must be a valid PostgreSQL connection string."
    );
  }

  return databaseUrl;
}

export function getEmailApiKey(source: EnvSource = process.env) {
  return getRequiredEnv("EMAIL_API_KEY", source);
}

export function getNotificationRecipient(source: EnvSource = process.env) {
  const recipient = getRequiredEnv("NOTIFICATION_RECIPIENT", source);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(recipient)) {
    throw new Error("NOTIFICATION_RECIPIENT must be a valid email address.");
  }

  return recipient;
}

export function getNotificationSender(source: EnvSource = process.env) {
  const sender = getRequiredEnv("NOTIFICATION_SENDER", source);
  const senderPattern =
    /^.+<[^<>\s@]+@[^<>\s@]+\.[^<>\s@]+>$|^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!senderPattern.test(sender)) {
    throw new Error(
      "NOTIFICATION_SENDER must be an email address or a display name with an email address."
    );
  }

  return sender;
}

export function getServerEnv(source: EnvSource = process.env): ServerEnv {
  return {
    DATABASE_URL: getDatabaseUrl(source),
    EMAIL_API_KEY: getEmailApiKey(source),
    NOTIFICATION_RECIPIENT: getNotificationRecipient(source),
    NOTIFICATION_SENDER: getNotificationSender(source)
  };
}
