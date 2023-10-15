import { Link, useNavigate } from 'react-router-dom'
import ultimateDestroyIMG from '../assets/Images/ISO.svg'
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';

function Navbar() {

    const [session, setSession] = useState(false);

    const token = localStorage.getItem('token');

    const history = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionHandle();
        history('/')
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
    })

    return (
        <Router>
        <div className="flex items-center w-full bg-slate-700 py-2 px-8 fixed">
            <div className='flex w-full'>
                <div className='flex justify-start'>
                    <img src={ultimateDestroyIMG} className='h-14 w-auto' />
                </div>
               
                <div className="w-full flex items-center justify-end">
                    {session ?
                        <div className='flex gap-4'>
                            <Link to={"/Home"} className='buttons'>
                                Home
                            </Link>
                            <button onClick={handleLogout} className="text-white font-bold border py-2 px-4 rounded-lg hover:bg-slate-800 transition duration-300">
                                Logout
                            </button>
                        </div>
                        :
                        <Link to={"/login"} className='buttons'>
                            Sign In
                        </Link>
                    }
                </div>
            </div>
        </div>
        </Router>
    )
}

export default Navbar