
exports.up = function(knex) {
    return knex.schema.createTable('usersTable', users => {
        users.increments();
  
        users
          .string('username', 50)
          .notNullable()
          .unique();
  
          users.string('password', 50).notNullable();
    })
    .createTable('todosTable', todos => {
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
    return knex.schema.dropTableIfExists('todosTable').dropTableIfExists('usersTable');
  };
  