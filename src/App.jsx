import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Memories from './pages/Memories';
import Chat from './pages/Chat';
import MemoryDetail from './pages/MemoryDetail';
import Insights from './pages/Insights';
import Login from './pages/Login';
import Register from './pages/Register'
import Profile from './pages/Profile'
// import Insights from './pages/Insights';
// import Profile from './pages/Profile';

export default function App() {
  return (
    <Routes>
      {/* 1. Redirect root to home */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* 2. Layout-protected routes (Shared Bottom Nav) */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/memory/:id" element={<MemoryDetail />} />
        <Route path="/memory/:id" element={<MemoryDetail />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* 3. Independent full-screen routes (No Bottom Nav) */}
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}