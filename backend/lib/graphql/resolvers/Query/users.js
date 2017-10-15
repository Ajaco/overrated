export default async function(obj, args, context, info) {
  console.log(context)
  return [{id: '1', name: 'testing'}, {id: '2', name: 'bar'}]
}
