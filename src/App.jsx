import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Home from './pages/Home';
import Memories from './pages/Memories';
import Chat from './pages/Chat';
import MemoryDetail from './pages/MemoryDetail';
import Insights from './pages/Insights';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

// Helper to guard routes
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Routes>
      {/* 1. Dynamic Root Redirect */}
      <Route 
        path="/" 
        element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} 
      />

      {/* 2. Protected Layout Routes */}
      <Route element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path="/home" element={<Home />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/memory/:id" element={<MemoryDetail />} />
      </Route>

      {/* 3. Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 4. Protected Independent Route */}
      <Route 
        path="/chat" 
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}