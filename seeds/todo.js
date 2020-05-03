
exports.seed = function(knex, Promise) {
  return knex('todo').del()
    .then(function () {
      const todos = [
        {
        title: 'Build a CRUD App',
        description: 'Make sure to use add all http req func'
        },
        {
          title: 'Walk Bella',
          description: 'Twice around block'
        },
        {
          title: 'Feed Bella',
          description: '2 Cups Kibbles and bits + wet food'
        }
      ];

      return knex('todo').insert(todos);
    });
};
