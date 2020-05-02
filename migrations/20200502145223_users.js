
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('users', users => {
      users.increments();

      users
        .string('username', 50)
        .notNullable()
        .unique();

        users.string('password', 50).notNullable();
  })
  .createTableIfNotExists('todos', todos => {
      todos.increments();

      todos
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      todos.string('title')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      todos.string('description')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('todos').dropTableIfExists('users');
};
