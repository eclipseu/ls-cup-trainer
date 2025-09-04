"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getProfileData() {
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
    console.error("Error fetching profile:", error);
    return null;
  }

  return profile;
}

export async function updateProfileData(data: {
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

  // Ensure a profile row exists for this user. Use upsert on primary key id.
  const { data: updatedProfile, error } = await supabase
    .from("profiles")
    .upsert({ id: user.id, ...data }, { onConflict: "id" })
    .select()
    .single();

  if (error) {
    console.error("Error updating profile:", error);
    return { error: error.message };
  }

  // Revalidate paths to show updated data
  if (data.dashboard_data) revalidatePath("/dashboard");
  if (data.advocacy_data) revalidatePath("/advocacy");
  if (data.practice_data) revalidatePath("/practice");

  return { data: updatedProfile };
}
