const axios = require('axios')
const { url } = require('./constants')

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

async function getToken(keywords) {
  let token = null
  try {
    let u

    try {
      u = new URL(`${url}?q=${encodeURIComponent(keywords)}`)
    } catch (err) {
      console.error('cannot get url from ', url, keywords)
      throw err
    }
    let res = await fetch(u.href)

    const value = await res.text()
    token = value.match(/vqd=([\d-]+)\&/)[1]

  } catch (error) {
    console.error(error)
  }

  return new Promise((resolve, reject) => {
    if (!token) {
      reject('Failed to get token')
    }
    resolve(token)
  })

}

module.exports = {
  sleep,
  getToken
}
