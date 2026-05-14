import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loading from './components/Loading'
import ProtectedRoute from './components/ProtectedRoute'

const MainLayout = lazy(() => import('./layouts/MainLayout'))
const AuthLayout = lazy(() => import('./layouts/AuthLayout'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Products = lazy(() => import('./pages/Products'))
// TAMBAHKAN INI:
const ProductDetail = lazy(() => import('./pages/ProductDetail')) 

const Membership = lazy(() => import('./pages/Membership'))
const Reports = lazy(() => import('./pages/Reports'))
const Testimonials = lazy(() => import('./pages/Testimonials'))
const Profile = lazy(() => import('./pages/Profile'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute isAllowed={isLoggedIn} redirectTo="/login" />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            {/* TAMBAHKAN ROUTE DINAMIS DISINI */}
            <Route path="/products/:id" element={<ProductDetail />} />
            
            <Route path="/membership" element={<Membership />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App