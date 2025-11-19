import React from 'react';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?worker';
import samplePDF from '../assets/sample.pdf';
import { pdfjs, Document, Page as ReactPdfPage, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerPort = new pdfWorker();

export const PdfPage = React.forwardRef(
  ({ pageNumber, width, height }: { pageNumber: number; width: number; height: number }, ref) => {
    return (
      <div className="page" ref={ref}>
        <ReactPdfPage
          pageIndex={pageNumber}
          className="page-content"
          pageNumber={pageNumber}
          width={width}
          height={height}
          onRenderSuccess={async (page) => {
            // Get operator list which contains all rendering operations
            const opList = await page.getOperatorList();
            console.log('Operator List:', opList);

            // Find image operations
            opList.fnArray.forEach((op, i) => {
              // 82 is the code for 'paintImageXObject'
              if (op === 82) {
                const imgName = opList.argsArray[i][0]; // Image name/ID
                const imgData = page.commonObjs.get(imgName);

                // Get transform matrix (position/scale info)
                const prevOp = opList.fnArray[i - 1];
                const matrix = prevOp === 91 ? opList.argsArray[i - 1] : null;

                console.log('Image found:', {
                  name: imgName,
                  data: imgData,
                  position: matrix, // Contains [scaleX, skewY, skewX, scaleY, translateX, translateY]
                });
              }
            });
          }}
        />
        {/* {pageNumber === 2 && (
          <video
            controls
            autoPlay
            playsInline
            muted
            style={{ width: 'fit', height: '50%', position: 'absolute', top: '12%', right: 0 }}
            src={videoSrc}
          />
        )} */}
      </div>
    );
  },
);

export const PdfDocument = () => {
  const [totalPages, setTotalPages] = React.useState(0);

  return (
    <Document
      file={samplePDF}
      // style={{
      //   aspectRatio: '612/790',
      //   maxHeight: '100vh',
      //   overflow: 'hidden',
      // }}
      onLoadSuccess={(e) => {
        setTotalPages(e._pdfInfo.numPages);
      }}
      loading={<div>Loading...</div>}
    >
      <Page pageNumber={1} />
    </Document>
  );
};
