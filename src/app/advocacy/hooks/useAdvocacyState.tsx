"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getProfileDataClient as getProfileData,
  updateProfileDataClient as updateProfileData,
} from "@/lib/data.client";
import debounce from "lodash/debounce";

// Define the structure for the advocacy plan content
interface AdvocacyContent {
  title: string;
  advocateName: string;
  date: string;
  abstract: string;
  introduction: string;
  problemStatement: string;
  generalObjective: string;
  specificObjectives: string;
  significance: string;
  methodology: string;
  expectedOutcomes: string;
  conclusion: string;
  references: string;
}

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

  const debouncedUpdate = useCallback(
    debounce(async (newContent: AdvocacyContent) => {
      const { error } = await updateProfileData({ advocacy_data: newContent });
      if (error) {
        console.error("Failed to save advocacy data:", error);
        // Optionally, handle the error in the UI
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
          setContent(profile.advocacy_data);
        } else {
          setContent(defaultAdvocacyContent);
        }
      } catch (err: any) {
        setError(err.message);
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
