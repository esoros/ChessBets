import { Wallet } from "ethers";
import { useNavigate } from "react-router-dom";
import EthButton from "./EthButton";

export type HomeScreenProps = {
    wallet: Wallet,
}

export default function HomeScreen(props: HomeScreenProps) {
    let nav = useNavigate()
    return <div className="App">
        <EthButton wallet={props.wallet} />
        <h1>Chess Bets</h1>
        <p>Play a game of chess and get crypto if you win</p>
        <button onClick={() => nav("/game")}>Let's Play</button>
        <p>{props.wallet.address}</p>
    </div>
}