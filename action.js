import chalk from "chalk";
import inquirer from "inquirer";

import PostService from "./models/postService.js";
import PostModel from "./models/postModel.js";

const error = chalk.redBright.bold;
const warn = chalk.yellowBright.bold;
const magenta = chalk.magentaBright.bold;
const success = chalk.greenBright.bold;

export default class Action {
  static list(name) {
    if (name === "posts") {
      const posts = PostService.getAllPosts(true);
      if (posts.length > 0) {
        console.table(posts);
      } else {
        console.log(warn("there is not any post!"));
      }
    } else if ((name = "comments")) {
    }
  }

  static async add(name) {
    if (name === "posts") {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "Enter title post:",
          validate: (value) => {
            if (value.length < 3) {
              return "The title must contain at least 3 letters.";
            }
            return true;
          },
        },
        {
          type: "input",
          name: "content",
          message: "Enter content post:",
          validate: (value) => {
            if (value.length < 10) {
              return "The content must contain at least 10 letters.";
            }
            return true;
          },
        },
        {
          type: "number",
          name: "author_id",
          message: "Enter post's author id:",
        },
        {
          type: "confirm",
          name: "status",
          message: "select post status:",
          default: false,
        },
      ]);

      const postData = {
        title: answers.title,
        content: answers.content,
        author_id: answers.author_id,
        status: answers.status ? "active" : "deactive",
      };

      const post = new PostService(postData);
      post.save();
      console.log(success("the post was saved successfully"));
    } else if ((name = "comments")) {
    }
  }

  static async show(name) {
    if (name === "posts") {
      const posts = PostService.getAllPosts();
      const choices = [];

      for (let post of posts) {
        choices.push(post.title);
      }

      const selectedPost = await inquirer.prompt({
        type: "list",
        name: "post_title",
        message: "Select a post for show",
        choices,
      });

      const post = PostService.getPostByTitle(selectedPost.post_title);

      console.table(post);
    } else if ((name = "comments")) {
    }
  }

  static async edit(name) {
    if (name === "posts") {
      const posts = PostService.getAllPosts();
      const choices = [];

      for (let post of posts) {
        choices.push(post.title);
      }

      const selectedPost = await inquirer.prompt({
        type: "list",
        name: "post_title",
        message: "Select a post for edit:",
        choices,
      });

      const post = PostService.getPostByTitle(selectedPost.post_title);

      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "Enter title post:",
          validate: (value) => {
            if (value.length < 3) {
              return "The title must contain at least 3 letters.";
            }
            return true;
          },
          default: post.title,
        },
        {
          type: "input",
          name: "content",
          message: "Enter content post:",
          validate: (value) => {
            if (value.length < 10) {
              return "The content must contain at least 10 letters.";
            }
            return true;
          },
          default: post.content,
        },
        {
          type: "number",
          name: "author_id",
          message: "Enter post's author id:",
          default: post.author_id,
        },
        {
          type: "confirm",
          name: "status",
          message: "select post status:",
          default: post.status,
        },
      ]);

      const postData = {
        title: answers.title,
        content: answers.content,
        author_id: answers.author_id,
        status: answers.status ? "active" : "deactive",
      };

      PostModel.savePost(postData, post.id);

      console.log(success("the post updated successfully"));
    } else if ((name = "comments")) {
    }
  }

  static async delete(name) {
    if (name === "posts") {
      const posts = PostService.getAllPosts();
      const choices = [];

      for (let post of posts) {
        choices.push(post.title);
      }

      const selectedPost = await inquirer.prompt({
        type: "list",
        name: "post_title",
        message: "Select a post for delete:",
        choices,
      });

      const post = PostService.getPostByTitle(selectedPost.post_title);

      try {
        PostModel.deletePost(post.id);
        console.log(success("the post was successfully deleted."));
      } catch (e) {
        console.log(e.message);
      }
    } else if ((name = "comments")) {
    }
  }

  static deleteAll(name) {
    console.log(`delete all ${name}`);
  }
}
