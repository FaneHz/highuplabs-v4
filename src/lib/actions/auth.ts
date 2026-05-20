"use server";

import { logAction } from "./audit";

export async function logLoginSuccess(email: string) {
  await logAction("login_success", { email });
}
