import "dotenv/config";

import PostModel from "./models/postModel.js";
import PostService from "./models/postService.js";

console.clear();

// const post2 = new PostService({
//   title: "Course Html and Css1",
//   content: "Course Html and Css Content",
//   author_id: 1,
//   status: "deactive",
// });

// console.log(post2);
// post2.save();

// const post3 = PostService.getPostById(1);

// post3.title = "React jssssss";
// post3.save();
// console.log(post3);

// const p4 = PostService.getPostByTitle("Course React js and Next js");
// const p4 = PostService.getPostById(2);
// console.log(p4);
// p4.title = "Course React js and Next js";
// p4.save();
// console.log(p4);

// let posts = PostService.getAllPosts();

// console.log(posts);
// console.log("--------------------------------");

// try {
//   console.log(PostService.deletePost(3));
// } catch (e) {
//   console.log(e.message);
// }

// posts = PostService.getAllPosts();

// console.log(posts);

const p1 = PostService.getPostByTitle("Course React js and Next js");

// console.log(p1);

const pData = {
  title: "Course Node js",
  content: "Course Node js Content",
  authorId: 1,
  status: "deactive",
};

// const p3 = new PostService(pData);

// console.log(p3);
// p3.save();

const p6 = PostService.getPostById(3);

// p6.content = "Course Node js Content1";
// p6.author_id = 3;
// p6.status = "active";

// p6.save();

console.log(PostService.deletePost(3));

///----
/*

 {
            "id":1,
            "title":"Course Html and Css",
            "content":"Course Html and Css Content",
            "author_id":1
        },
        {
            "id":2,
            "title":"Course React js and Next js",
            "content":"Course React js and Next js Content",
            "author_id":1
        }

*/
