let url = `http://localhost:3001/api/v1/`

const fetchAllData = (extraBit) => {
    return fetch(`${url}${extrabit}`)
      .then(response => response.json())
      .then(data => data[extraBit])
      .catch(error => (error))
  },

  postData(newPost) {
    return fetch(`${url}bookings`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newPost)
    })
    .then(response => response.json())
  }
}

export default apiCalls