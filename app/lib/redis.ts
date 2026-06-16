import { createClient } from 'redis';

export const redis = createClient({
  url: process.env.REDIS_URL
});

redis.on('error', (err) => console.error('Redis Client Error', err));

async function testRedis() {
  await redis.connect();
  const pong = await redis.ping();
  console.log('Redis connected ✅', pong); // PONG gelmeli
}

testRedis();