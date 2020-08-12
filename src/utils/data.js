const getData = async (kind ,data) => {

  const promise = await fetch(`http://localhost:9999/api/${kind?kind:"units"}`,data)
  const units = await promise.json()
  return units
}

export default getData