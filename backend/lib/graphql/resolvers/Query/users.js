import fetch from 'node-fetch'
export default async function(obj, args, context, info) {
  const users = await fetch('https://jsonplaceholder.typicode.com/users')
  return await users.json()
}
