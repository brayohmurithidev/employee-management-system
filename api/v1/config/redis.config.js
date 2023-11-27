import redis from "redis";

const client = redis.createClient({
  // Add your Redis configuration here, like host, port, password, etc.
});

client.on("error", (err) => {
  console.error(`Redis Error: ${err}`);
});

await client.connect();

export default client;
