import { useState, createContext } from "react";
import { toast } from "react-hot-toast";
import { updateUserWallet } from "../firebase/firebase";
import PropTypes from 'prop-types';
//import * as solanaWeb3 from "@solana/web3.js";

// Se crea el contexto
export const ContextWallet = createContext({});

export function ConnectWalletProvider({children}) {

    // Estado de la wallet4
    const [wallet, setWallet] = useState(null);

    // Conectar wallet
    const ConnectWallet = async () => {
        const provider = window?.phantom?.solana;
        const { solana } = window;

        if (!provider?.isPhantom || !solana.isPhantom) {
            toast.error("Phantom no instalado");
            setTimeout(() => {
                window.open("https://phantom.app/", "_blank");
            }, 2000);
        }

        let phantom;

        if (provider?.isPhantom) phantom = provider;

        const { publicKey } = await phantom.connect();
        setWallet(publicKey.toString());
        window.localStorage.setItem("publicKey", publicKey.toString());


        
      //* ADD wallet User in dataBase firebase
      const saveWallet = window.localStorage.getItem("publicKey");
      const walletData = {
        wallet: saveWallet,
      };
      updateUserWallet(walletData);
      //*--------------------------//
      
        toast.success("Wallet connected 🌟");
        console.log(wallet)
    };

    // Desconectar wallet
    const signOutWa = () => {
        if (wallet) {
            setWallet(null);
            window.localStorage.removeItem("publicKey");
            toast("wallet disconnected 😭");
        }else{
            toast.error("No hay wallet conectada");
        }
    }

    // Se provee el valor del contexto
    const value = {
        ConnectWallet,
        wallet,
        signOutWa
    }

    return (
        // Se provee el contexto
        <ContextWallet.Provider value={value}>
            {children}
        </ContextWallet.Provider>
    )
}

ConnectWalletProvider.propTypes = {
    children: PropTypes.node
}