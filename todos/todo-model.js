const db = require('../database/dbConfig');

module.exports = {
    find,
    add,
    getByFilter,
    update,
    remove
};

function find(id) {
    return db("todos").where({ user_id: id }).select('id', 'title', 'description');
};

function add(todo) {
    return db('todos').insert(todo);
}

function getByFilter(filter){
    return db('todos').where({ filter });
};

function update(changes, id){
    return db('todos')
        .update(changes)
        .where({ id });
};

function remove(id){
    return db('todos')
        .where({ id })
        .del()
};