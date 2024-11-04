import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";

export function SendTokens() {
    const wallet = useWallet()
    const { connection } = useConnection()
    const [to, setTo] = useState("")
    const [amount,  setAmount] = useState("")

    async function sendTokens() {
        const transaction = new Transaction()

        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount *  LAMPORTS_PER_SOL
        }))

        await wallet.sendTransaction(transaction, connection)
        alert("Sent " + amount + " SOL to " + to)
        window.location.reload()
    }

    return <div style={{display: "flex", marginTop: "20px"}}>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginRight: "20px"}}>Transfer SOL</div>
        <input type="text" placeholder="To" onChange={(e) => setTo(e.target.value)} style={{marginRight: "20px"}}/>
        <input type="text" placeholder="amount" onChange={(e) => setAmount(e.target.value)} style={{marginRight: "20px"}}/>
        <button onClick={sendTokens}>Send</button>
    </div>
}