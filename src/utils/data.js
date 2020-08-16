import getCookie from './cookie'

const getData = async (kind) => {

  
    const promise = await fetch(`http://localhost:9999/api/${kind?kind:"units"}`,{headers: {
    'Content-Type': 'application/json',
    'Authorization': getCookie('x-auth-token')
    }
    
  })
  const units = await promise.json()
  
  
  return units

 
  
  // if(promise.status >300){
  //   console.log(promise.status)
  // }
  
}

export default getData