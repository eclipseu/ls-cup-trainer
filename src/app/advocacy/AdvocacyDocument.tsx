"use client";

import EditableSection from "./EditableSection";
import { HiPrinter } from "react-icons/hi";
import { AdvocacyContent } from "@/types";

interface AdvocacyDocumentProps {
  activeDocument: AdvocacyContent | null;
  isLoading: boolean;
  error: string | null;
  onContentChange: (field: keyof AdvocacyContent, value: string) => void;
}

export default function AdvocacyDocument({
  activeDocument,
  isLoading,
  error,
  onContentChange,
}: AdvocacyDocumentProps) {
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

  if (!activeDocument) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-500">No document selected</div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 flex flex-col sm:flex-row justify-between items-center border-t-4 border-red-600">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">
          Advocacy Plan Builder
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              const printWindow = window.open("", "_blank");
              if (printWindow) {
                printWindow.document.write(`
                  <html>
                    <head>
                      <title>Advocacy Plan - ${activeDocument.title}</title>
                      <style>
                        @page {
                          margin: 0.5in;
                          @top-center { content: ""; }
                          @bottom-center { content: ""; }
                        }
                        body { 
                          font-family: 'Times New Roman', serif; 
                          margin: 0; 
                          padding: 0; 
                          line-height: 1.6;
                          color: #000;
                        }
                        .print-title { 
                          text-align: center; 
                          font-size: 2rem; 
                          font-weight: bold; 
                          margin-bottom: 2rem; 
                        }
                        .print-divider { 
                          border-bottom: 2px solid #ccc; 
                          width: 25%; 
                          margin: 2rem auto; 
                        }
                        .print-name { 
                          text-align: center; 
                          font-size: 1.5rem; 
                          margin-bottom: 1rem; 
                        }
                        .print-date { 
                          text-align: center; 
                          font-size: 1.2rem; 
                          margin-bottom: 3rem; 
                        }
                        .print-section { 
                          margin-bottom: 2rem; 
                        }
                        .print-section-title { 
                          font-size: 1.5rem; 
                          font-weight: bold; 
                          border-bottom: 2px solid #ddd; 
                          padding-bottom: 0.5rem; 
                          margin-bottom: 1rem; 
                        }
                        .print-section-subtitle { 
                          font-size: 1.2rem; 
                          font-weight: 600; 
                          margin-bottom: 0.8rem; 
                        }
                        .print-content { 
                          font-size: 1rem; 
                          line-height: 1.8; 
                          white-space: pre-wrap; 
                        }
                        @media print {
                          body { margin: 0; padding: 0; }
                          .print-section { page-break-inside: avoid; }
                        }
                      </style>
                    </head>
                    <body>
                      <div class="print-title">${activeDocument.title}</div>
                      <div class="print-divider"></div>
                      <div class="print-name">${activeDocument.advocateName}</div>
                      <div class="print-date">${activeDocument.date}</div>
                      
                      <div class="print-section">
                        <div class="print-section-title">Abstract</div>
                        <div class="print-content">${activeDocument.abstract}</div>
                      </div>
                      
                      <div class="print-section">
                        <div class="print-section-title">Introduction</div>
                        <div class="print-content">${activeDocument.introduction}</div>
                      </div>
                      
                      <div class="print-section">
                        <div class="print-section-title">Statement of the Problem</div>
                        <div class="print-content">${activeDocument.problemStatement}</div>
                      </div>
                      
                      <div class="print-section">
                        <div class="print-section-title">Objectives of the Advocacy</div>
                        <div class="print-section-subtitle">General Objective</div>
                        <div class="print-content">${activeDocument.generalObjective}</div>
                        <div class="print-section-subtitle">Specific Objectives</div>
                        <div class="print-content">${activeDocument.specificObjectives}</div>
                      </div>
                      
                      <div class="print-section">
                        <div class="print-section-title">Significance of the Advocacy</div>
                        <div class="print-content">${activeDocument.significance}</div>
                      </div>
                      
                      <div class="print-section">
                        <div class="print-section-title">Proposed Plan / Methodology</div>
                        <div class="print-content">${activeDocument.methodology}</div>
                      </div>
                      
                      <div class="print-section">
                        <div class="print-section-title">Expected Outcomes</div>
                        <div class="print-content">${activeDocument.expectedOutcomes}</div>
                      </div>
                      
                      <div class="print-section">
                        <div class="print-section-title">Conclusion & Call to Action</div>
                        <div class="print-content">${activeDocument.conclusion}</div>
                      </div>
                      
                      <div class="print-section">
                        <div class="print-section-title">References</div>
                        <div class="print-content">${activeDocument.references}</div>
                      </div>
                    </body>
                  </html>
                `);
                printWindow.document.close();
                printWindow.print();
              }
            }}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            <HiPrinter className="mr-2" />
            Print
          </button>
        </div>
      </div>

      <div
        id="advocacy-document"
        className="bg-white shadow-2xl rounded-lg p-8 sm:p-12 lg:p-16"
        style={{ fontFamily: "'Times New Roman', serif" }}
      >
        {/* Title Page */}
        <div className="text-center mb-16">
          <EditableSection
            value={activeDocument.title}
            onChange={(val) => onContentChange("title", val)}
            isTextarea={false}
            className="text-4xl font-bold"
          />
          <div className="my-8 border-b-2 border-gray-300 w-1/4 mx-auto"></div>
          <EditableSection
            value={activeDocument.advocateName}
            onChange={(val) => onContentChange("advocateName", val)}
            isTextarea={false}
            className="text-2xl"
          />
          <EditableSection
            value={activeDocument.date}
            onChange={(val) => onContentChange("date", val)}
            isTextarea={false}
            className="text-xl mt-4"
          />
        </div>

        {/* Sections */}
        <EditableSection
          title="Abstract"
          value={activeDocument.abstract}
          onChange={(val) => onContentChange("abstract", val)}
          hint="Write a short summary (150–300 words) covering the problem, your proposed solution, and the expected impact."
        />
        <EditableSection
          title="Introduction"
          value={activeDocument.introduction}
          onChange={(val) => onContentChange("introduction", val)}
          hint="Provide background on the issue, explain why it matters, and its relevance to the community or society."
        />
        <EditableSection
          title="Statement of the Problem"
          value={activeDocument.problemStatement}
          onChange={(val) => onContentChange("problemStatement", val)}
          hint="Clearly define the specific issue your advocacy addresses, including its root causes and effects."
        />
        <EditableSection
          title="Objectives of the Advocacy"
          value={activeDocument.generalObjective}
          onChange={(val) => onContentChange("generalObjective", val)}
          subtitle="General Objective"
          hint="State the main goal of your advocacy in one clear sentence."
        />
        <EditableSection
          value={activeDocument.specificObjectives}
          onChange={(val) => onContentChange("specificObjectives", val)}
          subtitle="Specific Objectives"
          hint="List the specific, measurable steps you will take to achieve your general objective. Use bullet points."
        />
        <EditableSection
          title="Significance of the Advocacy"
          value={activeDocument.significance}
          onChange={(val) => onContentChange("significance", val)}
          hint="Describe who will benefit from your advocacy (e.g., students, the environment) and the expected short-term and long-term impacts."
        />
        <EditableSection
          title="Proposed Plan / Methodology"
          value={activeDocument.methodology}
          onChange={(val) => onContentChange("methodology", val)}
          hint="Detail how you will implement your advocacy. Include steps, strategies, campaigns, events, and any tools or platforms you will use."
        />
        <EditableSection
          title="Expected Outcomes"
          value={activeDocument.expectedOutcomes}
          onChange={(val) => onContentChange("expectedOutcomes", val)}
          hint="List the tangible results you expect, such as increased awareness, policy changes, or improved community habits."
        />
        <EditableSection
          title="Conclusion & Call to Action"
          value={activeDocument.conclusion}
          onChange={(val) => onContentChange("conclusion", val)}
          hint="Summarize the importance of your advocacy and clearly state what you want your audience to do to support your cause."
        />
        <EditableSection
          title="References"
          value={activeDocument.references}
          onChange={(val) => onContentChange("references", val)}
          hint="Cite any books, articles, websites, or other sources you used."
        />
      </div>
    </>
  );
}
