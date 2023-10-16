import { useContext} from "react";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "../pages/api/firebase/firebase";
import { ContextWallet } from "../Hooks/ConnectWallet";
import { async } from "@firebase/util";




function HomePage() {
  // se llama el contexto
  const router = useRouter();
  const contextFata = useContext(ContextWallet);
  const [publicKey, setPublicKey] = useState(null);
  const [session, setSession] = useState(false);


  let token;

    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
    }

    
  // logout
  const handleLogout = async () => {
    console.log("Desconectando la cuenta..");
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





  // *connect wallet
  const ConnWall = async () => {
    //!si phantom no esta instalado
    const provider = window?.phantom?.solana;
    const { solana } = window;

    if (!provider?.isPhantom || !solana.isPhantom) {
      toast.error("phamtom no instalado");
      setTimeout(() => {
        window.open("https://phantom.app/", "_blank");
      }, 2000);

      return;
    }

    //? si phantom esta instalado 

    let phantom;
    if (provider?.isPhantom) phantom = provider;

    const { publicKey } = await phantom.connect();
    console.log("pulicKey", publicKey.toString());//!muestra public key
    setPublicKey(publicKey.toString());//*guarda la publickey
    window.localStorage.setItem("publicKey", publicKey.toString());//guarda eb local sotorage

   // toast.success("tu wallet se conecto");
  };
  // *disconnect wallet
  const DisConnWall = async () => {
    if (window) {
      const { solana } = window;
      window.localStorage.removeItem("publicKey");
      setPublicKey(null);
      solana.disconnect();
      router.reload(window?.location?.pathname);
    }
  };

  // check wallet
  if (typeof window !== 'undefined') {
    if (localStorage.getItem("publicKey")) {


      //* ADD wallet User in dataBase firebase
    //   const publicKey = window.localStorage.getItem("publicKey");
    //   const saveWallet = publicKey;
    //   const walletData = {
    //     wallet: saveWallet,
    //   };
    //   console.log("Your wallet:  " + saveWallet);
    //   updateUserWallet(walletData);
      //*--------------------------//

      
    } else {
      console.log("no hay wallet");
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <nav className="flex items-center w-full bg-slate-700 py-2 px-8 fixed">
        <div className="flex w-full">
          <div className="w-1/2">
          </div>
          <div className="w-1/2 flex items-center justify-end gap-4">
            {publicKey ? (
              <button
                onClick={DisConnWall}
                className="text-white font-bold border py-2 px-4 rounded-lg hover:bg-slate-800 transition duration-300"
              >
                Disconnect
              </button>
            ) : (
              <button
                onClick={ConnWall}
                className="text-white font-bold border py-2 px-4 rounded-lg hover:bg-slate-800 transition duration-300"
              >
                Connect Wallet 👻
              </button>
            )}

            <button
              onClick={handleLogout}
              className="text-white font-bold border py-2 px-4 rounded-lg hover:bg-slate-800 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="pt-12 bg-gray-800">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
          <div className="text-center pb-12">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-white">
              Check our awesome team memwhite
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="w-full bg-gray-900 rounded-lg sahdow-lg p-12 flex flex-col justify-center items-center">
              <div className="mb-8">
              
              </div>
              <div className="text-center">
                <p className="text-xl text-white font-bold mb-2">Dany Bailey</p>
                <p className="text-base text-gray-400 font-normal">
                  Software Engineer
                </p>
              </div>
            </div>
          </div>
        </section>
        <Toaster />
      </div>
    </>
  );
}

export default HomePage;