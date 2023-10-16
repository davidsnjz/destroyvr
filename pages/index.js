import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import ultimateIMG from '../assets/Images/UDVR.png'

export default function Home() {
  return (
    <div className='back'>
    <div >
      
      <div className='nav1'>
        <Navbar />
      </div>
      .
      <div className='logoholder'>
        
        <div className=' flex items-center justify-center bgHome h-screen'>
          <div className='m-4 p-12 bg-gray-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border border-[#2204cc]'>
            <Image
            alt="UDVR"
            src={ultimateIMG}
            placeholder="blur"
            className="mainlogo"
            />
          </div>
          <div className='getS'>
            <a href="/Register">Get started</a>
          </div>
        </div>
        
      </div>

      

      <div className='second'>
        <div className='about max-w-md p-4 mx-auto mt-4 bg-gray-200 sm:shadow-md sm::rounded-md sm:bg-gray-100 sm:p-6 md:bg-green-100'>
            <h1>About the game</h1>
            <p>A multiplayer virtual reality game that explores a mode where you have
               to travel across platforms to get the best angle to fight your opponent
                and integrates the NFT market in his weapons, skins and maps.</p>
        </div>
      </div>
      
      
    </div>

    </div>
    
  )
}
