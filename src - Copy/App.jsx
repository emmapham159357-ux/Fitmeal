import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import { Home as HomeIcon, BookOpen, Utensils, PieChart, Users, MessageCircle, User } from 'lucide-react';
import Home from './components/Home';
import Handbook from './components/Handbook';
import MenuSuggestion from './components/MenuSuggestion';
import CalorieAnalyzer from './components/CalorieAnalyzer';
import Community from './components/Community';
import ContactSupport from './components/ContactSupport';
import Account from './components/Account';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <Link to="/" className="sidebar-logo">
            FitMeal
          </Link>
          <nav className="nav-links">
            <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
              <HomeIcon size={20} /> Trang chủ
            </NavLink>
            <NavLink to="/handbook" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <BookOpen size={20} /> Cẩm nang
            </NavLink>
            <NavLink to="/menu" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Utensils size={20} /> Gợi ý menu
            </NavLink>
            <NavLink to="/calories" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <PieChart size={20} /> Phân tích calo
            </NavLink>
            <NavLink to="/community" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Users size={20} /> Cộng đồng
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <MessageCircle size={20} /> Hỗ trợ
            </NavLink>
            <NavLink to="/account" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <User size={20} /> Tài khoản
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/handbook" element={<Handbook />} />
            <Route path="/menu" element={<MenuSuggestion />} />
            <Route path="/calories" element={<CalorieAnalyzer />} />
            <Route path="/community" element={<Community />} />
            <Route path="/contact" element={<ContactSupport />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
