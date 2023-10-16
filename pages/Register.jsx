import { useState } from "react";
//import Navbar from "../components/navbar";

import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, saveUserWallet } from "./api/firebase/firebase";

function RegisterUser() {
  const router = useRouter();

  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");

  console.log(emailRegister, passwordRegister);

  const handleRegister = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, emailRegister, passwordRegister).then(
      (userCredential) => {
        const user = userCredential.user;
        console.log(user);
        const uiduser = user.uid;

        console.log("your ID: " + uiduser);
        let id = uiduser;
        saveUserWallet(id);
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        router.push("/Login");
      }
    );
  };

  return (
    <>

<div className='form'>
        <div className="form-inputs">
      <main className="w-screen flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <section className="flex w-[30rem] flex-col space-y-10">
          <div className="text-center text-4xl font-medium tittle">Register</div>

          <form className="px-8 flex items-center flex-col gap-4">
            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
              <input
                onChange={(e) => {
                  setEmailRegister(e.target.value);
                }}
                type="email"
                placeholder="Email"
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none form-input"
              />
            </div>
            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
              <input
                onChange={(e) => {
                  setPasswordRegister(e.target.value);
                }}
                type="password"
                placeholder="Password"
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              />
            </div>
            <button
              onClick={(e) => {
                handleRegister(e);
              }}
              className="transform rounded-md bg-indigo-600 py-2 px-4 font-bold duration-300 hover:bg-indigo-400 text-center button-form"
            >
              Register
            </button>
          </form>

          <div className="flex items-center justify-center gap-2">
            <p className="text-center text-lg gap-1">Already have an account?</p>

          </div>
        </section>
      </main>
      </div>
      </div>
    </>
  );
}

export default RegisterUser;