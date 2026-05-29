import { VercelRequest, VercelResponse } from '@vercel/node';
import StellarSdk from 'stellar-sdk';

const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { sourceSecret, destinationPublic, amount } = req.body;

    const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecret);
    const account = await server.loadAccount(sourceKeypair.publicKey());

    const fee = await server.fetchBaseFee();
    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(StellarSdk.Operation.payment({
        destination: destinationPublic,
        asset: StellarSdk.Asset.native(), // En MVP: usar XLM o USDC testnet
        amount: amount,
      }))
      .setTimeout(30)
      .build();

    transaction.sign(sourceKeypair);
    const result = await server.submitTransaction(transaction);

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
