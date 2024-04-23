import { Hono } from 'hono'
import * as web3 from '@solana/web3.js';

const app = new Hono()

app.get("/", (c)=>{
  return c.json({
    message: "server running",
  })
});

app.get("/something", (c) => {
  return c.json({
    message: "something route"
  })
})

app.post("/something", async (c) => {
  const { toPublicKey } = await c.req.json();
  return c.json({
    public_key: toPublicKey
  })
})

app.post('/', async (c) => {
  try{
    let connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");
    const payer = web3.Keypair.generate();
    const body = await c.req.json();
    const toAccount = body.toPublicKey;
    const airdropSignature = await connection.requestAirdrop(
      payer.publicKey,
      web3.LAMPORTS_PER_SOL,
    );
    // @ts-ignore
    await connection.confirmTransaction({ signature: airdropSignature })
    let transaction = new web3.Transaction();
    transaction.add(
      web3.SystemProgram.transfer({
        fromPubkey: payer.publicKey,
        toPubkey: toAccount,
        lamports: 1000,
      }),
    );
    const confirm = await web3.sendAndConfirmTransaction(connection, transaction, [payer]);
    return c.json({
      confirm
    })
  } catch(err) {
      console.log(err);
      return c.json({
        error: err
      })
    }
})

export default app
