const getUnits = async (userId = '') => {
  const promise = await fetch(`http://localhost:9999/api/units${userId}`)
  const units = await promise.json()
  return units
}

export default getUnits