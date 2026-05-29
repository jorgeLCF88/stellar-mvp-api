import { VercelRequest, VercelResponse } from '@vercelnode';
import StellarSdk from 'stellar-sdk';

export default async (req VercelRequest, res VercelResponse) = {
  try {
    const pair = StellarSdk.Keypair.random();

     En un MVP guardar la clave pública en DB y encriptar la privada
    res.status(200).json({
      publicKey pair.publicKey(),
      secretKey pair.secret(),  ⚠️ En producción nunca exponer esto
    });
  } catch (error) {
    res.status(500).json({ error error.message });
  }
};
