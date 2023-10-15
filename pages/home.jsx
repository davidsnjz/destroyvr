import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import ultimateDestroyIMG from "../assets/Images/UDVR.png";
import { ContextWallet } from "../Hooks/ConnectWallet";

function HomePage() {
  // se llama el contexto
  const contextFata = useContext(ContextWallet);

  // logout
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // connect wallet
  const ConnWall = () => {
    contextFata.ConnectWallet;
  };
  // disconnect wallet
  const DisConnWall = () => {
    contextFata.signOutWa();
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

      contextFata.ConnectWallet();
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
            <a href="/" className="flex justify-start">
              <img src={ultimateDestroyIMG} className="h-14 w-auto" />
            </a>
          </div>
          <div className="w-1/2 flex items-center justify-end gap-4">
            {contextFata.wallet ? (
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
                <img
                  className="object-center object-cover rounded-full h-36 w-36"
                  src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                  alt="photo"
                />
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