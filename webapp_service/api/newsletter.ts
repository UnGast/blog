import axios from 'axios'
import express from 'express'

const AUTH_CODE = process.env.CLEVERREACH_AUTH_CODE
const API_BASE_URL = process.env.CLEVERREACH_API_URL
const LOGIN_URL = `${API_BASE_URL}/login`
const CREATE_RECEIVER_URL = `${API_BASE_URL}/groups.json/${process.env.CLEVERREACH_NEWSLETTER_GROUP_ID}/receivers`
const SEND_DOI_MAIL_URL = `${API_BASE_URL}/forms.json/${process.env.CLEVERREACH_NEWSLETTER_DOI_ID}/send/activate`

var accessToken: string = null

let router = express()

router.use('/', (req, res, next) => {
  let body = []
  req.on('data', (chunk) => {
    body.push(chunk)
  }).on('end', async () => {
    let bodyString = Buffer.concat(body).toString()
    const data = JSON.parse(bodyString)
    console.log('pre REGISTER new recipient', data)
    
    if (accessToken === null) {
      var response = await axios.post(LOGIN_URL, {
        client_id: process.env.CLEVERREACH_CLIENT_ID,
        login: process.env.CLEVERREACH_LOGIN,
        password: process.env.CLEVERREACH_PASSWORD
      }).catch(e => {
        console.log('ACCES TOKEN ERROR', e)
      })
      if (response) {
        accessToken = response.data
      } else {
        console.error(new Error('Could not retrieve access token.'))
        res.statusCode = 400
        res.statusMessage = 'Error'
        res.end()
        return
      }
      console.log('ACCESS TOKEN', accessToken)
    }

    axios.post(CREATE_RECEIVER_URL, [{
      email: data.email,
      registered: Date.now(),
      activated: 0,
      global_attributes: {
        firstname: data.firstName,
      }
    }], {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(mailServiceResponse => {
      console.log(`SUCCESS registered new recipient ${data.email} for newsletter`, mailServiceResponse.data)
      
      return axios.post(SEND_DOI_MAIL_URL, {
        email: data.email,
        doidata: {
          user_ip: req.ip,
          referer: req.get('Referrer'),
          user_agent: req.get('User-Agent')
        },
        groups_id: process.env.CLEVERREACH_DOI_EMAIL_GROUPS_ID
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
    }).then(mailServiceResponse => {
      console.log(`SUCCESS sent doi mail to new recipient ${data.email} for newsletter`, mailServiceResponse.data)
      
      res.statusCode = 200
      res.statusMessage = 'Ok'
      res.end()
    }).catch(mailServiceError => {
      console.error(`ERROR while trying to register recipient ${data.email} for newsletter`, mailServiceError, mailServiceError.response.data.error)
      res.statusCode = 400
      res.statusMessage = 'Error'
      res.end()
    })
  })
})

export default router