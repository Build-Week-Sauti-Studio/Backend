exports.up = function(knex) {
  return knex.schema.createTable('inputs', tbl => {
    tbl.increments();
    tbl.string(`description`).notNullable();
    tbl.string(`location`).notNullable();
    tbl.string(`idea`).notNullable();
    tbl
      .integer(`user_id`)
      .unsigned()
      .notNullable()
      .references(`id`)
      .inTable(`users`)
      .onDelete(`CASCADE`)
      .onUpdate(`CASCADE`);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('inputs');
};
