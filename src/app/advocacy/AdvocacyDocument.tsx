"use client";

import EditableSection from "./EditableSection";
import { HiDocumentDownload, HiPrinter, HiSave } from "react-icons/hi";
import { useAdvocacyState } from "./hooks/useAdvocacyState";

export default function AdvocacyDocument() {
  const { content, isLoading, error, handleContentChange } = useAdvocacyState();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-bold text-gray-500">
          Loading Advocacy Plan...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50">
        <div className="text-2xl font-bold text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!content) {
    return null; // Or a fallback UI
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 flex flex-col sm:flex-row justify-between items-center border-t-4 border-red-600">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">
          Advocacy Plan Builder
        </h1>
        <div className="flex space-x-2">
          <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            <HiSave className="mr-2" />
            Save
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
            <HiDocumentDownload className="mr-2" />
            Export
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            <HiPrinter className="mr-2" />
            Print
          </button>
        </div>
      </div>

      <div
        className="bg-white shadow-2xl rounded-lg p-8 sm:p-12 lg:p-16"
        style={{ fontFamily: "'Times New Roman', serif" }}
      >
        {/* Title Page */}
        <div className="text-center mb-16">
          <EditableSection
            value={content.title}
            onChange={(val) => handleContentChange("title", val)}
            isTextarea={false}
            className="text-4xl font-bold"
          />
          <div className="my-8 border-b-2 border-gray-300 w-1/4 mx-auto"></div>
          <EditableSection
            value={content.advocateName}
            onChange={(val) => handleContentChange("advocateName", val)}
            isTextarea={false}
            className="text-2xl"
          />
          <EditableSection
            value={content.date}
            onChange={(val) => handleContentChange("date", val)}
            isTextarea={false}
            className="text-xl mt-4"
          />
        </div>

        {/* Sections */}
        <EditableSection
          title="Abstract"
          value={content.abstract}
          onChange={(val) => handleContentChange("abstract", val)}
          hint="Write a short summary (150–300 words) covering the problem, your proposed solution, and the expected impact."
        />
        <EditableSection
          title="Introduction"
          value={content.introduction}
          onChange={(val) => handleContentChange("introduction", val)}
          hint="Provide background on the issue, explain why it matters, and its relevance to the community or society."
        />
        <EditableSection
          title="Statement of the Problem"
          value={content.problemStatement}
          onChange={(val) => handleContentChange("problemStatement", val)}
          hint="Clearly define the specific issue your advocacy addresses, including its root causes and effects."
        />
        <EditableSection
          title="Objectives of the Advocacy"
          value={content.generalObjective}
          onChange={(val) => handleContentChange("generalObjective", val)}
          subtitle="General Objective"
          hint="State the main goal of your advocacy in one clear sentence."
        />
        <EditableSection
          value={content.specificObjectives}
          onChange={(val) => handleContentChange("specificObjectives", val)}
          subtitle="Specific Objectives"
          hint="List the specific, measurable steps you will take to achieve your general objective. Use bullet points."
        />
        <EditableSection
          title="Significance of the Advocacy"
          value={content.significance}
          onChange={(val) => handleContentChange("significance", val)}
          hint="Describe who will benefit from your advocacy (e.g., students, the environment) and the expected short-term and long-term impacts."
        />
        <EditableSection
          title="Proposed Plan / Methodology"
          value={content.methodology}
          onChange={(val) => handleContentChange("methodology", val)}
          hint="Detail how you will implement your advocacy. Include steps, strategies, campaigns, events, and any tools or platforms you will use."
        />
        <EditableSection
          title="Expected Outcomes"
          value={content.expectedOutcomes}
          onChange={(val) => handleContentChange("expectedOutcomes", val)}
          hint="List the tangible results you expect, such as increased awareness, policy changes, or improved community habits."
        />
        <EditableSection
          title="Conclusion & Call to Action"
          value={content.conclusion}
          onChange={(val) => handleContentChange("conclusion", val)}
          hint="Summarize the importance of your advocacy and clearly state what you want your audience to do to support your cause."
        />
        <EditableSection
          title="References"
          value={content.references}
          onChange={(val) => handleContentChange("references", val)}
          hint="Cite any books, articles, websites, or other sources you used."
        />
      </div>
    </>
  );
}
