import fetch from 'node-fetch'

export default async function(obj, args, context, info) {
  const user = await fetch(
    `https://jsonplaceholder.typicode.com/users/${args.userId}`
  )

  return await user.json()
}
