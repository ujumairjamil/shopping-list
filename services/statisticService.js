import { sql } from "../database/database.js";

const totalShoppingLists = async () => {
  const rows = await sql`SELECT COUNT(*) FROM shopping_lists;`;
  if (rows && rows.length > 0) {
    return rows[0].count;
  }
  return 0;
};

const totalShoppingListItems = async () => {
  const rows = await sql`SELECT COUNT(*) FROM shopping_list_items;`;
  if (rows && rows.length > 0) {
    return rows[0].count;
  }
  return 0;
};

export { totalShoppingListItems, totalShoppingLists };
