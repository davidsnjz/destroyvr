import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Navbar from "../components/navbar"
import { auth } from "../firebase/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"


function Login() {

    const history = useNavigate()

    const [emailLogin, setEmailLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')


    const handleSignIn = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                
                // store user info in local storage
                localStorage.setItem('token', user.accessToken);
                localStorage.setItem('user', JSON.stringify(user));


                history('/home')
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }
    // Login page

    return (
        <>
            <Navbar />
            <main className="w-screen flex min-h-screen items-center justify-center bg-gray-900 text-white">
                <section className="flex w-[30rem] flex-col space-y-10">
                    <div className="text-center text-4xl font-medium">Log In</div>
                    <form className="px-8 flex items-center flex-col gap-4">
                        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500" >
                            <input onChange={(e) => { setEmailLogin(e.target.value) }} type="email" placeholder="Email" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
                        </div>
                        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                            <input onChange={(e) => { setPasswordLogin(e.target.value) }} type="password" placeholder="Password" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
                        </div>
                        <button onClick={(e) => { handleSignIn(e) }} className="transform rounded-sm bg-indigo-600 py-2 px-4 font-bold duration-300 hover:bg-indigo-400 text-center">
                            LOG IN
                        </button>
                    </form>
                    <a href="#" className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300" >
                        FORGOT PASSWORD?
                    </a>
                    <div className="flex items-center justify-center gap-2">
                        <p className="text-center text-lg gap-1">
                            No account?
                        </p>
                        <Link to="/register" className="font-medium text-indigo-500 underline-offset-4 hover:underline">
                            Create One
                        </Link>
                    </div>

                </section>
            </main>
        </>
    )
}

export default Login