import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import ThemeProvider from './components/Theme/ThemeProvider'
import AuthProvider from './components/Auth/AuthProvider'
import Calendar from './components/Calendar/Calendar'
import GymCalendar from './components/Calendar/GymCalendar'
import Sports from './components/Sports/Sports'
import Profile from './components/Profile/Profile'
import Layout from './components/Layout'
import Home from './components/Home'
import Users from './components/Users/Users'
import Contact from './components/Contact/Contact'
import Login from './components/Login'
import Register from './components/Register'
import './main.scss'
import 'material-icons/iconfont/material-icons.css';
import RequireAuth from './components/Auth/RequireAuth'
import { PasswordReset } from './components/Users/PasswordReset'
import { PasswordRecovery } from './components/Users/PasswordRecovery'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="calendar/:viewType?/:date?" element={<Calendar />} />
              <Route path="gym_calendar/:viewType?/:date?" element={<GymCalendar />} />
              <Route path="sports" element={<Sports />} />
              <Route path="profile" element={<RequireAuth><Profile /></RequireAuth>} />
              <Route path="users" element={<RequireAuth><Users /></RequireAuth>} />
              <Route path="contact" element={<Contact />} />
              <Route path="link4" element={null} />
              <Route path="link5" element={null} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password_recovery" element={<PasswordRecovery />} />
            <Route path="/password_reset/:uuid" element={<PasswordReset />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
