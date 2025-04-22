import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Routes, Route } from 'react-router-dom';

// Components
import TopBar from './components/TopBar/TopBar';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer'; // Optional

// Pages
import About from './pages/About/About';
import Shop from './pages/Shop/Shop';
import Contact from './pages/Contact/Contact';
import FAQs from './pages/FAQs/FAQs';
import ShopCategory from './pages/ShopCategory/ShopCategory';

const App = () => {
  return (
    <>
      <TopBar />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/smart-tvs" element={<ShopCategory />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
};

export default App;
