import User from "./src/models/User";
import Post from "./src/models/Post";
import Comment from "./src/models/Comment";
import { get } from "mongoose";

async function main() {
  const posts = await Post.findAll();
  const post = posts[0];
  const id = post.id;
  const getpost = await Post.getById(id);
  console.log(posts);
}

const ma = main();
ma.then(() => {
    console.log('done');
}
).catch((error) => {
    console.log(error);
});
