const getUnits = async () => {
  const promise = await fetch(`http://localhost:9999/api/units`)
  const units = await promise.json()
  return units
}

export default getUnits