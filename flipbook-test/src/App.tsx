import React from 'react';
import HTMLFlipBook from 'react-pageflip';
import { pdfjs, Document, Page as ReactPdfPage } from 'react-pdf';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?worker';
import './App.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import samplePDF from './assets/sample.pdf';
import videoSrc from './assets/funnel-test.mp4';
import styled from 'styled-components';

pdfjs.GlobalWorkerOptions.workerPort = new pdfWorker();

const width = 600 as const;
const height = 848 as const;

const PageCover = React.forwardRef(({ children }: { children: React.ReactNode }, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        <h2>{children}</h2>
      </div>
    </div>
  );
});

const Page = React.forwardRef(
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
        {pageNumber === 2 && (
          <video
            controls
            autoPlay
            playsInline
            muted
            style={{ width: 'fit', height: '50%', position: 'absolute', top: '12%', right: 0 }}
            src={videoSrc}
          />
        )}
      </div>
    );
  },
);

export default function App() {
  const flipbookRef = React.useRef<typeof HTMLFlipBook>(null);

  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);

  return (
    <PDFDocumentWrapper>
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
        <HTMLFlipBook
          disableFlipByClick
          usePortrait={false}
          width={width}
          height={height}
          ref={flipbookRef}
          size="stretch"
          minHeight={height}
          minWidth={width}
          maxWidth={1000}
          maxHeight={1533}
          maxShadowOpacity={0.5}
          mobileScrollSupport
          onFlip={(e) => {
            console.log(e);
            setPage(e.data + 1);
          }}
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <Page key={i} pageNumber={i + 1} width={width} height={height} />
          ))}
        </HTMLFlipBook>
      </Document>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100px',
          height: '100px',
          textAlign: 'center',
          fontSize: '32px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
        }}
      >
        {page}
      </div>
    </PDFDocumentWrapper>
  );
}

const PDFDocumentWrapper = styled.div`
  canvas {
    width: 100% !important;
    height: auto !important;
  }
  .react-pdf__Page .markedContent {
    display: none;
  }
`;
