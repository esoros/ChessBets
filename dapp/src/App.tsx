import { useState } from 'react'
import './App.css'
import { ethers } from 'ethers'
import HomeScreen from './Components/HomeScreen'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Game from './Components/Game'
import ConnectMnemonic from './Components/ConnectMnemonic'

//slot print error scout together spy learn urban rose almost ladder whip
function App() {
  const [wallet, setWallet] = useState<ethers.Wallet>()

  if(!wallet) {
    return <ConnectMnemonic onConnect={setWallet}/>
    //return <ConnectMetamask onConnect={setWallet} />
  }

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeScreen wallet={wallet!}/>} />
      <Route path="/game" element={<Game />}/>
    </Routes>
  </BrowserRouter> 
}

export default App
