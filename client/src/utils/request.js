 const request = async(method, url, data, options = {}) =>{

    if(method!='GET'){
  options.method= method;
  }

  if(data){
    options={
      ...options,
      headers:{
        'Content-Type':'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data)
    }
  }

  const response = await fetch(url, options);
  
  if(response.status == 204){
    return response;
  }
  
  if(!response.ok){
    const result = response.json();
    throw result;
  }

  const result = await response.json();

  return result;
} 

export default {
  get: request.bind(null, 'GET'),
  post: request.bind(null, 'POST'),
  put: request.bind(null, 'PUT'),
  delete: (url, options) => request("DELETE", url, undefined, options),
}


