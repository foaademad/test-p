import React, { useState, useRef, useEffect } from "react";
import { FileText, Eye, Download } from "lucide-react";
import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";

// Sample file data with local PDF files
const sampleFiles = [
  { id: 1, name: "document.pdf", date: "2025-05-15", size: "2.5 MB", url: "/files/2.pdf" },
  { id: 2, name: "report1.pdf", date: "2025-05-14", size: "1.2 MB", url: "/files/3.pdf" },
  { id: 3, name: "manual.pdf", date: "2025-05-13", size: "3.7 MB", url: "/files/4.pdf" },
];

const PDFViewer = ({ pdfUrl, onClose }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadingTask = pdfjs.getDocument(pdfUrl);
    loadingTask.promise.then((pdf) => {
      pdf.getPage(1).then((page) => {
        const scale = 1.5;
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        page.render(renderContext);
      });
    });
  }, [pdfUrl]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl p-4 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
          إغلاق
        </button>
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
};

function App() {
  const [viewingFile, setViewingFile] = useState(null);

  const handleViewFile = (file) => {
    setViewingFile(file);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">ملفاتي</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sampleFiles.map((file) => (
            <div key={file.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
                <FileText className="text-red-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 text-center mb-2 truncate" title={file.name}>{file.name}</h3>
              <div className="text-sm text-gray-500 text-center mb-4">
                <p>التاريخ: {file.date}</p>
                <p>الحجم: {file.size}</p>
              </div>
              <div className="flex justify-between gap-2">
                <button
                  onClick={() => handleViewFile(file)}
                  className="flex-1 bg-red-600 text-white py-2 px-3 rounded-md hover:bg-red-700">
                  <Eye size={16} /> عرض
                </button>
                <a
                  href={file.url}
                  download
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-3 rounded-md hover:bg-gray-300">
                  <Download size={16} /> تنزيل
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      {viewingFile && <PDFViewer pdfUrl={viewingFile.url} onClose={() => setViewingFile(null)} />}
    </div>
  );
}

export default App;
