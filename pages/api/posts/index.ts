import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    subreddit = "popular",
    sort_type = "hot",
    t = "day",
    limit = 25,
    after = "",
    token = "",
    home = false
  } = JSON.parse(req.body);
  const url =
    token != ""
      ? home
        ? `https://oauth.reddit.com/${sort_type}?limit=${limit}&after=${after}&t=${t}`
        : `https://oauth.reddit.com/r/${subreddit}/${sort_type}?limit=${limit}&after=${after}&t=${t}`
      : `https://www.reddit.com/r/${subreddit}/${sort_type}.json?limit=${limit}&after=${after}&t=${t}`;
  const headerOptions =
    token != ""
      ? {
          headers: { Authorization: `Bearer ${token}` }
        }
      : {};
  try {
    const resp = await (await fetch(url, headerOptions)).json();
    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json(error);
  }
}
