import "dotenv/config";

import { auth } from "../src/auth.js";
import prisma from "../src/lib/prisma.js";

const ADMIN_USER = {
  email: "admin@example.com",
  password: "Password123!",
  name: "admin",
} as const;

/**
 * Ensures the seed script has the database connection string it needs.
 */
function ensureDatabaseUrl() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set. Add it to your environment before running the seed script.",
    );
  }
}

/**
 * Creates the admin user when it does not already exist.
 *
 * @returns The seeded admin user, or `null` when the user already exists.
 */
async function seedAdminUser() {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: ADMIN_USER.email,
    },
    select: {
      id: true,
    },
  });

  if (existingUser) {
    console.log(`User ${ADMIN_USER.email} already exists. Skipping seed.`);
    return null;
  }

  const result = await auth.api.signUpEmail({
    body: {
      email: ADMIN_USER.email,
      password: ADMIN_USER.password,
      name: ADMIN_USER.name,
    },
  });

  const updatedAdmin = await prisma.user.update({
    where: {
      id: result.user.id,
    },
    data: {
      role: "admin",
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });
  return updatedAdmin;
}

/**
 * Runs the seed workflow and logs the resulting admin user details.
 */
async function main() {
  ensureDatabaseUrl();

  const adminUser = await seedAdminUser();

  if (!adminUser) {
    return;
  }

  console.log("Admin user is ready.");
  console.log(`Email: ${adminUser.email}`);
  console.log(`Name: ${adminUser.name}`);
  console.log(`Role: ${adminUser.role}`);
}

main()
  .catch((error) => {
    console.error("Failed to seed admin user.");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
