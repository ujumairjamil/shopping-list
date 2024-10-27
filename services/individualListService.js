import { sql } from "../database/database.js";

const insertIntoIndividual = async (listId, itemName) => {
  await sql` INSERT INTO shopping_list_items (name, shopping_list_id)
    VALUES (${itemName}, ${listId})
  `;
};

const findCurrentListEntry = async (listId) => {
  return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${listId} ORDER BY collected, name`;
};

const itemCollection = async (itemId) => {
  await sql`UPDATE shopping_list_items SET collected = NOT collected WHERE id = ${itemId}`;
};

export { findCurrentListEntry, insertIntoIndividual, itemCollection };
