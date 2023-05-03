/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("aktor", (table) => {
      table.increments(); // id: integer, primary key, autoincrement
      table.string("isim").notNullable(); // isim: string, not null
    })
    .createTable("film", (table) => {
      table.increments(); // id: integer, primary key, autoincrement
      table.string("isim").notNullable(); // isim: string, not null
    })
    .createTable("aktor_film", (table) => {
      table.increments(); // id: integer, primary key, autoincrement
      table.integer("film_id").unsigned(); // film_id: integer, not null
      table.integer("aktor_id").unsigned(); // aktor_id: integer, not null
      table
        .foreign("film_id")
        .references("film.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("aktor_id")
        .references("aktor.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE"); // aktor_id: aktor.id
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("aktor_film")
    .dropTableIfExists("film")
    .dropTableIfExists("aktor");
};
