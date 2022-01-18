let url = `http://localhost:3001/api/v1/`

const fetchAllData = (extraBit) => {
  return fetch(`${url}${extraBit}`)
    .then(response => errorCheck(response))
    .then(data => data[extraBit])
    .catch(error => (error))
}

const fetchSingleUser = (idNum) => {
  return fetch(`${url}user/${idNum}`)
    .then(response => errorCheck(response))
    .then(data => data[idNum])
    .catch(error => (error))
}

const postData = (newPost) => {
  return fetch(`${url}bookings`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newPost)
  })
    .then(response => errorCheck(response))
}

const errorCheck = (response) => {
  if (!response.ok) {
    throw new Error ('Please try again in an hour') 
  } else {
    return response.json();
  }
}


export {fetchAllData, fetchSingleUser, postData}