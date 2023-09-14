import { Telegraf } from "telegraf";
//import { Bot } from "grammy";
import express from 'express'
const token = "6395374268:AAEK2E4sbVWf3HLaIhTYWDnvQiKrQkb5GAw"
const bot = new Telegraf(token);
const web_link = "https://alphaspecialschool.vercel.app/";
let sandBoxLink ='https://6cllf7.csb.app/'
let webhookLink ='https://medaftelebott-3-f0578401.deta.app/'

'http://api.telegram.org/bot6395374268:AAEK2E4sbVWf3HLaIhTYWDnvQiKrQkb5GAw/setWebhook?url=https://medaftelebott-3-f0578401.deta.app/'
const app = express()

app.use(express.json())
app.use(await bot.createWebhook({domain: webhookLink }))


bot.start((ctx) =>
  ctx.reply("Welcome :)))))", {
    
    reply_markup: {
    inline_keyboard  : [[{ text: "Place your Bid", web_app: { url: sandBoxLink },  }]],
        resize_keyboard: true,
      
    },
  })
);

bot.on('text', async(ctx)=>{
  ctx.reply("You want some bidding", {
    
    reply_markup: {
    inline_keyboard  : [[{ text: "Place your Bid", web_app: { url: sandBoxLink },  }]],
        resize_keyboard: true,
      
    },
  })
})

app.post('/webhook', (req, res)=>{
  let message = req.body

  console.log(message)
})

/*
app.get('/', (req, res)=> {
  res.send('working')
})

*/
bot.launch();

app.listen(8080, ()=> console.log('app running on port 8080'))