import React from 'react'
import { createRoot } from 'react-dom/client'
import FlowerApp from './FlowerApp'
import './tailwind.css' // Langsung panggil karena sudah satu folder

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FlowerApp />
  </React.StrictMode>
)