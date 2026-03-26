// src/pertemuan-2/BioData.jsx
import React from 'react';
// Pastikan kamu sudah menaruh file foto di folder assets
import fotoProfil from '../assets/zhefanya.jpg'; 

// Parent Component (Komponen Utama)
export default function BioData() {
  return (
    <div>
      <h1 className="title">Pemrograman Framework Lanjutan</h1>
      <p style={{ textAlign: 'center' }}>~ Profile Actress Edition ~</p>
      
      {/* Menggunakan Child Component: Greeting */}
      <Greeting />
      
      {/* Menggunakan Child Component: UserCard dengan data dummy */}
      <UserCard 
        nama="Go Youn-jung (고윤정)"
        nim="19960422"
        tanggal="22 April 1996"
        alamat="Seoul, South Korea"
        hobi="Photography & Painting"
        prodi="Contemporary Art"
        kampus="Seoul Woman's University"
      />
      
      {/* Menggunakan Child Component: QuoteText */}
      <QuoteText />
    </div>
  );
}

// ==========================================
// Child Component 1: Greeting
// ==========================================
function Greeting() {
  return (
    <div>
      <p style={{ textAlign: 'center' }}>Welcome to the Official Profile</p>
    </div>
  );
}

// ==========================================
// Child Component 2: UserCard (Prop Component)
// ==========================================
function UserCard(props) {
  // Component yang menerima data melalui Props
  return (
    <div className="user-card">
      <hr />
      {/* Penambahan Foto Profil */}
      <div className="profile-wrapper" style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
        <img 
          src={fotoProfil} 
          alt="Foto Profil" 
          className="profile-img" 
          style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #ffebf2' }} 
        />
      </div>
      <p>Nama : {props.nama}</p>
      <p>NIM : {props.nim}</p>
      <p>Tanggal Lahir : {props.tanggal}</p>
      <p>Alamat : {props.alamat}</p>
      <p>Hobi : {props.hobi}</p>
      <p>Prodi : {props.prodi}</p>
      <p>Kampus : {props.kampus}</p>
    </div>
  );
}

// ==========================================
// Child Component 3: QuoteText (Javascript Component)
// ==========================================
function QuoteText() {
  // Komponen yang menggunakan manipulasi string Javascript
  const text = "Art is not what you see, but what you make others see.";
  const text2 = "— Edgar Degas";
  
  return (
    <div>
      <hr />
      <p style={{ textAlign: 'center' }}>{text.toUpperCase()}</p>
      <p style={{ textAlign: 'center' }}><small>{text2.toLowerCase()}</small></p>
    </div>
  );
}