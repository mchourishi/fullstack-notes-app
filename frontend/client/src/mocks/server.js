import { setupServer } from "msw/node";
import { rest } from "msw";

const server = setupServer(
  rest.get("/api/v1/notes", (req, res, ctx) => {
    return res(
      ctx.json([
        { id: "1", content: "Test note" },
        { id: "2", content: "Another test note" },
      ])
    );
  })
);

// Enable API mocking before tests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

export { server };
