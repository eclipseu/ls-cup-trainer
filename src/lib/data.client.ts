"use client";

import { createClient } from "@/utils/supabase/client";

export interface DashboardData {
  tasks?: unknown;
  weeks?: unknown;
  stats?: { timePracticed: number; questionsAnswered: number };
  streak?: number;
  lastStreakDate?: string | null;
  lastTaskResetDate?: string | null;
}

export type AdvocacyData = Record<string, unknown>;

export interface CustomQuestion {
  id: number;
  text: string;
  category: string;
  sampleAnswer: string;
}

export interface PracticeData {
  coreMessages?: Array<{ id: number; text: string }>;
  customQuestions?: CustomQuestion[];
}

export async function getProfileDataClient(): Promise<{
  id: string;
  dashboard_data?: DashboardData;
  advocacy_data?: AdvocacyData;
  practice_data?: PracticeData;
} | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching profile (client):", error);
    return null;
  }

  return profile as any;
}

export async function updateProfileDataClient(data: {
  dashboard_data?: DashboardData;
  advocacy_data?: AdvocacyData;
  practice_data?: PracticeData;
}): Promise<{ data?: unknown; error?: string }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "User not authenticated" } as const;
  }

  const { data: updatedProfile, error } = await supabase
    .from("profiles")
    .upsert({ id: user.id, ...data }, { onConflict: "id" })
    .select()
    .single();

  if (error) {
    console.error("Error updating profile (client):", error);
    return { error: error.message } as const;
  }

  return { data: updatedProfile } as const;
}

// Practice data stored in a dedicated table: practice_data
// Assumes table schema roughly: id (uuid, PK, references profiles.id), coreMessages jsonb, customQuestions jsonb
export async function getPracticeDataClient(): Promise<{
  coreMessages?: PracticeData["coreMessages"];
  customQuestions?: PracticeData["customQuestions"];
} | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("practice_data")
    .select("coreMessages, customQuestions")
    .eq("id", user.id)
    .single();

  if (error) {
    // If no row yet, return empty structure
    if ((error as any).code === "PGRST116" /* No rows */) return null;
    console.error("Error fetching practice_data (client):", error);
    return null;
  }

  return data as any;
}

export async function upsertPracticeDataClient(
  data: PracticeData
): Promise<{ data?: unknown; error?: string }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "User not authenticated" } as const;

  const { data: saved, error } = await supabase
    .from("practice_data")
    .upsert({ id: user.id, ...data }, { onConflict: "id" })
    .select()
    .single();

  if (error) {
    console.error("Error upserting practice_data (client):", error);
    return { error: error.message } as const;
  }

  return { data: saved } as const;
}

// mock_data helpers
export async function getMockDataClient(): Promise<{
  mockQuestions?: CustomQuestion[];
} | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("mock_data")
    .select("mockQuestions")
    .eq("id", user.id)
    .single();

  if (error) {
    if ((error as any).code === "PGRST116") return null;
    console.error("Error fetching mock_data (client):", error);
    return null;
  }
  return data as any;
}

export async function upsertMockDataClient(data: {
  mockQuestions?: CustomQuestion[];
}): Promise<{ data?: unknown; error?: string }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "User not authenticated" } as const;

  const { data: saved, error } = await supabase
    .from("mock_data")
    .upsert({ id: user.id, ...data }, { onConflict: "id" })
    .select()
    .single();

  if (error) {
    console.error("Error upserting mock_data (client):", error);
    return { error: error.message } as const;
  }
  return { data: saved } as const;
}
