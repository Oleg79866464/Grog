export function requireAdminEmail(email: string | null | undefined, allowedEmail: string | undefined) {
  if (!allowedEmail) {
    return false;
  }

  return Boolean(email && email.toLowerCase() === allowedEmail.toLowerCase());
}
