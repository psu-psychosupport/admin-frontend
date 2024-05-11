import React, { useState } from "react";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import { pdfjs, Document, Page } from "react-pdf";
import { ClientOnly } from "remix-utils/client-only";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const PresentRoute = () => {
  const [file, setFile] = useState<File>();
  const [pages, setPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  return (
    <div>
      <input
        type="file"
        onChange={(event) => setFile(event.target.files!.item(0)!)}
      />
      <ClientOnly
        fallback={
          <div>
            <p>loading...</p>
          </div>
        }
      >
        {() => (
          <Document
            file={file}
            onLoadSuccess={({ numPages }) => setPages(numPages)}
          >
            <Page pageNumber={pageNumber} renderTextLayer={false} />
          </Document>
        )}
      </ClientOnly>
      <button onClick={() => setPageNumber(prev => prev - 1)}>prev</button>
      <button onClick={() => setPageNumber(prev => prev + 1)}>next</button>
    </div>
  );
};

export default PresentRoute;
