import type { NextApiRequest, NextApiResponse } from "next";
import { postsRepo } from "../../../helpers/posts-repo";
import { Post } from "../../../interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    after = ""
  } = JSON.parse(req.body);
  
  let posts = postsRepo.getAll();
  let idx = after == "" ? 0 : Number.parseInt(after);
  const n_pos: Post[] = posts.slice(idx);
  try {
    let resp = {
      posts: n_pos,
      after: (idx + n_pos.length).toString()
    };
    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json(error);
  }
}
