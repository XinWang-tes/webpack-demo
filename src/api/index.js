export function fetchData (url, opts) {
  return fetch(url,opts)
  .then(res => {
    if (!res.ok) {
      const err = new Error(`network status error ${res.statusText}`)
      err.status = res.status
      try {
        const json = res.json()
        if (json) {
          err.body = json
        }
      } catch (e) {
        // ignore if there is no json body
      }
      throw err
    } 
    return res.json()
  })
}

export async function getAgents () {
  return fetchData('http://localhost:3000/agents')
}

export async function updateAgent (data, id) {
  return fetchData(`http://localhost:3000/agents/${id}`,{
    body: JSON.stringify(data), 
    headers: {
      'content-type': 'application/json'
    },
    method: 'PUT',
  })
}