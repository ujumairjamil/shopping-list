import * as statisticService from "../services/statisticService.js";
import { configure, renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";

configure({
  views: `${Deno.cwd()}/views/`,
});
const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const listStatistics = async () => {
  const data = {
    lists: await statisticService.totalShoppingLists(),
    items: await statisticService.totalShoppingListItems(),
  };
  return new Response(await renderFile("homepage.eta", data), responseDetails);
};

export { listStatistics };
