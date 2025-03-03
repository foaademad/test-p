import React, { useState } from 'react';
import { FileText, Eye, Download } from 'lucide-react';

// Sample file data with local PDF files
const sampleFiles = [
  { id: 1, name: 'document.pdf', date: '2025-05-15', size: '2.5 MB', url: '/files/2.pdf' },
  { id: 2, name: 'report1.pdf', date: '2025-05-14', size: '1.2 MB', url: '/files/3.pdf' },
  { id: 3, name: 'manual.pdf', date: '2025-05-13', size: '3.7 MB', url: '/files/4.pdf' },
  { id: 4, name: 'presentation.pdf', date: '2025-05-12', size: '5.1 MB', url: '/files/5.pdf' },
  { id: 5, name: 'report.pdf', date: '2025-05-11', size: '1.8 MB', url: '/files/6.pdf' },
  { id: 6, name: 'guide.pdf', date: '2025-05-10', size: '15.3 MB', url: '/files/7.pdf' },
  { id: 7, name: 'document2.pdf', date: '2025-05-09', size: '4.2 MB', url: '/files/8.pdf' },
  { id: 8, name: 'whitepaper.pdf', date: '2025-05-08', size: '7.9 MB', url: '/files/9.pdf' },
];

function App() {
  const [viewingFile, setViewingFile] = useState<{ id: number; url: string } | null>(null);

  const handleViewFile = (id: number, url: string) => {
    setViewingFile({ id, url });
  };

  const handleCloseViewer = () => {
    setViewingFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">ملفاتي</h1>
        
        {/* File Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sampleFiles.map((file) => (
            <div 
              key={file.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
                  <FileText className="text-red-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 text-center mb-2 truncate" title={file.name}>
                  {file.name}
                </h3>
                <div className="text-sm text-gray-500 text-center mb-4">
                  <p>التاريخ: {file.date}</p>
                  <p>الحجم: {file.size}</p>
                </div>
                <div className="flex justify-between gap-2">
                  <button
                    onClick={() => handleViewFile(file.id, file.url)}
                    className="flex-1 flex items-center justify-center gap-1 bg-red-600 text-white py-2 px-3 rounded-md hover:bg-red-700 transition-colors"
                  >
                    <Eye size={16} />
                    <span>عرض</span>
                  </button>
                  <a
                    href={file.url}
                    download={file.name}
                    className="flex-1 flex items-center justify-center gap-1 bg-gray-200 text-gray-800 py-2 px-3 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    <Download size={16} />
                    <span>تنزيل</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* File Viewer Modal */}
      {viewingFile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {sampleFiles.find(f => f.id === viewingFile.id)?.name}
              </h3>
              <button 
                onClick={handleCloseViewer}
                className="text-gray-500 hover:text-gray-700"
              >
                إغلاق
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <div className="w-full h-full min-h-[60vh] relative">
              <iframe
  src={`https://docs.google.com/gview?url=${encodeURIComponent(window.location.origin + viewingFile.url)}&embedded=true`}
  className="w-full h-full absolute inset-0 border-0"
  title={`PDF Viewer - ${sampleFiles.find(f => f.id === viewingFile.id)?.name}`}
  frameBorder="0"
  scrolling="no"
  sandbox="allow-same-origin allow-scripts"
  allowFullScreen
  onLoad={() => {
    // حاول إخفاء العناصر غير المرغوب فيها باستخدام JavaScript
    const iframe = document.querySelector('iframe');
    if (iframe) {
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      if (iframeDocument) {
        const exstandElement = iframeDocument.querySelector('.exstand'); // استبدل بالاختيار المناسب
        if (exstandElement) {
          exstandElement.style.display = 'none';
        }
      }
    }
  }}
>
</iframe>  



                
              
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;