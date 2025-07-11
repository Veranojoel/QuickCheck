import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from "./components/Register";
import Admin from './components/Admin';
import { GoogleOAuthProvider } from "@react-oauth/google";
import StickyHeadTable from './components/StudentGroup';
import { ToastContainer } from 'react-toastify';
import GlobalToast from './components/GlobalToast';
import {useEffect} from 'react';
import Student from './components/Student';

const clientId = "1086377487635-p5pnpc11gkshsr8rjh87eqgrpg18tn8j.apps.googleusercontent.com";

const RouteWithTitle = ({ element, title }) => {
  const location = useLocation();
 
  useEffect(() => {
    document.title = title;
  }, [location.pathname, title]);
 
  return element;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<RouteWithTitle title="Login" element={<Login />} />} />
      <Route path='/login' element={<RouteWithTitle title="Login" element={<Login />} />} />
      <Route path='/landing' element={<RouteWithTitle title="Landing Page" element={<LandingPage />} />} />
      <Route path='/register' element={<RouteWithTitle title="Register" element={<Register />} />} />
      <Route path='/admin' element={<RouteWithTitle title="Admin Dashboard" element={<Admin />} />} />
      <Route path='/student' element={<RouteWithTitle title="Student Group" element={<Student/>} />} />
      <Route path='*' element={<RouteWithTitle title="404 Not Found" element={<div>404 - Page Not Found</div>} />} />
    </Routes>
  );
};

const App = () => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
      <AppRoutes />
      <ToastContainer />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
