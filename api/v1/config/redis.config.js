import {createClient} from 'redis'

const client = createClient()

client.on('error', err => console.log('Redis client error', err));
await client.connect()


const roles = await client.hGetAll('roles')
console.log(JSON.stringify((roles)))