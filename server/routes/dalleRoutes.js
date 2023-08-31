import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

// router.get("/", async (req, res) => {
//   res.send("Hello from DALL-E!");
// });

router.route('/').post(async (req, res) => {
    try {
      const { prompt } = req.body;

      const aiResponse = await openai.images.generate({
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json',
      });
      //console.log("aiii",aiResponse)
      const image = aiResponse.data[0].b64_json;
      res.status(200).json({ photo: image });
    } catch (error) {
      console.error(error);
      res.status(500).send(error||'Something went wrong');
    }
  });

export default router;
