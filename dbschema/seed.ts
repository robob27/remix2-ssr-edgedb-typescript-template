import { client } from "~/services/edgedb";

async function seed() {
  if (process.argv.includes("--reset")) {
    await client.execute(`
      DELETE User;
    `);
  }

  await client.execute(`
    INSERT User {
      username := "Cool Remix Dev 😎",
      email    := "user@example.com"
    };
  `);

  console.log(`Database has been seeded. 🌱`);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
}).finally(() => {
  client.close();
});
