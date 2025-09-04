"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  getProfileDataClient as getProfileData,
  updateProfileDataClient as updateProfileData,
} from "@/lib/data.client";
import {
  getPracticeDataClient as getPracticeData,
  upsertPracticeDataClient as upsertPracticeData,
} from "@/lib/data.client";
import { PracticeState, Question, PracticeData } from "@/types";
import debounce from "lodash/debounce";

const defaultPracticeState: PracticeState = {
  selectedCategory: null,
  selectedQuestion: null,
  userAnswer: "",
  coreMessages: [
    { id: 1, text: "I am a dedicated and passionate leader..." },
    { id: 2, text: "My core strength is in strategic planning..." },
    { id: 3, text: "I excel at building and motivating teams..." },
  ],
  customQuestions: [],
};

export function usePracticeState() {
  const [state, setState] = useState<PracticeState>(defaultPracticeState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasUserInteractedRef = useRef(false);

  const debouncedUpdate = useCallback(
    debounce(async (dataToSave: PracticeData) => {
      // Save to dedicated practice_data table
      const { error } = await upsertPracticeData(dataToSave);
      if (error) {
        console.error(
          "Failed to save practice_data; falling back to profiles.practice_data:",
          error
        );
        await updateProfileData({
          practice_data: dataToSave,
        });
      }
    }, 1000),
    []
  );

  const loadData = useCallback(async () => {
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

      // 2) Load from dedicated practice_data table and override local if present
      const practice = await getPracticeData();
      if (practice) {
        setState((current) => {
          const serverCoreMessages = Array.isArray(practice?.coreMessages)
            ? practice.coreMessages
            : current.coreMessages;
          const serverCustomQuestions = Array.isArray(practice?.customQuestions)
            ? practice.customQuestions
            : current.customQuestions;

          const merged = {
            ...current,
            coreMessages: serverCoreMessages,
            customQuestions: serverCustomQuestions,
          };

          if (typeof window !== "undefined") {
            window.localStorage.setItem(
              "practice-state",
              JSON.stringify(merged)
            );
          }
          return merged;
        });
      } else {
        // Fallback: try reading from profiles.practice_data and mirror into practice_data
        const profile = await getProfileData();
        if (profile && profile.practice_data) {
          const serverCoreMessages = Array.isArray(
            profile.practice_data?.coreMessages
          )
            ? profile.practice_data.coreMessages
            : defaultPracticeState.coreMessages;
          const serverCustomQuestions = Array.isArray(
            profile.practice_data?.customQuestions
          )
            ? profile.practice_data.customQuestions
            : [];

          setState((current) => {
            const merged = {
              ...current,
              coreMessages: serverCoreMessages,
              customQuestions: serverCustomQuestions,
            };
            if (typeof window !== "undefined") {
              window.localStorage.setItem(
                "practice-state",
                JSON.stringify(merged)
              );
            }
            return merged;
          });

          // Mirror into practice_data table for future
          await upsertPracticeData({
            coreMessages: serverCoreMessages,
            customQuestions: serverCustomQuestions,
          });
        } else {
          // Ensure row exists for new users in practice_data
          await upsertPracticeData({
            coreMessages: defaultPracticeState.coreMessages,
            customQuestions: [],
          });
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while loading practice data.");
      }
      console.error("Failed to load practice data:", err);
      setState((prev) => prev ?? defaultPracticeState);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

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
      // Always schedule a debounced save
      const dataToSave: PracticeData = {
        coreMessages: updatedState.coreMessages,
        customQuestions: updatedState.customQuestions,
      };
      debouncedUpdate(dataToSave);
      // If customQuestions or coreMessages changed, push immediately as well
      if (
        Object.prototype.hasOwnProperty.call(newState, "customQuestions") ||
        Object.prototype.hasOwnProperty.call(newState, "coreMessages")
      ) {
        upsertPracticeData(dataToSave).then((res) => {
          if (res?.error) {
            void updateProfileData({
              practice_data: dataToSave,
            });
          }
        });
      }
      return updatedState;
    });
  };

  // Flush debounced updates on unload to avoid losing changes during quick navigation
  useEffect(() => {
    const handleBeforeUnload = () => {
      const maybeAny = debouncedUpdate as unknown as {
        flush?: () => void;
      };
      if (typeof maybeAny.flush === "function") maybeAny.flush();
    };
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      }
      const maybeAny = debouncedUpdate as unknown as {
        flush?: () => void;
        cancel?: () => void;
      };
      if (typeof maybeAny.flush === "function") maybeAny.flush();
      if (typeof maybeAny.cancel === "function") maybeAny.cancel();
    };
  }, [debouncedUpdate]);

  return { ...state, isLoading, error, setPracticeState };
}
