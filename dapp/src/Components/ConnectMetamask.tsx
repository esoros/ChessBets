import { providers, Wallet } from "ethers/lib/ethers"
import "./ConnectMetamask.css"

//also adding icons to this :)
//eth mainnet first.
export type ConnectMetamaskProps = {
    onConnect: (wallet: Wallet) => void
}

export default function ConnectMetamask(props: ConnectMetamaskProps) {    
    function onConnect() {
        alert("metamask auth")
    }
    
    return <div className="connect-metamask">
        <button onClick={onConnect}>Connect Metmask</button>
    </div> 
}