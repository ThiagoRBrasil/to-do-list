import { http, HttpResponse } from "msw";
import { v4 as uuidv4 } from "uuid";

export const handlers = [
  http.get("/tasks", () => {
    return HttpResponse.json([
      {
        id: uuidv4(),
        name: "Reunião com Scrum Master",
        isCompleted: false,
      },
      {
        id: uuidv4(),
        name: "Criar funcionalidade X no sistema",
        isCompleted: true,
      },
      {
        id: uuidv4(),
        name: "Ir para a academia",
        isCompleted: false,
      },
      {
        id: uuidv4(),
        name: "Estudar React",
        isCompleted: false,
      },
    ]);
  }),

  http.post("/tasks", async ({ request }) => {
    const body = await request.json();
    return new HttpResponse(JSON.stringify({ id: 1, body }), { status: 201 });
  }),

  http.post("/tasks/:id", async () => {
    return new HttpResponse(null, { status: 202 });
  }),

  http.put("/tasks/:id", async () => {
    return new HttpResponse(null, { status: 202 });
  }),

  http.delete("/tasks/:id", async () => {
    return new HttpResponse(null, { status: 200 });
  }),
];
