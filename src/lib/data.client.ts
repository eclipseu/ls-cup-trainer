"use client";

import { createClient } from "@/utils/supabase/client";

export async function getProfileDataClient() {
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

  return profile;
}

export async function updateProfileDataClient(data: {
  dashboard_data?: any;
  advocacy_data?: any;
  practice_data?: any;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "User not authenticated" };
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
export async function getPracticeDataClient() {
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
    if (error.code === "PGRST116" /* No rows */) return null;
    console.error("Error fetching practice_data (client):", error);
    return null;
  }

  return data as { coreMessages?: any; customQuestions?: any } | null;
}

export async function upsertPracticeDataClient(data: {
  coreMessages?: any;
  customQuestions?: any;
}) {
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
export async function getMockDataClient() {
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
    if (error.code === "PGRST116") return null;
    console.error("Error fetching mock_data (client):", error);
    return null;
  }
  return data as { mockQuestions?: any } | null;
}

export async function upsertMockDataClient(data: { mockQuestions?: any }) {
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
