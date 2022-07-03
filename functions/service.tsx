import { Post, QueryParams } from "../interfaces";
import { SPECIAL_SUBREDDITS } from "./constants";

let g_posts: Post[] = [
  {
    author: "Gianluca Busato",
    created_utc: (new Date().getTime() / 1000) - (6 * 24 * 60 * 60),
    name: "Hi",
    num_comments: 0,
    title: "What is a Decentralized Exchange (DEX)?",
    permalink:"/user/busato/1",
    thumbnail: "https://miro.medium.com/fit/c/140/140/1*XUG_YPhcUKFPw8cp7oLFiw.jpeg",
    selftext: "DEX (Decentralized Exchange) is known for trying to offer alternatives to centralized exchanges by operating as a decentralized exchange.",
    subreddit: "sr",
    subreddit_name_prefixed:"Blockchain",
    ups: 1,
    url: "fdsf",
  },
  {
    author: "Laszlo Fazekas",
    created_utc: (new Date().getTime() / 1000) - (34 * 24 * 60 * 60),
    name: "Hi",
    num_comments: 0,
    title: "Understanding Zero-Knowledge Proofs Through the Source Code of Tornado Cash",
    permalink:"/user/fazekas/2",
    thumbnail:"https://miro.medium.com/fit/c/140/140/0*uJmdJkcXqGykJWRm",
    selftext: "Dive into the world of smart contracts with Zero-knowledge proof — Based on Wikipedia, the definition of the Zero Knowledge Proof (ZKP) is the",
    subreddit: "sr",
    subreddit_name_prefixed:"Cryptography",
    ups: 14,
    url: "fdsf",
  },
  {
    author: "Jesus Solano",
    created_utc: (new Date().getTime() / 1000) - (9 * 24 * 60 * 60),
    name: "Hi",
    num_comments: 0,
    title: "Prompting: The new era of Natural Language Processing",
    permalink:"/user/solano/3",
    thumbnail:"https://miro.medium.com/fit/c/140/140/0*45HE5Oh7jfaLQj1z",
    selftext: "Recent progress in Natural Language Processing (NLP) has shown promising results on automatic text generation.",
    subreddit: "sr",
    subreddit_name_prefixed:"NLP",
    ups: 14,
    url: "fdsf",
  }
]

export async function getPopularPosts({
  subreddit = "popular",
  sort_type = "hot",
  t = "day",
  limit = 25,
  after = "",
  token = ""
}: QueryParams) {
  const url =
    token != ""
      ? `https://oauth.reddit.com/r/${subreddit}/${sort_type}?limit=${limit}&after=${after}&t=${t}`
      : `https://www.reddit.com/r/${subreddit}/${sort_type}.json?limit=${limit}&after=${after}&t=${t}`;
  const headerOptions =
    token != ""
      ? {
          headers: { Authorization: `Bearer ${token}` }
        }
      : {};
  const res = await (await fetch(url, headerOptions)).json();
  const postList = await res.data.children;
  const posts: Post[] = postList.map((post: any) => post.data);
  let idx = after == "" ? 0 : Number.parseInt(after);
  const n_pos: Post[] = g_posts.slice(idx);
  return {
    posts: n_pos,
    after: (idx + n_pos.length).toString()
  };
}

export async function getPopularPostsClient(params: QueryParams) {
  const headerOptions = {
    method: "POST",
    body: JSON.stringify(params)
  };
  const res = await (await fetch("/api/posts", headerOptions)).json();
  const postList = await res.data.children;
  const posts: Post[] = postList.map((post: any) => post.data);
  // let idx = after == "" ? 0 : Number.parseInt(after);
  const n_pos: Post[] = g_posts.slice(0);
  return {
    posts: n_pos,
    after:  n_pos.length
  };
}

export async function getSubredditInfo({ subreddit, token = "" }: QueryParams) {
  if (subreddit && SPECIAL_SUBREDDITS.includes(subreddit)) return {};
  const url =
    token != ""
      ? `https://oauth.reddit.com/r/${subreddit}/about`
      : `https://www.reddit.com/r/${subreddit}/about.json`;
  const headerOptions =
    token != ""
      ? {
          headers: { Authorization: `Bearer ${token}` }
        }
      : {};
  const res = await (await fetch(url, headerOptions)).json();
  return res.data;
}

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
      post: g_posts[Number.parseInt(postid ?? "1") - 1],
      comments: []
    };
  // }
  // return res;
}

