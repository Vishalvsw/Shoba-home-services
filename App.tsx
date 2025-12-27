
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import BookingPage from './pages/BookingPage';
import ServiceDetail from './pages/ServiceDetail';
import LocationDetail from './pages/LocationDetail';
import StatusPage from './pages/StatusPage';
import PolicyPage from './pages/PolicyPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/locations/:slug" element={<LocationDetail />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/policy" element={<PolicyPage />} />
        {/* Fallback to Home for any unmatched routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
