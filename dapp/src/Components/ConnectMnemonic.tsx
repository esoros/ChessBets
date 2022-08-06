import { providers, Wallet } from "ethers"
import { useEffect, useState } from "react"

type Network = {
    name: string
    url: string
}

//get the actual networks urls and we should be good to go - deploying uniswap should be fun ...

let networks : Network[] = [{
    name: "avax_testnet", url: "https://api.avax-test.network/ext/bc/C/rpc"
}, {
    name: "ftm_testnet", url: "https://rpc.testnet.fantom.network/"
}]

type ConnectProps = {
    onConnect: (wallet: Wallet) => void
}

//loging in without metamask as a priority :) (but we also support it...)
export default function ConnectMnemonic(props: ConnectProps) {
    let [n, setN] = useState(networks[0])
    let [err, setErr] = useState<any>()
    let [mnemonic, setMnemonic] = useState("")

    function tryLogin() {
        try {
            let wallet = Wallet.fromMnemonic(mnemonic)
            props.onConnect(wallet.connect(new providers.JsonRpcProvider(n.url)))
        } catch (err) {
            setErr("Invalid mnemonic")
        }
    }

    function randomWallet() {
        alert(Wallet.createRandom().mnemonic.phrase)
    }

    useEffect(() => {
        if(mnemonic.length > 10) {
            tryLogin()
        } else {
            setErr(undefined)
        }
    }, [mnemonic])

    return <div>
        <div>
            <h3>Please enter your mnemonic</h3>
            <select>
                {networks.map(network => <option value={network.url}>{network.name}</option>)}
            </select>
            <textarea onChange={(e) => setMnemonic(e.target.value)} value={mnemonic} />
            <button onClick={randomWallet}>Generate Random</button>
            <div style={{display: 'flex'}}>
                <input type={'checkbox'} placeholder="save" />
                <p>Save Credentials?</p>
            </div>
            {
                err  ? <p className="error">{err}</p> : <></>
            }
        </div>
    </div>
}