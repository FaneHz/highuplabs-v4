'use server';

import { getConfig, getPublicConfig } from "@/lib/config";

export async function getAppConfig(key: string): Promise<string | undefined> {
  return getConfig(key);
}

export async function getClientConfig(key: string): Promise<string | undefined> {
  return getPublicConfig(key);
}
