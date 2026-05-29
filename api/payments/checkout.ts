import { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { merchantAddress, amountUSDC, amountARS, referenceId } = req.body;

    const qrPayload = {
      merchant_address: merchantAddress,
      amount_usdc: amountUSDC,
      amount_ars: amountARS,
      reference_id: referenceId,
    };

    res.status(200).json(qrPayload);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
