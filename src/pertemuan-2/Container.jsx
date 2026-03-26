// src/pertemuan-2/Container.jsx
import React from 'react';

// Nested Component (Komponen Pembungkus)
export default function Container({ children }) {
  // properti { children } memungkinkan komponen induk untuk membungkus komponen anak
  return (
    <div className="container-wrapper">
      <h1 className="title-container">Biodata</h1>
      {children} {/* Isi dari Container */}
      <hr />
      <footer>
        <p>2025 - Politeknik Caltex Riau</p>
      </footer>
    </div>
  );
}