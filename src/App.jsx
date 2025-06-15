import React from 'react';
import { useState, Suspense } from "react"
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
const About = React.lazy(() => import("./pages/About/About"))
const Shop = React.lazy(() => import("./pages/Shop/Shop"))
const Contact = React.lazy(() => import("./pages/Contact/Contact"))
const FAQs = React.lazy(() => import("./pages/FAQs/FAQs"))
const CollectionPage = React.lazy(() => import("./pages/CollectionPage/CollectionPage"))
const ProductDetails = React.lazy(() => import("./pages/ProductDetails/ProductDetails"))
const Search = React.lazy(() => import("./pages/Search/Search"))
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"))

// App Content Component (needs to be inside TVProvider to access context)
const AppContent = () => {
  const [playState, setPlayState] = useState(false)
  const { languageLoading, targetLanguage, language } = useTVContext()

  return (
    <>
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
    </>
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
