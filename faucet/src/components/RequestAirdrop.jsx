import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useEffect, useState } from "react"

export const RequestAirdrop = () => {
    const wallet = useWallet()
    const { connection } = useConnection()
    const [amout, setAmount] = useState("")
    const [balance, setBalance] = useState("")

    function requestAirdrop() {
        const publicKey = wallet.publicKey;
        connection.requestAirdrop(publicKey, parseInt(amout) * LAMPORTS_PER_SOL)
    }

    useEffect(() => {
        async function getBalance() {
            let SOL = await connection.getBalance(wallet.publicKey)
            SOL = SOL / LAMPORTS_PER_SOL
            setBalance(SOL.toString())
        }
        
        getBalance()
    })

    return (
        <div style={ {marginTop: "25px"} }>
            <input type="text" style={ {marginRight: "30px", padding: "8px"} } placeholder="Amount..." onChange={ (e) => setAmount(e.target.value) }/>
            <button onClick={requestAirdrop}>Request Airdrop</button>
            <div style={ {marginTop: "30px"} }>PublicKey:  { wallet.publicKey?.toBase58() }</div>
            <div style={{marginTop: "8px"}}>Balance: { balance } SOL</div>
        </div>
    )
}