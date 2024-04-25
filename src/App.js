import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import Page1 from './pages/345.jsx'; // Assuming the file is named 'Page1.jsx' with PascalCase
import Page2 from './pages/334.jsx'; // Assuming the file is named 'Page1.jsx' with PascalCase
import Page3 from './pages/344.jsx'; // Assuming the file is named 'Page1.jsx' with PascalCase
import Page4 from './pages/4boxes.jsx'; // Assuming the file is named 'Page1.jsx' with PascalCase
import Page5 from './pages/zigzag.jsx'; // Assuming the file is named 'Page1.jsx' with PascalCase

import Header from './components/Header.jsx'; // Assuming the file is named 'Header.jsx' with PascalCase

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page1 />} />
          <Route path="/334" element={<Page2 />} />
          <Route path="/344" element={<Page3 />} />
          <Route path="/4boxes" element={<Page4 />} />
          <Route path="/zigzag" element={<Page5 />} />



          {/* Define more routes if needed */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
