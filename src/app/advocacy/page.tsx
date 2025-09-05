"use client";
import AdvocacyDocument from "./AdvocacyDocument";
import AdvocacyTabs from "./AdvocacyTabs";
import { useAdvocacyState } from "./hooks/useAdvocacyState";

export default function AdvocacyPage() {
  const {
    documents,
    activeDocument,
    activeDocumentId,
    isLoading,
    error,
    createNewDocument,
    deleteDocument,
    selectDocument,
    updateDocumentTitle,
    handleContentChange,
    canCreateMoreDocuments,
    documentCount,
  } = useAdvocacyState();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center h-screen">
            <div className="text-2xl font-bold text-gray-500">
              Loading Advocacy Documents...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center h-screen bg-red-50">
            <div className="text-2xl font-bold text-red-600">
              Error: {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <AdvocacyTabs
          documents={documents}
          activeDocumentId={activeDocumentId}
          onSelectDocument={selectDocument}
          onCreateDocument={createNewDocument}
          onDeleteDocument={deleteDocument}
          onUpdateDocumentTitle={updateDocumentTitle}
          canCreateMoreDocuments={canCreateMoreDocuments}
          documentCount={documentCount}
        />
        <AdvocacyDocument
          activeDocument={activeDocument}
          isLoading={isLoading}
          error={error}
          onContentChange={handleContentChange}
        />
      </div>
    </div>
  );
}
