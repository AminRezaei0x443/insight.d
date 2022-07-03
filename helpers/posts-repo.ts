import fs from "fs";
import {Post} from "../interfaces";

let posts = loadData();

export const postsRepo = {
    getAll: () => posts,
    getById: (id: number) => posts.find((x: Post) => x.id!.toString() === id.toString()),
    find: (x: Post) => posts.find(x),
    create,
    update,
    delete: _delete
};

function create(post: Post) {
    // generate new user id
    post.id = posts.length ? Math.max(...posts.map((x: Post) => x.id!)) + 1 : 1;

    // set date created and updated
    post.dateCreated = new Date().toISOString();
    post.dateUpdated = new Date().toISOString();

    // add and save user
    posts.push(post);
    saveData();
}

function update(id: number, params: Partial<Post>) {
    const post = posts.find((x: Post) => x.id!.toString() === id.toString());

    // set date updated
    post!.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(post!, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id: number) {
    // filter out deleted user and save
    posts = posts.filter((x: Post) => x.id!.toString() !== id.toString());
    saveData();
}

// private helper functions

function loadData(): Post[] {
    let d = fs.readFileSync("data/posts.json");
    return JSON.parse(d.toString());
}

function saveData() {
    fs.writeFileSync('data/posts.json', JSON.stringify(posts, null, 4));
}