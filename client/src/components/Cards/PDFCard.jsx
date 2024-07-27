import React from 'react';

function PDFCard({ pdfUrl }) {
  return (
    <div className="p-1 flex flex-wrap items-center justify-center">
      <div className="flex-shrink-0 m-6 relative overflow-hidden bg-gray-200 rounded-lg max-w-xs shadow-lg group">
        <div className=" relative pt-10 flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden">
          <iframe 
            src={pdfUrl}
            // height="200px"
            style={{ border: 'none' }}
            className='w-fit h-fit'
          />
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
