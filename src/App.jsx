import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Loading from './components/Loading'
import ProtectedRoute from './components/ProtectedRoute'

const MainLayout = lazy(() => import('./layouts/MainLayout'))
const AuthLayout = lazy(() => import('./layouts/AuthLayout'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Products = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const ComponentsPage = lazy(() => import('./pages/ComponentsPage'))
const Membership = lazy(() => import('./pages/Membership'))
const Reports = lazy(() => import('./pages/Reports'))
const Testimonials = lazy(() => import('./pages/Testimonials'))
const Profile = lazy(() => import('./pages/Profile'))
const Clients = lazy(() => import('./pages/Clients'))
const Users = lazy(() => import('./pages/Users'))
const CustomerDashboard = lazy(() => import('./pages/CustomerDashboard'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const NotFound = lazy(() => import('./pages/NotFound'))
const LandingPage = lazy(() => import('./pages/LandingPage'))

function App() {
  const location = useLocation()
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isAdmin = user.role === 'admin'

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/*
         * ═══════════════════════════════════════════════════
         * ALUR NAVIGASI:
         * 1. Buka app → Landing Page (/)
         * 2. Klik "Masuk" → /login
         * 3. Klik "Daftar" → /register
         * 4. Setelah login berhasil → /dashboard (admin) atau /customer (user)
         * ═══════════════════════════════════════════════════
         */}

        {/* ── 1. LANDING PAGE — Selalu tampil pertama, tidak butuh login ── */}
        <Route path="/" element={!isLoggedIn ? <LandingPage /> : isAdmin ? <Navigate to="/dashboard" replace /> : <Navigate to="/customer" replace />} />
        
        {/* Alias /landing → redirect ke / */}
        <Route path="/landing" element={<Navigate to="/" replace />} />

        {/* ── 2. AUTH PAGES (Login & Register) — Publik ── */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ── 3. HALAMAN TERPROTEKSI — Wajib login, redirect ke / jika belum ── */}
        <Route element={<ProtectedRoute isAllowed={isLoggedIn} redirectTo="/" />}>

          {isAdmin ? (
            /* ── 3a. Admin Layout & Routes ── */
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/komponen" element={<ComponentsPage />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/users" element={<Users />} />
              {/* Fallback: rute tidak dikenal → dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          ) : (
            /* ── 3b. Customer Routes ── */
            <>
              <Route path="/customer" element={<CustomerDashboard />} />
              {/* Fallback: rute tidak dikenal → customer dashboard */}
              <Route path="*" element={<Navigate to="/customer" replace />} />
            </>
          )}
        </Route>

        {/* ── 4. 404 Not Found ── */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App