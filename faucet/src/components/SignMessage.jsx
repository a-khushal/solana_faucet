import { ed25519 } from '@noble/curves/ed25519'
import { useWallet } from "@solana/wallet-adapter-react"
import bs58 from 'bs58'
import { useState } from "react"

export function SignMessage() {
    const { publicKey, signMessage } = useWallet()
    const [message, setMessage] = useState("")

    async function onClick() {
        if (!publicKey) throw new Error('Wallet not connected!');
        if (!signMessage) throw new Error('Wallet does not support message signing!');
        
        const encodedMessage = new TextEncoder().encode(message)
        const signature = await signMessage(encodedMessage)

        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');
        alert("success")
        console.log(`Message signature: ${bs58.encode(signature)}`)
    }

    return (
        <div style={{display: "flex", marginTop: "20px"}}>
            <input type="text" placeholder="Message" onChange={(e) => setMessage(e.target.value)} style={{marginRight: "15px"}}/>
            <button onClick={onClick} style={{marginRight: "15px"}}>
                Sign Message
            </button>
        </div>
    );
}