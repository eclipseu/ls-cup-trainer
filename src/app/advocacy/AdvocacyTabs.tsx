"use client";

import { useState, useEffect } from "react";
import { HiPlus, HiX } from "react-icons/hi";
import { AdvocacyContent } from "@/types";

interface AdvocacyTabsProps {
  documents: { [id: string]: AdvocacyContent };
  activeDocumentId: string | null;
  onSelectDocument: (id: string) => void;
  onCreateDocument: () => void;
  onDeleteDocument: (id: string) => void;
  onUpdateDocumentTitle: (documentId: string, newTitle: string) => void;
  canCreateMoreDocuments: boolean;
  documentCount: number;
}

export default function AdvocacyTabs({
  documents,
  activeDocumentId,
  onSelectDocument,
  onCreateDocument,
  onDeleteDocument,
  onUpdateDocumentTitle,
  canCreateMoreDocuments,
  documentCount,
}: AdvocacyTabsProps) {
  const documentList = Object.values(documents);
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState<string>("");

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteDocument(id);
  };

  const handleTitleEdit = (doc: AdvocacyContent, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTitle(doc.id);
    setTempTitle(doc.title);
  };

  const handleTitleSave = (docId: string) => {
    if (tempTitle.trim()) {
      onUpdateDocumentTitle(docId, tempTitle.trim());
    }
    setEditingTitle(null);
    setTempTitle("");
  };

  const handleTitleCancel = () => {
    setEditingTitle(null);
    setTempTitle("");
  };

  const handleTitleKeyPress = (e: React.KeyboardEvent, docId: string) => {
    if (e.key === "Enter") {
      handleTitleSave(docId);
    } else if (e.key === "Escape") {
      handleTitleCancel();
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Advocacy Documents
            </h2>
            <p className="text-sm text-gray-500">
              {documentCount}/10 documents
              {!canCreateMoreDocuments && (
                <span className="ml-2 text-amber-600 font-medium">
                  (Maximum reached)
                </span>
              )}
            </p>
          </div>
          <button
            onClick={onCreateDocument}
            disabled={!canCreateMoreDocuments}
            className={`flex items-center px-3 py-2 rounded-md transition-colors text-sm ${
              canCreateMoreDocuments
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <HiPlus className="mr-1" />
            New Document
          </button>
        </div>

        <div className="p-4">
          {documentList.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-4">No advocacy documents yet.</p>
              <button
                onClick={onCreateDocument}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Your First Document
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {documentList.map((doc) => (
                <div
                  key={doc.id}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                    activeDocumentId === doc.id
                      ? "bg-blue-50 border-blue-200"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }`}
                  onClick={(e) => {
                    // Only select document if not clicking on title or delete button
                    const target = e.target as HTMLElement;
                    if (!target.closest("h3") && !target.closest("button")) {
                      onSelectDocument(doc.id);
                    }
                  }}
                >
                  <div className="flex-1 min-w-0">
                    {editingTitle === doc.id ? (
                      <input
                        type="text"
                        value={tempTitle}
                        onChange={(e) => setTempTitle(e.target.value)}
                        onBlur={() => handleTitleSave(doc.id)}
                        onKeyDown={(e) => handleTitleKeyPress(e, doc.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full font-medium text-gray-900 bg-transparent border-b border-blue-500 focus:outline-none focus:border-blue-600"
                        autoFocus
                      />
                    ) : (
                      <h3
                        className="font-medium text-gray-900 truncate cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={(e) => handleTitleEdit(doc, e)}
                        title="Click to edit title"
                      >
                        {doc.title || "Untitled Document"}
                      </h3>
                    )}
                    <p className="text-sm text-gray-500 truncate">
                      {doc.advocateName || "No author"}
                    </p>
                    <p className="text-xs text-gray-400">
                      Updated: {new Date(doc.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  {doc.id !== "default-advocacy" && (
                    <button
                      onClick={(e) => handleDeleteClick(doc.id, e)}
                      className="ml-2 p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete document"
                    >
                      <HiX className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
