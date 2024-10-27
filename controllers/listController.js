import { configure, renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as listService from "../services/listService.js";
import * as individualListService from "../services/individualListService.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const addList = async (request) => {
  const formData = await request.formData();
  const listName = formData.get("name");
   if (!listName || listName.trim() === "") {
    return new Response(JSON.stringify({ error: "List name shouldn't be empty." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  await listService.create(listName);
  return redirectTo("/lists");
};

const viewLists = async () => {
  const data = {
    lists: await listService.findAllActiveLists(),
  };
  return new Response(await renderFile("lists.eta", data), responseDetails);
};

const deactivateList = async (request) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const id = parts[2];
  await listService.deactivateListById(id);
  return redirectTo("/lists");
};

const viewList = async (request) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");

  const data = {
    list: await listService.findById(parts[2]),
    currentList: await individualListService.findCurrentListEntry(parts[2]),
  };

  return new Response(await renderFile("list.eta", data), responseDetails);
};
export { addList, deactivateList, viewList, viewLists };
