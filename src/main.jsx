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
import Layout from './components/Layout'
import Home from './components/Home'
import Login from './components/Login'
import './index.scss'
// import "@fontsource/roboto";
import 'material-icons/iconfont/material-icons.css';
import RequireAuth from './components/Auth/RequireAuth'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="link1" element={<RequireAuth><p>asdasd</p></RequireAuth>} />
              <Route path="link2" element={null} />
              <Route path="link3" element={null} />
              <Route path="link4" element={null} />
              <Route path="link5" element={null} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
