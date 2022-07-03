import fs from "fs";
import {User} from "../interfaces";
import {postsRepo} from "./posts-repo";
import path from 'path';

let users = loadData();


export const usersRepo = {
    getAll: () => users,
    getById: (id: number) => users.find((x: User) => x.id.toString() === id.toString()),
    find: (x: User) => users.find(x),
    create,
    update,
    hasPost,
    buyPost,
    delete: _delete
};

function create(user: User) {
    // generate new user id
    user.id = users.length ? Math.max(...users.map((x: User) => x.id)) + 1 : 1;

    // set date created and updated
    user.dateCreated = new Date().toISOString();
    user.dateUpdated = new Date().toISOString();

    // add and save user
    users.push(user);
    saveData();
}

function hasPost(userId: number, postId: number) {
    let user = usersRepo.getById(userId)!;
    return user.boughtPosts.includes(postId);
}

function buyPost(userId: number, postId: number) {
    let post = postsRepo.getById(postId)!;
    let user = usersRepo.getById(userId)!;
    if(user.boughtPosts.includes(post.id)){
        return;
    }
    user.boughtPosts.push(post.id);
    saveData();
}

function update(id: number, params: Partial<User>) {
    const user = users.find((x: User) => x.id.toString() === id.toString());

    // set date updated
    user.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(user, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id: number) {
    // filter out deleted user and save
    users = users.filter((x: User) => x.id.toString() !== id.toString());
    saveData();
}

// private helper functions

function loadData(): User[] {
    let x = path.join(process.cwd(), 'data');
    let d = fs.readFileSync(x + "/users.json");
    return JSON.parse(d.toString());
}

function saveData() {
    let x = path.join(process.cwd(), 'data');
    fs.writeFileSync(x + '/users.json', JSON.stringify(users, null, 4));
}