import { GameJoltApi } from "./game_jolt_api.ts";

const privateKey = Deno.env.get('GJ_PRIVATE_KEY');
const gameId = Deno.env.get('GJ_GAME_ID');

async function main() {
  console.log(privateKey, gameId);
  if (!privateKey || !gameId) {
    throw new Error('GJ_PRIVATE_KEY and GJ_GAME_ID must be set in the environment');
  }
  const api = new GameJoltApi(gameId, privateKey);
  
  const user = await api.user('indiedevaustin');
  console.log(user);
}

main();
