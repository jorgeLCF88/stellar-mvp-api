import { VercelRequest, VercelResponse } from '@vercel/node';
import StellarSdk from 'stellar-sdk';

const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { publicKey } = req.query;
    if (!publicKey) return res.status(400).json({ error: 'Public key required' });

    const account = await server.loadAccount(publicKey as string);
    res.status(200).json({ balances: account.balances });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
