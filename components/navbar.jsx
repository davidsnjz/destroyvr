import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import ultimateDestroyIMG from '../assets/Images/ISO.svg'
import Cookies from 'js-cookie';

function Navbar() {
  const [session, setSession] = useState(false);

    let token;

    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
    }

    const handleLogout = async () => {
        await signOut(auth);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionHandle();
    }

    const sessionHandle = () => {
        if (token) {
            setSession(true);
            console.log('token exists')
        }else{
            setSession(false);
            console.log('token does not exists')
        }
    }

  useEffect(() => {
    sessionHandle();
  }, []);

  return (
    <div className="flex items-center w-full bg-slate-700 py-2 px-8 fixed" >
      <div className="flex w-full" >
        <div className="flex justify-start" >
          
        </div>
        <div className="w-full flex items-center justify-end" >
          {session ? (
            <div className="flex gap-4" >
              <a href="/home" className="buttons" >
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
                <a href="/login" className="buttons" >
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
