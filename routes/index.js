const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')
const apicache = require('apicache')

// Env vars
const API_BASE_URL = process.env.API_BASE_URL + '/' + process.env.API_VERSION
const API_KEY = process.env.API_KEY

// Init cache
let cache = apicache.options({
  headers: {
    'cache-control': 'no-cache',
  },
}).middleware

/**
 * Docs: https://openweathermap.org/current
 */
router.get('/weather', cache('2 minutes'), async (req, res, next) => {
  console.log('url', req.url);
  try {
    const params = new URLSearchParams({
      "lang": "en",
      "units": "metric",
      "appid": API_KEY,
      ...url.parse(req.url, true).query,
    })

    const apiUrl = `${API_BASE_URL}/weather?${params}`
    const apiRes = await needle('get', apiUrl)
    const data = apiRes.body

    // Log the request to the public API
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Request: ${apiUrl}`)
    }

    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

/**
 * Clear cache endpoint
 */
router.get('/clear-cache', (req, res) => {
  apicache.clear() // Clear all cached routes
  res.status(200).json({ message: 'Cache cleared successfully' })
})

module.exports = router
