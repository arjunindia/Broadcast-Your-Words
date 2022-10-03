import Pusher from "pusher";
import { json } from "@sveltejs/kit";

const pusher = new Pusher({
  appId: "1486228",
  key: "76f8d754429d0de93874",
  secret: "9cf862ab886905f21ef0",
  cluster: "ap2",
  useTLS: true,
});

export async function POST({ request }) {
  const { val } = await request.json();

  pusher.trigger("cache-quote", "newQuote", val);

  return new Response("ok", { status: 200 });
}
