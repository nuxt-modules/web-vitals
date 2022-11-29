export default eventHandler(async (event) => {
  const body = await readBody(event)
  console.log('Web-vitals event:', JSON.stringify(body))
  return 'OK'
})
