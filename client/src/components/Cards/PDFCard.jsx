import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


function PDFCard({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="p-1 flex flex-wrap items-center justify-center">
      <div className="flex-shrink-0 m-6 relative overflow-hidden bg-gray-200 rounded-lg max-w-xs shadow-lg group">
        <div className="relative pt-10 px-10 flex items-center justify-center group-hover:scale-110 transition-transform">
          <div className="relative w-full">
          <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.18.0/pdf.worker.min.js`}>
  <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
</Worker>

          </div>
        </div>
        <div className="relative text-black px-6 pb-6 mt-6">
          <span className="block opacity-75 -mb-1">Document</span>
          <div className="flex justify-between">
            <span className="block font-semibold text-xl">PDF Preview</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PDFCard;
