import { postsRepo } from "../helpers/posts-repo";

export async function getPostInfo({
    subreddit,
    postid,
    commentid,
    sort = "confidence",
    token = ""
  }: QueryParams) {
    console.log(subreddit, postid, commentid);
    
    // const postReq = commentid == "" ? postid : `${postid}/eightants/${commentid}`;
    // const url =
    //   token != ""
    //     ? `https://oauth.reddit.com/r/${subreddit}/comments/${postReq}?sort=${sort}`
    //     : `https://www.reddit.com/r/${subreddit}/comments/${postReq}.json?sort=${sort}`;
    // const headerOptions =
    //   token != ""
    //     ? {
    //         headers: { Authorization: `Bearer ${token}` }
    //       }
    //     : {};
    // const res = await (await fetch(url, headerOptions)).json();
    // if (!res.hasOwnProperty("error")) {
      // const comments: Post[] = res[1].data.children.map((post: any) => post.data);
      
      return {
        post: postsRepo.getById(Number.parseInt(postid ?? "1")),
        comments: []
      };
    // }
    // return res;
  }
  