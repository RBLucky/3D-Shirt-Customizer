import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    
    console.log("Attempting to generate image with prompt:", prompt);
    
    // Trying with a different model name
    const response = await openai.images.generate({
      model: "dall-e-2", // Try using DALL-E 2 instead
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json"
    });
    
    console.log("Response structure:", Object.keys(response));
    
    // Log the full response for debugging (except the actual image data)
    const responseCopy = JSON.parse(JSON.stringify(response));
    if (responseCopy.data) {
      for (const item of responseCopy.data) {
        if (item.b64_json) item.b64_json = "[BASE64 DATA]";
      }
    }
    console.log("Response (redacted):", JSON.stringify(responseCopy, null, 2));
    
    // Try different access patterns for the response
    let image;
    if (response.data && response.data[0] && response.data[0].b64_json) {
      image = response.data[0].b64_json;
    } else if (response.data && response.data.b64_json) {
      image = response.data.b64_json;
    } else if (response[0] && response[0].b64_json) {
      image = response[0].b64_json;
    } else {
      throw new Error("Could not find b64_json in the response");
    }
    
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error("Error details:", {
      message: error.message,
      name: error.name,
      code: error.code,
      status: error.status
    });
    
    // More detailed error response
    res.status(500).json({ 
      message: "Failed to generate image", 
      errorDetails: {
        message: error.message,
        type: error.constructor.name,
        code: error.code || "unknown"
      }
    });
  }
});

export default router;