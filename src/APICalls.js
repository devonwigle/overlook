let url = `http://localhost:3001/api/v1/`

const fetchAllData = (extraBit) => {
  return fetch(`${url}${extraBit}`)
    .then(response => response.json())
    .then(data => data[extraBit])
    .catch(error => (error))
}

const fetchSingleUser = (idNum) => {
  return fetch(`${url}user/${idNum}`)
    .then(response => response.json())
    .then(data => data[idNum])
    .catch(error => (error))
}

const postData = (newPost) => {
  return fetch(`${url}bookings`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newPost)
  })
  .then(response => response.json())
}


export {fetchAllData}