import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import ultimateDestroyIMG from '../assets/Images/ISO.svg'
import Cookies from 'js-cookie';

function Navbar() {
  const [session, setSession] = useState(false);

  const token = Cookies.get('token');

  const handleLogout = async () => {
    await signOut(auth);
    Cookies.remove('token');
    Cookies.remove('user');
    sessionHandle();
    window.location.href = '/'; // Redirigir a la página de inicio
  };

  const sessionHandle = () => {
    if (token) {
      setSession(true);
      console.log('token exists');
    } else {
      setSession(false);
      console.log('token does not exist');
    }
  };

  useEffect(() => {
    sessionHandle();
  }, []);

  return (
    <div className="flex items-center w-full bg-slate-700 py-2 px-8 fixed">
      <div className="flex w-full">
        <div className="flex justify-start">
          
        </div>
        <div className="w-full flex items-center justify-end">
          {session ? (
            <div className="flex gap-4">
              <a href="/Home" className="buttons">
                Home
              </a>
              <button
                onClick={handleLogout}
                className="text-white font-bold border py-2 px-4 rounded-lg hover:bg-slate-800 transition duration-300">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
                <a href="/login" className="buttons">
                Login
                </a>
                <a href="/register" className="buttons">
                Register
                </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
