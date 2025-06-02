import React from 'react';
import { LoadingProvider } from '../context/LoadingContext';
import { AppProps } from 'next/app';


export default function MyApp({Component, pageProps}: AppProps) {
  return (
    <LoadingProvider>
      <div className="min-h-screen bg-gray-50">
        <Component {...pageProps}/>
      </div>
    </LoadingProvider>
  );
}
