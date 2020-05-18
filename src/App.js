import React, { useState, useEffect } from 'react';

import { Document, Page, pdfjs } from 'react-pdf';
import './App.css';
import * as pdfFile from './assets/pdf/The_Curse_Of_C-19 .pdf';
import * as img from './assets/images/DS_Logo_Yellow.png'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Loader() {
  return (
    <div className="lds-ripple"><div></div><div></div></div>
  )
}

function App() {
  const innerHeight = window.innerHeight * 0.9;
  const innerWidth = window.innerWidth < 500 ? window.innerWidth * 0.9 : null;

  let [numPages, setNumPages] = useState(null);
  let [height, setHeight] = useState(innerHeight);
  let [width, setWidth] = useState(innerWidth);
  let [pageNumber, setPageNumber] = useState(1);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    window.addEventListener('orientationchange', (e) => {
      if (width !== null) {
        setHeight(window.innerHeight * 0.8);
        setWidth(window.innerWidth * 0.9);
      }
      console.log('Orientation changed')
    })
  })
  const dimensions = width !== null ? { width: width } : {}

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false)
  }
  return (
    <div className="App d-flex flex-column h-100 justify-content-center align-items-center">
      {!loading &&
        <div className="px-5 mt-4">
          <img src={img} className="img-fluid w-100" style={{ maxWidth: 250 }} alt="logo" />
        </div>}
      <div className="flex-grow-1 d-flex flex-column justify-content-center">
        <Document
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<Loader />}
        >
          <Page pageNumber={pageNumber} {...dimensions} loading={<Loader />} />
        </Document>
        {!loading &&
          <div className="d-flex align-items-center justify-content-center american-silver ">
            <p className="mx-2" onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}>
              <i className="fas fa-chevron-left"></i>
            </p>
            <p>{pageNumber} of {numPages}</p>
            <p className="mx-2 " onClick={() => pageNumber < numPages && setPageNumber(pageNumber + 1)}>
              <i className="fas fa-chevron-right"></i>
            </p>
          </div>}
      </div>

      <div className="d-flex w-100 justify-content-center px-2 footer american-silver">
        <a href="http://www.dreamsketchers.com/">Dreamsketchers Media LLP.</a><span className="mx-2">|</span> <p className="m-0">built with <i class="fas fa-heart"></i> by <a href="https://github.com/valindo">Valindo</a></p>
      </div>
    </div>
  );
}

export default App;
