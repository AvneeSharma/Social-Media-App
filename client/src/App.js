import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import {Home, Login, Profile, Register, ResetPassword} from './pages/index.js';
import { useSelector } from "react-redux";

function Layout(){
  const {user} = useSelector(state => state.user);
  const location= useLocation();
  console.log(user);
  return user?.token ? (
    <Outlet/>
  ):(
    <Navigate to="/login" state={{from: location}} replace/>
  )
}
function App() {
  const {theme} = useSelector((state) => state.theme);
  
  return (
    <div data-theme={theme} className='w-full min-h-[100vh]'>
       <Routes>
        {/* Have to login to access these pages */}
        <Route element={<Layout/>}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id?" element={<Profile />} />
        </Route>

        {/* These pages can be accessed without logging in */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />

       </Routes>
    </div>
  );
}

export default App;
