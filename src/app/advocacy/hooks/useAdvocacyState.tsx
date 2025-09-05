"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getProfileDataClient as getProfileData,
  updateProfileDataClient as updateProfileData,
} from "@/lib/data.client";
import { AdvocacyContent, AdvocacyDocuments } from "@/types";
import debounce from "lodash/debounce";

const createDefaultAdvocacyContent = (): AdvocacyContent => {
  const now = new Date().toISOString();
  return {
    id: "default-advocacy",
    title: "Advocacy",
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
    createdAt: now,
    updatedAt: now,
  };
};

const createNewAdvocacyContent = (): AdvocacyContent => {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title: `Advocacy ${Date.now()}`,
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
    createdAt: now,
    updatedAt: now,
  };
};

export function useAdvocacyState() {
  const [documents, setDocuments] = useState<AdvocacyDocuments>({});
  const [activeDocumentId, setActiveDocumentId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedUpdate = useCallback(
    debounce(async (documentsToSave: AdvocacyDocuments) => {
      const { error } = await updateProfileData({
        advocacy_data: documentsToSave,
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
          const advocacyData = profile.advocacy_data as AdvocacyDocuments;
          setDocuments(advocacyData);
          // Set the first document as active if none is selected
          const documentIds = Object.keys(advocacyData);
          if (documentIds.length > 0) {
            setActiveDocumentId(documentIds[0]);
          }
        } else {
          // Create a default document for new users
          const defaultDoc = createDefaultAdvocacyContent();
          const initialDocuments = { [defaultDoc.id]: defaultDoc };
          setDocuments(initialDocuments);
          setActiveDocumentId(defaultDoc.id);
          // Save the initial document
          await updateProfileData({ advocacy_data: initialDocuments });
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred while loading advocacy data.");
        }
        console.error("Failed to load advocacy data:", err);
        // Create a default document even on error
        const defaultDoc = createDefaultAdvocacyContent();
        const initialDocuments = { [defaultDoc.id]: defaultDoc };
        setDocuments(initialDocuments);
        setActiveDocumentId(defaultDoc.id);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const createNewDocument = useCallback(() => {
    // Check if we've reached the maximum limit of 10 documents
    if (Object.keys(documents).length >= 10) {
      return; // Don't create if we're at the limit
    }

    const newDoc = createNewAdvocacyContent();
    const updatedDocuments = { ...documents, [newDoc.id]: newDoc };
    setDocuments(updatedDocuments);
    setActiveDocumentId(newDoc.id);
    debouncedUpdate(updatedDocuments);
  }, [documents, debouncedUpdate]);

  const deleteDocument = useCallback(
    (id: string) => {
      // Don't allow deleting the default document
      if (id === "default-advocacy") {
        return;
      }

      if (Object.keys(documents).length <= 1) {
        // Don't allow deleting the last document
        return;
      }

      const updatedDocuments = { ...documents };
      delete updatedDocuments[id];
      setDocuments(updatedDocuments);

      // If we deleted the active document, switch to another one
      if (activeDocumentId === id) {
        const remainingIds = Object.keys(updatedDocuments);
        setActiveDocumentId(remainingIds[0] || null);
      }

      debouncedUpdate(updatedDocuments);
    },
    [documents, activeDocumentId, debouncedUpdate]
  );

  const handleContentChange = (field: keyof AdvocacyContent, value: string) => {
    if (activeDocumentId && documents[activeDocumentId]) {
      const updatedDoc = {
        ...documents[activeDocumentId],
        [field]: value,
        updatedAt: new Date().toISOString(),
      };
      const updatedDocuments = {
        ...documents,
        [activeDocumentId]: updatedDoc,
      };
      setDocuments(updatedDocuments);
      debouncedUpdate(updatedDocuments);
    }
  };

  const updateDocumentTitle = (documentId: string, newTitle: string) => {
    if (documents[documentId]) {
      const updatedDoc = {
        ...documents[documentId],
        title: newTitle,
        updatedAt: new Date().toISOString(),
      };
      const updatedDocuments = {
        ...documents,
        [documentId]: updatedDoc,
      };
      setDocuments(updatedDocuments);
      debouncedUpdate(updatedDocuments);
    }
  };

  const selectDocument = (id: string) => {
    setActiveDocumentId(id);
  };

  const activeDocument = activeDocumentId ? documents[activeDocumentId] : null;
  const canCreateMoreDocuments = Object.keys(documents).length < 10;
  const documentCount = Object.keys(documents).length;

  return {
    documents,
    activeDocument,
    activeDocumentId,
    isLoading,
    error,
    handleContentChange,
    createNewDocument,
    deleteDocument,
    selectDocument,
    updateDocumentTitle,
    canCreateMoreDocuments,
    documentCount,
  };
}
