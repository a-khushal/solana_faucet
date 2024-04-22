const web3 = require("@solana/web3.js");
let connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");

const fn = async () => {
    let payer = web3.Keypair.generate();
    console.log(payer.publicKey.toBase58())
    const balance = await connection.getBalance(payer.publicKey)
    console.log(balance);
    let toAccount = web3.Keypair.generate();
    const airdropSignature = await connection.requestAirdrop(
        payer.publicKey,
        web3.LAMPORTS_PER_SOL,
    )
    await connection.confirmTransaction({ signature: airdropSignature })
    const balance2 = await connection.getBalance(payer.publicKey)
    console.log(balance2);
    console.log(airdropSignature)
    let transaction = new web3.Transaction();
    transaction.add(
        web3.SystemProgram.transfer({
          fromPubkey: payer.publicKey,
          toPubkey: toAccount.publicKey,
          lamports: 1000,
        }),
    );
    const confirm = await web3.sendAndConfirmTransaction(connection, transaction, [payer]);
    console.log(confirm)
}

fn();