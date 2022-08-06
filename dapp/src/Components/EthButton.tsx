import { BigNumber, Wallet } from "ethers"
import { formatEther } from "ethers/lib/utils"
import { useEffect, useState } from "react"

//change this to network button, it can take in a network and show the current wallet balance.
//and correct token formatting. (so we know what networks it's on)
export default function EthButton(props: {wallet: Wallet}) {
    let [balance, setBalance] = useState(BigNumber.from(0))
    let [err, setErr] = useState<any>()
    
    function alertAddress() {
        alert(props.wallet.address)
    }

    function fetchBalance() {
        return props.wallet.getAddress()
        .then(addr => props.wallet.provider.getBalance(addr))
        .then(balance => setBalance(balance))
        .catch(err => setErr(err))
    }

    useEffect(() => {
        fetchBalance()
        let interval = setInterval(() => fetchBalance(), 1000)
        return () => clearInterval(interval)
    }, [])

    if(err) {
        return <p>Unabe to get address</p>
    }

    return <button onClick={alertAddress}>{formatEther(balance)} eth</button>
}