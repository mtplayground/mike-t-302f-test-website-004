const LEAD_RATE_LIMIT_MAX_ATTEMPTS = 5;
const LEAD_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const LEAD_RATE_LIMIT_MAX_KEYS = 500;

export const leadHoneypotFieldName = "company";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitResult =
  | {
      allowed: true;
    }
  | {
      allowed: false;
      retryAfterSeconds: number;
    };

declare global {
  var leadSubmissionRateLimitStore: Map<string, RateLimitEntry> | undefined;
}

function getRateLimitStore() {
  globalThis.leadSubmissionRateLimitStore ??= new Map<string, RateLimitEntry>();

  return globalThis.leadSubmissionRateLimitStore;
}

function removeExpiredEntries(store: Map<string, RateLimitEntry>, now: number) {
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }
}

function trimOldestEntries(store: Map<string, RateLimitEntry>) {
  while (store.size > LEAD_RATE_LIMIT_MAX_KEYS) {
    const oldestKey = store.keys().next().value;

    if (!oldestKey) {
      return;
    }

    store.delete(oldestKey);
  }
}

export function hasFilledHoneypot(formData: FormData) {
  const value = formData.get(leadHoneypotFieldName);

  return typeof value === "string" && value.trim().length > 0;
}

export function checkLeadSubmissionRateLimit(
  identifier: string,
  now = Date.now()
): RateLimitResult {
  const normalizedIdentifier = identifier.trim().toLowerCase();

  if (!normalizedIdentifier) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil(LEAD_RATE_LIMIT_WINDOW_MS / 1000)
    };
  }

  const store = getRateLimitStore();
  removeExpiredEntries(store, now);

  const existingEntry = store.get(normalizedIdentifier);

  if (!existingEntry || existingEntry.resetAt <= now) {
    store.set(normalizedIdentifier, {
      count: 1,
      resetAt: now + LEAD_RATE_LIMIT_WINDOW_MS
    });
    trimOldestEntries(store);

    return {
      allowed: true
    };
  }

  if (existingEntry.count >= LEAD_RATE_LIMIT_MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((existingEntry.resetAt - now) / 1000)
      )
    };
  }

  existingEntry.count += 1;
  store.set(normalizedIdentifier, existingEntry);

  return {
    allowed: true
  };
}
