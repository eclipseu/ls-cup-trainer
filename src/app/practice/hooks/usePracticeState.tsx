"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  getProfileDataClient as getProfileData,
  updateProfileDataClient as updateProfileData,
} from "@/lib/data.client";
import debounce from "lodash/debounce";
import { Question } from "../questionsData";

interface PracticeState {
  selectedCategory: string | null;
  selectedQuestion: Question | null;
  userAnswer: string;
  coreMessages: { id: number; text: string }[];
}

const defaultPracticeState: PracticeState = {
  selectedCategory: null,
  selectedQuestion: null,
  userAnswer: "",
  coreMessages: [
    { id: 1, text: "I am a dedicated and passionate leader..." },
    { id: 2, text: "My core strength is in strategic planning..." },
    { id: 3, text: "I excel at building and motivating teams..." },
  ],
};

export function usePracticeState() {
  const [state, setState] = useState<PracticeState>(defaultPracticeState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasUserInteractedRef = useRef(false);

  const debouncedUpdate = useCallback(
    debounce(async (newState: PracticeState) => {
      const { error } = await updateProfileData({
        practice_data: {
          coreMessages: newState.coreMessages,
        },
      });
      if (error) {
        console.error("Failed to save practice data:", error);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        // 1) Load from localStorage first for instant UI
        if (typeof window !== "undefined") {
          const local = window.localStorage.getItem("practice-state");
          if (local) {
            try {
              setState(JSON.parse(local));
            } catch (_) {
              setState(defaultPracticeState);
            }
          } else {
            setState(defaultPracticeState);
          }
        } else {
          setState(defaultPracticeState);
        }

        // 2) Load from server and override local if present
        const profile = await getProfileData();
        if (profile && profile.practice_data) {
          setState((current) => {
            const serverCoreMessages = Array.isArray(
              profile.practice_data?.coreMessages
            )
              ? profile.practice_data.coreMessages
              : current.coreMessages;

            const merged = {
              ...current,
              coreMessages: serverCoreMessages,
            };

            if (typeof window !== "undefined") {
              window.localStorage.setItem(
                "practice-state",
                JSON.stringify(merged)
              );
            }
            return merged;
          });
        }
      } catch (err: any) {
        setError(err.message);
        console.error("Failed to load practice data:", err);
        setState((prev) => prev ?? defaultPracticeState);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const setPracticeState = (newState: Partial<PracticeState>) => {
    hasUserInteractedRef.current = true;
    setState((prev) => {
      const updatedState = { ...prev, ...newState };
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "practice-state",
          JSON.stringify(updatedState)
        );
      }
      debouncedUpdate(updatedState);
      return updatedState;
    });
  };

  return { ...state, isLoading, error, setPracticeState };
}
