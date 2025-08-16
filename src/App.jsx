import React from 'react';
import { useState, Suspense, useEffect, lazy } from "react"
import { Routes, Route } from "react-router-dom"
import { TVProvider } from "./context/TVContext"
import { useTVContext } from "./context/TVContext"
import "@fortawesome/fontawesome-free/css/all.min.css"

// Components
import TopBar from "./components/TopBar/TopBar"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import WhatsAppChat from "./components/WhatsAppChat/WhatsAppChat"
import ScrollToTop from "./components/ScrollToTop/ScrollToTop"
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner"
import LanguageLoader from "./components/LanguageLoader/LanguageLoader"

// Pages
const About = lazy(() => import("./pages/About/About"))
const Shop = lazy(() => import("./pages/Shop/Shop"))
const Contact = lazy(() => import("./pages/Contact/Contact"))
const FAQs = lazy(() => import("./pages/FAQs/FAQs"))
const CollectionPage = lazy(() => import("./pages/CollectionPage/CollectionPage"))
const ProductDetails = lazy(() => import("./pages/ProductDetails/ProductDetails"))
const Search = lazy(() => import("./pages/Search/Search"))
const NotFound = lazy(() => import("./pages/NotFound/NotFound"))

// Functional Error Boundary Component
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleError = (error, errorInfo) => {
      console.error('Error caught by boundary:', error, errorInfo);
      setHasError(true);
      setError(error);
    };

    // Add global error handler
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', (event) => {
      handleError(event.reason, { type: 'unhandledrejection' });
    });

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  if (hasError) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center', 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          maxWidth: '500px',
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{ color: '#dc3545', marginBottom: '20px' }}>⚠️ Something went wrong</h1>
          <p style={{ color: '#6c757d', marginBottom: '20px' }}>
            We encountered an unexpected error. Please refresh the page or try again later.
          </p>
          {error && (
            <details style={{ marginBottom: '20px', textAlign: 'left' }}>
              <summary style={{ cursor: 'pointer', color: '#6c757d' }}>Error Details</summary>
              <pre style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '10px', 
                borderRadius: '5px',
                fontSize: '12px',
                color: '#dc3545',
                overflow: 'auto'
              }}>
                {error.message || error.toString()}
              </pre>
            </details>
          )}
          <button 
            onClick={() => window.location.reload()} 
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            🔄 Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return children;
};

// App Content Component (needs to be inside TVProvider to access context)
const AppContent = () => {
  const [playState, setPlayState] = useState(false)
  const context = useTVContext()
  const languageLoading = context?.languageLoading || false
  const targetLanguage = context?.targetLanguage || null
  const language = context?.language || "en"

  return (
    <ErrorBoundary>
      {/* Language Loading Overlay */}
      {languageLoading && <LanguageLoader targetLanguage={targetLanguage} currentLanguage={language} />}

        <TopBar />
        <Navbar />
        <ScrollToTop />

        <main>
            <Routes>
              <Route path="/" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Shop />
                </Suspense>
              } />
              <Route path="/smart-tvs" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <CollectionPage />
                </Suspense>
              } />
              <Route path="/product/:id" element={
                <Suspense fallback={null}> {/* Set to null since ProductDetails has its own spinner */}
                  <ProductDetails />
                </Suspense>
              } />
              <Route path="/search" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Search />
                </Suspense>
              } />
              <Route path="/about" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <About playState={playState} setPlayState={setPlayState} />
                </Suspense>
              } />
              <Route path="/contact" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Contact />
                </Suspense>
              } />
              <Route path="/faqs" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <FAQs />
                </Suspense>
              } />
              <Route path="*" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <NotFound />
                </Suspense>
              } />
            </Routes>
        </main>

        <Footer />
        <WhatsAppChat />
    </ErrorBoundary>
  )
}

const App = () => {
  return (
    <TVProvider>
      <AppContent />
    </TVProvider>
  )
}

export default App
