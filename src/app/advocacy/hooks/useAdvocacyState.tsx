"use client";

import { useState, useEffect, useMemo } from "react";
import {
  getProfileDataClient as getProfileData,
  updateProfileDataClient as updateProfileData,
} from "@/lib/data.client";
import { AdvocacyContent } from "@/types";
import debounce from "lodash/debounce";

const defaultAdvocacyContent: AdvocacyContent = {
  title: "Your Advocacy Title",
  advocateName: "Your Name / Group Name",
  date: new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  abstract: "",
  introduction: "",
  problemStatement: "",
  generalObjective: "",
  specificObjectives: "• \n• \n• ",
  significance: "",
  methodology: "",
  expectedOutcomes: "",
  conclusion: "",
  references: "",
};

export function useAdvocacyState() {
  const [content, setContent] = useState<AdvocacyContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedUpdate = useMemo(
    () =>
      debounce(async (newContent: AdvocacyContent) => {
        const { error } = await updateProfileData({
          advocacy_data: newContent,
        });
        if (error) {
          console.error("Failed to save advocacy data:", error);
        }
      }, 1000),
    []
  );

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const profile = await getProfileData();
        if (profile && profile.advocacy_data) {
          setContent(profile.advocacy_data as unknown as AdvocacyContent);
        } else {
          setContent(defaultAdvocacyContent);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred while loading advocacy data.");
        }
        console.error("Failed to load advocacy data:", err);
        setContent(defaultAdvocacyContent);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleContentChange = (field: keyof AdvocacyContent, value: string) => {
    if (content) {
      const newContent = { ...content, [field]: value };
      setContent(newContent);
      debouncedUpdate(newContent);
    }
  };

  return { content, isLoading, error, handleContentChange };
}
