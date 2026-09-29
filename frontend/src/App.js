import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import { Toaster } from './components/ui/toaster';

const Home = () => (
  <div className="min-h-screen bg-black text-white">
    <Navbar />
    <main>
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Projects />
      <Testimonials />
      <Contact />
    </main>
    <Footer />
    <WhatsAppFloat />
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
