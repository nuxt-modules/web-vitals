export default eventHandler(async (event) => {
  const body = await readBody(event)
  console.log('Web-vitals event:' + body)
  return 'OK'
})
