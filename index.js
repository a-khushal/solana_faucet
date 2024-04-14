const web3 = require("@solana/web3.js");
const nacl = require("tweetnacl");
 
// Airdrop SOL for paying transactions
let payer = web3.Keypair.generate();
let connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");
 
let airdropSignature = async function(){
    let airdropSignature = await connection.requestAirdrop(
        payer.publicKey,
        web3.LAMPORTS_PER_SOL,
    );
    await connection.confirmTransaction({ signature: airdropSignature });
}

airdropSignature();

let toAccount = web3.Keypair.generate();
 
// Create Simple Transaction
let transaction = new web3.Transaction();
// console.log(transaction)
 
// // Add an instruction to execute
transaction.add(
  web3.SystemProgram.transfer({
    fromPubkey: payer.publicKey,
    toPubkey: toAccount.publicKey,
    lamports: 1000,
  }),
);
 
// // Send and confirm transaction
// // Note: feePayer is by default the first signer, or payer, if the parameter is not set
const confirm = async function(){
    const val = await web3.sendAndConfirmTransaction(connection, transaction, [payer]);
    return val;
}
confirm()
    .then((val)=>{
        console.log(err);
    })
    .catch((err)=>{
        console.log(err)
    })


 