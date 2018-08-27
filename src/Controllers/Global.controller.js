export function fetchHTML(url, headers, timeout = 10000) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      ...headers
    })
      .then(response => response.text())
      .then(response => resolve(response))
      .catch(err => reject(new Error(err)))

    if (timeout) setTimeout(reject, timeout, new Error('Connection timed out'))
  })
}

export function fetchJSON(url, headers, timeout = 10000) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      ...headers
    })
      .then(response => response.json())
      .then(response => resolve(response))
      .catch(err => reject(new Error(err)))

    if (timeout) setTimeout(reject, timeout, new Error('Connection timed out'))
  })
}

export function init() {
  return {
    type: 'INIT'
  }
}
