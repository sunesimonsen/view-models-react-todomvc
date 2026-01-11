import { Routes, Route } from "@nano-router/react";

export const routes = new Routes(
  new Route("all", "/"),
  new Route("completed", "/completed"),
  new Route("active", "/active"),
);
