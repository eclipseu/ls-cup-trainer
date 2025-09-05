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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState<string>("");

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(id);
  };

  const handleDeleteConfirm = (id: string) => {
    onDeleteDocument(id);
    setShowDeleteConfirm(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(null);
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

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (showDeleteConfirm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showDeleteConfirm]);

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
                    if (
                      !e.target.closest("h3") &&
                      !e.target.closest("button")
                    ) {
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

      {/* Delete Confirmation Dialog - Rendered outside main container */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg- bg-opacity-0 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg shadow-2xl border border-gray-300 p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Delete Document
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this advocacy document? This
              action cannot be undone.
            </p>
            <div className="flex space-x-3 justify-end">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteConfirm(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
