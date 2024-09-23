import { APP_HOST, APP_PORT } from "./constants";
import { app } from "./app";

import { parse, stringify } from "yaml";

import { inspect } from "node:util";

app.listen(
  {
    hostname: APP_HOST,
    port: APP_PORT,
  },
  ({ hostname, port }) => {
    console.info(`Running at http://${hostname}:${port}`);
  }
);

const file = Bun.file("./posts/posts.yaml");
const yaml = parse(await file.text());
console.log(inspect(yaml, false, null, true));
