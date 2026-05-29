import { access, cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const standaloneDir = path.join(root, ".next", "standalone");
const localEnvFiles = [
  ".env",
  ".env.local",
  ".env.development.local",
  ".env.test.local",
  ".env.production",
  ".env.production.local"
];

async function assertExists(targetPath, label) {
  try {
    await access(targetPath);
  } catch {
    throw new Error(
      `${label} was not found at ${targetPath}. Run next build first.`
    );
  }
}

async function copyDirectory(source, destination, label) {
  await assertExists(source, label);
  await rm(destination, { force: true, recursive: true });
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(source, destination, { recursive: true });
}

async function removeLocalEnvFiles() {
  await Promise.all(
    localEnvFiles.map((fileName) =>
      rm(path.join(standaloneDir, fileName), { force: true })
    )
  );
}

async function main() {
  await assertExists(
    path.join(standaloneDir, "server.js"),
    "Standalone server"
  );

  await copyDirectory(
    path.join(root, ".next", "static"),
    path.join(standaloneDir, ".next", "static"),
    "Next static assets"
  );

  await copyDirectory(
    path.join(root, "public"),
    path.join(standaloneDir, "public"),
    "Public assets"
  );

  await removeLocalEnvFiles();

  console.log(`Prepared self-hosted standalone build at ${standaloneDir}`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});
