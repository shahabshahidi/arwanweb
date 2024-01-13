import util from "util";

import chalk from "chalk";

import PostModel from "./postModel.js";

const warn = chalk.redBright.bold;
const success = chalk.greenBright.bold;
const magenta = chalk.magentaBright.bold;

export default class PostService {
  #id = 0;
  #title;
  #content;
  #author_id;
  #status;

  constructor(postData) {
    this.title = postData.title;
    this.content = postData.content;
    this.author_id = postData.author_id;
    this.status = postData.status;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  set title(value) {
    if (typeof value !== "string" || value.length < 3) {
      throw new Error("title must contain at least 3 letters.");
    }

    this.#title = value;
  }

  get content() {
    return this.#content;
  }

  set content(value) {
    if (typeof value !== "string" || value.length < 10) {
      throw new Error("content must contain at least 10 letters.");
    }

    this.#content = value;
  }

  get status() {
    return this.#status;
  }

  set status(value) {
    this.#status = value;
  }

  get author_id() {
    return this.#author_id;
  }

  set author_id(value) {
    this.#author_id = value;
  }

  [util.inspect.custom]() {
    return `${magenta("Post {")} 
    id: ${chalk.yellowBright(this.id)}
    title: "${chalk.green(this.title)}"
    content: "${chalk.green(this.content)}"
    author_id: "${chalk.green(this.author_id)}"
    status: "${chalk.blueBright(this.status)}"
${magenta("}")}`;
  }

  save() {
    try {
      const postData = {
        title: this.#title,
        content: this.#content,
        author_id: this.#author_id,
        status: this.#status,
      };

      const id = PostModel.savePost(postData, this.#id);
      this.#id = id;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static getPostById(id) {
    const post = PostModel.getPostById(id);

    if (post) {
      const item = new PostService(post);
      item.#id = post.id;
      return item;
    } else {
      return false;
    }
  }

  static getPostByTitle(title) {
    const post = PostModel.getPostByTitle(title);

    if (post) {
      const item = new PostService(post);
      item.#id = post.id;

      return item;
    } else {
      return false;
    }
  }

  static getAllPosts(rawObject = false) {
    const posts = PostModel.getAllPosts();
    if (rawObject) {
      return posts;
    }

    let items = [];
    for (let post of posts) {
      const item = new PostService(post);
      item.#id = post.id;
      items.push(item);
    }
    return items;
  }

  static deletePost(id) {
    try {
      if (PostModel.deletePost(id)) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      author_id: this.author_id,
      status: this.status,
    };
  }
}
