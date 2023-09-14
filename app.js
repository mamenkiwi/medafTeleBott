
import express from 'express'
import axios from 'axios'

const TOKEN = "6395374268:AAEK2E4sbVWf3HLaIhTYWDnvQiKrQkb5GAw"


let sandBoxLink ='https://6cllf7.csb.app/'
let webhookLink ='https://medaftelebott-3-f0578401.deta.app/'
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
const URI = `/webhook/${TOKEN}`
const WEBHOOK_URL = webhookLink + URI
const PORT = 8080


const app = express()

app.use(express.json())



const init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
    console.log(res.data)
}


app.post(URI, async (req, res) => {
    console.log(req.body)

    const chatId = req.body.message.chat.id
    const text = req.body.message.text

    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: text
    })
    return res.send()
})

app.listen(PORT || 8080, async () => {
    console.log('🚀 app running on port', PORT || 8080)
    await init()
})