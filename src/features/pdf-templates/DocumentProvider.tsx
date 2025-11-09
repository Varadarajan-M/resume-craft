'use client';

const BlobProvider = dynamic(() =>
  import('@react-pdf/renderer').then((module) => module.BlobProvider)
);

import useLocalStorageState from '@/shared/hooks/useLocalStorageState';
import dynamic from 'next/dynamic';
import React from 'react';
import { PDFPreview } from '../resume-builder/components/resume-preview';

interface DocumentProviderProps {
  children: React.JSX.Element;
}

const DocumentProvider = ({ children }: DocumentProviderProps) => {
  const [zoomScale, setZoomScale] = useLocalStorageState(
    0.95,
    'resume-craft:pdf-zoom-scale'
  );

  return (
    <BlobProvider document={children}>
      {({ url }) => {
        if (url)
          return (
            <div className="h-screen w-full" data-pdf-blob-url={url}>
              <PDFPreview
                fileUrl={url ?? ''}
                onZoomChange={setZoomScale}
                zoomScale={zoomScale}
              />
            </div>
          );
      }}
    </BlobProvider>
  );
};

export default DocumentProvider;
