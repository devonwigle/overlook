let url = `http://localhost:3001/api/v1/`

let apiCalls = {
  fetchData(extraBit, userID) {
    return fetch(`${url}${extrabit}/${userID}`)
      .then(response => response.json())
      .then(data => data[extraBit])
      .catch(err => (error))
  }

}

export default apiCalls