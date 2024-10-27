import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
import * as listController from "./controllers/listController.js";
import * as individualListController from "./controllers/individualListController.js";
import * as homepageController from "./controllers/homepageController.js";

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return await homepageController.listStatistics();
  } else if (
    url.pathname.match("/lists/[0-9]+/deactivate") && request.method === "POST"
  ) {
    return await listController.deactivateList(request);
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await listController.addList(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await listController.viewLists(request);
  } else if (
    url.pathname.match("lists/[0-9]+/items/[0-9]+/collect") &&
    request.method == "POST"
  ) {
    return await individualListController.markAsCollected(request);
  } else if (url.pathname.match("lists/[0-9]+") && request.method === "GET") {
    return await listController.viewList(request);
  } else if (url.pathname.match("lists/[0-9]+") && request.method === "POST") {
    return await individualListController.createListEntry(request);
  } else {
    return new Response("Not found", { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });
