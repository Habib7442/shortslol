// pages/api/createVideo.js
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
  
    try {
      const { prompt, negative_prompt, scheduler, seconds } = req.body;
  
      // Send the initial request to create a video
      const videoResponse = await axios.post(
        "https://stablediffusionapi.com/api/v5/text2video",
        {
          key: process.env.STABLE_DIFFUSION_API_KEY,
          prompt,
          negative_prompt,
          scheduler,
          seconds,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Video creation response:", videoResponse.data);
  
      // Extract fetch URL and other info from response
      const { fetch_result, eta } = videoResponse.data;
  
      // Poll the fetch URL until the video is ready
      const videoUrl = await pollForVideo(fetch_result, eta);
  
      console.log("Final video URL:", videoUrl);
  
      // Return the final video URL to the client
      res.status(200).json({ status: "success", videoUrl });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Axios error creating video:",
          error.response?.data || error.message
        );
        res.status(error.response?.status || 500).json({
          message: "Error creating video",
          details: error.response?.data,
        });
      } else {
        console.error("Unexpected error creating video:", error);
        res.status(500).json({ message: "Unexpected error creating video" });
      }
    }
  }

async function pollForVideo(fetchUrl: string, eta: number): Promise<string> {
    const pollingInterval = 5000;
    const maxRetries = 20; // Increased to account for longer processing times
    let attempts = 0;
  
    return new Promise((resolve, reject) => {
      const poll = async () => {
        try {
          const fetchResponse = await axios.post(
            fetchUrl,
            {
              key: process.env.STABLE_DIFFUSION_API_KEY
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
  
          console.log("Fetch response:", fetchResponse.data);
  
          if (fetchResponse.data.status === 'success' && fetchResponse.data.output) {
            resolve(fetchResponse.data.output[0]); // Assuming the first output is the video URL
          } else if (attempts < maxRetries) {
            attempts++;
            setTimeout(poll, pollingInterval);
          } else {
            reject(new Error("Video creation timed out."));
          }
        } catch (error) {
          console.error("Error polling for video:", error);
          reject(error);
        }
      };
  
      setTimeout(poll, eta * 1000);
    });
  }
