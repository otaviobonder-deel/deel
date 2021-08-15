import { rest } from "msw";

export const handlers = [
  rest.get("https://api.github.com/search/users", (req, res, ctx) => {
    const queryParam = req.url.searchParams.get("q");

    const list = [];

    if (queryParam === "Otavio") {
      list.push({ login: "Otavio" });
    }

    const response = {
      items: list,
    };
    return res(ctx.status(200), ctx.json(response));
  }),
];
