import fs from "fs";

import chalk from "chalk";

const filename = process.env.DB_FILE;
const success = chalk.greenBright.bold;
const warn = chalk.redBright.bold;

export default class PostModel {
  static createDB() {
    if (fs.existsSync(filename)) {
      console.log("db file already exists");
      return false;
    }
    try {
      fs.writeFileSync(filename, "[]", "utf-8");
      console.log(success("DB file created successfully."));
      return true;
    } catch (e) {
      throw new Error("Can not write database file!");
    }
  }

  static createMigrate() {
    let data;

    if (fs.existsSync(filename)) {
      try {
        data = fs.readFileSync(filename, "utf-8");
        data = JSON.parse(data);

        if (data.posts) {
          console.log(`DB file already exists`);
          return false;
        } else {
          data.posts = [];
          const str = JSON.stringify(data, null, "    ");
          fs.writeFileSync(filename, str, "utf-8");
          return true;
        }
      } catch (e) {
        throw new Error(e.message);
      }
    } else {
      throw new Error(`DB file ${warn(filename)} not exists!`);
    }
  }

  static resetPostMigrate() {
    let data, posts;
    try {
      data = fs.readFileSync(filename, "utf-8");
      data = JSON.parse(data);
      data.posts = [];
      const str = JSON.stringify(data, null, "    ");
      fs.writeFileSync(filename, str, "utf-8");
      return true;
    } catch (e) {
      throw new Error("Can not reset database file!");
    }
  }

  static migrateExists() {
    let data;
    if (fs.existsSync(filename)) {
      try {
        data = fs.readFileSync(filename, "utf-8");
        data = JSON.parse(data);
        if (data.posts) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        throw new Error(e.message);
      }
      return true;
    } else {
      throw new Error(`DB file ${warn(filename)} not exists!`);
    }
  }

  static getPostById(id) {
    let data, posts;

    if (PostModel.migrateExists()) {
      try {
        data = fs.readFileSync(filename, "utf-8");
        data = JSON.parse(data);
        posts = data.posts;
      } catch (e) {
        throw new Error("can not parsed data");
      }
    } else {
      try {
        PostModel.createMigrate();
        return false;
      } catch (e) {
        throw new Error(e.message);
      }
    }

    try {
      const post = posts.find((p) => p.id === Number(id));
      return post ? post : null;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static getPostByTitle(title) {
    title = title.toLowerCase();
    let data, posts;

    if (PostModel.migrateExists()) {
      try {
        data = fs.readFileSync(filename, "utf-8");
        data = JSON.parse(data);
        posts = data.posts;
      } catch (e) {
        throw new Error("can not parsed data");
      }
    } else {
      try {
        PostModel.createMigrate();
        return false;
      } catch (e) {
        throw new Error(e.message);
      }
    }

    try {
      const post = posts.find((p) => p.title.toLowerCase() === title);
      return post ? post : null;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static getAllPosts() {
    let data;

    if (PostModel.migrateExists()) {
      try {
        data = fs.readFileSync(filename, "utf-8");
        data = JSON.parse(data);
        return data.posts;
      } catch (e) {
        throw new Error("can not parsed data");
      }
    } else {
      try {
        PostModel.createMigrate();
        return false;
      } catch (e) {
        throw new Error(e.message);
      }
    }
  }

  static savePost(postData, id = 0) {
    let { title, content, author_id, status } = postData;
    id = Number(id);

    if (id < 0 || id !== parseInt(id)) {
      throw new Error("id must be an integer, equal or greater than zero.");
    } else if (typeof title !== "string" || title.length < 3) {
      throw new Error("title must contain at least 3 letters.");
    }

    const post = PostModel.getPostByTitle(title);
    if (post && post.id !== id) {
      throw new Error("A post exists with this title.");
    }

    if (typeof content !== "string" || content.length < 10) {
      throw new Error("content must contain at least 10 letters.");
    }

    let data, posts;
    if (PostModel.migrateExists()) {
      try {
        data = fs.readFileSync(filename, "utf-8");
        data = JSON.parse(data);
        posts = data.posts;
      } catch (e) {
        throw new Error(e.message);
      }
    } else {
      try {
        PostModel.createMigrate();
        posts = [];
      } catch (e) {
        throw new Error(e.message);
      }
    }

    if (id === 0) {
      if (posts.length > 0) {
        id = posts[posts.length - 1].id + 1;
      } else {
        id = 1;
      }

      data.posts.push({
        id,
        title,
        content,
        author_id,
        status,
      });

      try {
        const str = JSON.stringify(data, null, "    ");
        fs.writeFileSync(filename, str, "utf-8");
        return id;
      } catch (e) {
        throw new Error(e.message);
      }
    } else {
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === id) {
          posts[i].title = title;
          posts[i].content = content;
          posts[i].author_id = author_id;
          posts[i].status = status;

          try {
            const str = JSON.stringify(data, null, "    ");
            fs.writeFileSync(filename, str, "utf-8");
            return id;
          } catch (e) {
            throw new Error(e.message);
          }
        }
      }
      throw new Error("post not found");
    }
  }

  static deletePost(id) {
    id = Number(id);

    if (id > 0 && id === parseInt(id)) {
      let data, posts;

      try {
        data = fs.readFileSync(filename, "utf-8");
        data = JSON.parse(data);
        posts = data.posts;
      } catch (e) {
        throw new Error(e.message);
      }

      for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === id) {
          posts.splice(i, 1);

          try {
            data.posts = posts;
            const str = JSON.stringify(data, null, "    ");
            fs.writeFileSync(filename, str, "utf-8");
            return true;
          } catch (e) {
            throw new Error(e.message);
          }
        }
      }

      return false;

      // throw new Error("post not found");
    } else {
      throw new Error("Task id must be a positive integer.");
    }
  }
}
