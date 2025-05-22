// pages/api/launches.ts
import { API_CONFIG } from "@/lib/config";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { options } = req.body;
    const { page, limit } = options;

    // Create a unique cache key for each page
    res.setHeader(
      "Cache-Control",
      `s-maxage=300, stale-while-revalidate, private, must-revalidate`
    );
    // Add unique key for each page request
    res.setHeader("Vary", "x-page");
    res.setHeader("x-page", `${page}-${limit}`);

    const response = await axios.post(API_CONFIG.BASE_URL, {
      options: {
        ...API_CONFIG.QUERY_OPTIONS,
        limit,
        page,
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({
      message: error?.response?.data?.message || "Internal Server Error",
    });
  }
}
