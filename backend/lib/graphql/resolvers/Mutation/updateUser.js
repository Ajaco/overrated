import fetch from 'node-fetch'
export default async function(obj, args, context, info) {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: '',
  })

  // return res.json()
  return {id: '1', name: args.name}
}
