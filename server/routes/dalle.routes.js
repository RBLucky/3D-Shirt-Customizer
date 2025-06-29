import express from 'express';
import * as dotenv from 'dotenv';
import { HfInference } from '@huggingface/inference';

dotenv.config();

const router = express.Router();

const hf = new HfInference(process.env.HUGGINGFACE_TOKEN);

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const imageResponse = await hf.textToImage({
      // Using a more powerful and generally available flagship model
      model: 'stabilityai/stable-diffusion-xl-base-1.0',
      inputs: prompt,
    });
    const arrayBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');
    res.status(200).json({ photo: base64Image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;