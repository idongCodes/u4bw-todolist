const db = require('../database/dbConfig');

module.exports = {
    find,
    add,
    findById,
    findBy,
    update,
    remove
};

function find() {
    return db("users").select('id', 'username', 'password');
};

function add(user) {
    return db('users').insert(user);
}

function findById(id) {
    return db('users').where({ id }).first();
};

function findBy(filter){
    return db('users').where(filter).select('id', 'username');
};

function update(changes, id){
    return db('users')
        .update(changes)
        .where({ id });
};

function remove(id){
    return db('users')
        .where({ id })
        .del()
};