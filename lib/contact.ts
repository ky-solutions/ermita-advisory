export const contactFields = [
  "name",
  "email",
  "company",
  "phone",
  "expertise",
  "message",
  "website",
] as const;
export type ContactData = Record<(typeof contactFields)[number], string>;
export function validateContact(data: unknown) {
  const errors: Record<string, string> = {};
  const values = {} as ContactData;
  const input =
    data && typeof data === "object" ? (data as Record<string, unknown>) : {};
  for (const key of contactFields) {
    values[key] =
      typeof input[key] === "string" ? (input[key] as string).trim() : "";
    const max = key === "message" ? 5000 : key === "email" ? 254 : 150;
    if (values[key].length > max) errors[key] = `Maximum ${max} caractères.`;
  }
  if (values.name.length < 2) errors.name = "Indiquez votre nom et prénom.";
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ||
    /[\r\n]/.test(values.email)
  )
    errors.email = "Indiquez une adresse e-mail valide.";
  if (values.message.length < 10)
    errors.message = "Votre message doit contenir au moins 10 caractères.";
  if (
    values.expertise &&
    ![
      "Ingénierie financière",
      "Pilotage et performance",
      "Stratégie et management",
      "Accompagnement de projets",
      "Autre demande",
    ].includes(values.expertise)
  )
    errors.expertise = "Choisissez une expertise proposée.";
  return { values, errors };
}
export function contactConfigured() {
  return [
    "RESEND_API_KEY",
    "CONTACT_FROM",
    "CONTACT_TO",
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
    "RATE_LIMIT_SALT",
  ].every((k) => Boolean(process.env[k]));
}
