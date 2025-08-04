import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../utils/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data, error } = await supabase
      .from("scheduled_posts")
      .select("*")
      .order("scheduled_at", { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
