import { z } from 'zod';

const serverEnvSchema = z.object({
  OPENWEATHERMAP_API_KEY: z
    .string({ error: 'OPENWEATHERMAP_API_KEY is not set - see .env.example' })
    .trim()
    .min(1, 'OPENWEATHERMAP_API_KEY is empty - see .env.example'),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

/**
 * Server-only environment, validated on first use rather than at import so
 * a build or test run never needs the key.
 */
export const getServerEnv = (
  env: Record<string, string | undefined> = process.env,
): ServerEnv => {
  const parsed = serverEnvSchema.safeParse(env);

  if (!parsed.success) {
    throw new Error(
      `Invalid server environment: ${parsed.error.issues.map(({ message }) => message).join(', ')}`,
    );
  }

  return parsed.data;
};
