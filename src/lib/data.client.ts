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