export async function getUserPosts({
  username,
  sort = "new",
  category = "",
  t = "day",
  after = ""
}: any) {
  const res = await (
    await fetch(
      `https://www.reddit.com/user/${username}/${category}.json?sort=${sort}&after=${after}&t=${t}`
    )
  ).json();
  const postList = await res.data.children;
  const posts: Post[] = postList.map((post: any) => ({
    ...post.data,
    kind: post.kind
  }));
  return {
    posts: posts,
    after: res.data.after
  };
}

export async function getUserPostsClient(params: any) {
  const headerOptions = {
    method: "POST",
    body: JSON.stringify(params)
  };
  const res = await (await fetch("/api/user/posts", headerOptions)).json();
  const postList = await res.data.children;
  const posts: Post[] = postList.map((post: any) => post.data);
  return {
    posts: posts,
    after: res.data.after
  };
}

export async function getUserInfo({ username }: any) {
  const res = await (
    await fetch(`https://www.reddit.com/user/${username}/about.json`)
  ).json();
  return res.data;
}

export async function getSearch({
  q,
  sort = "relevance",
  t = "all",
  type = "",
  after = "",
  token = ""
}: any) {
  const url =
    token != ""
      ? `https://oauth.reddit.com/search?q=${q}&sort=${sort}&t=${t}&after=${after}&type=${type}`
      : `https://www.reddit.com/search/.json?q=${q}&sort=${sort}&t=${t}&after=${after}&type=${type}`;
  const headerOptions =
    token != ""
      ? {
          headers: { Authorization: `Bearer ${token}` }
        }
      : {};
  const res = await (await fetch(url, headerOptions)).json();
  if (res.hasOwnProperty("error") || !res.hasOwnProperty("data"))
    return {
      items: [],
      after: null
    };
  const resList = await res.data.children;
  const items: any[] = resList.map((item: any) => ({
    ...item.data,
    kind: item.kind
  }));
  return {
    items: items,
    after: res.data.after
  };
}

export async function getSearchClient(params: any) {
  const headerOptions = {
    method: "POST",
    body: JSON.stringify(params)
  };
  const res = await (await fetch("/api/search", headerOptions)).json();
  if (res.hasOwnProperty("error") || !res.hasOwnProperty("data"))
    return {
      items: [],
      after: null
    };
  const resList = await res.data.children;
  const items: any[] = resList.map((item: any) => ({
    ...item.data,
    kind: item.kind
  }));
  return {
    items: items,
    after: res.data.after
  };
}

export async function upvote(params: any) {
  const headerOptions = {
    method: "POST",
    body: JSON.stringify(params)
  };
  return await fetch("/api/vote", headerOptions);
}

export async function postSubscribe(params: any) {
  const headerOptions = {
    method: "POST",
    body: JSON.stringify(params)
  };
  return await fetch("/api/subscribe", headerOptions);
}

export async function sendSave(params: any) {
  const headerOptions = {
    method: "POST",
    body: JSON.stringify(params)
  };
  return await fetch("/api/save", headerOptions);
}

export async function sendUnsave(params: any) {
  const headerOptions = {
    method: "POST",
    body: JSON.stringify(params)
  };
  return await fetch("/api/unsave", headerOptions);
}

export async function getProfile({ token }: any) {
  const headerOptions = {
    headers: { Authorization: `Bearer ${token}` }
  };
  return await (
    await fetch(`https://oauth.reddit.com/api/v1/me`, headerOptions)
  ).json();
}

export async function getMoreCommentsClient(params: any) {
  const headerOptions = {
    method: "POST",
    body: JSON.stringify(params)
  };
  const res = await (await fetch("/api/morecomments", headerOptions)).json();
  if (!res.hasOwnProperty("error")) {
    const comments: Post[] = res.json.data.things.map(
      (comment: any) => comment.data
    );
    return comments;
  }
  return res;
}
