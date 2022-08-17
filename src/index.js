import 'dotenv/config'
import axios from 'axios'
import express from 'express'

const app = express()
const port = process.env.PORT

app.get('/:channel', (req, res) => {
  const { params = {} } = req
  const { channel } = params

  if (!channel) return res.redirect(400)

  axios.get(`https://pwn.sh/tools/streamapi.py?url=https://www.twitch.tv/${channel}`)
    .then(payload => {
      const { data } = payload
      const { success, urls = {} } = data

      if (success) {
        const { query } = req
        let { quality } = query

        if (!quality || !urls[quality]) quality = Object.keys(urls)[0]
        const url = urls[quality]

        if (!url) return res.sendStatus(404)

        res.redirect(url)
      } else {
        res.sendStatus(404)
      }
    })
})

app.listen(port, () => {
  console.log(`Web server listening on port ${port}`)
})
