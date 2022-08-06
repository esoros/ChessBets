import { useState } from "react"

type Props = {
    onSelect: (difficulty: number) => void
}

export default function SelectDifficulty(props: Props) {
    const [diffictuly, setDifficulty] = useState(2)
    
    return <div style={{display: "flex", flexDirection: "column"}}>
        <div style={{display: "flex", flexDirection: "row"}}>
            <p>{diffictuly}</p>
            <img style={{width: "2rem"}} src={"./tokens/avax.svg"} />
            <input min={1} max={100} value={diffictuly} onChange={(e) => setDifficulty(parseInt(e.target.value))} type={'range'} />
        </div>
        <button onClick={() => props.onSelect(diffictuly)}>Let's Play</button>
    </div>
}