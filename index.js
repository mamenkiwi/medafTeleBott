import { Telegraf } from "telegraf";
//import { Bot } from "grammy";
import express from 'express'
import { verifyTelegramWebAppData } from "./validate.js";
import morgan from "morgan"


//'http://api.telegram.org/bot6395374268:AAEK2E4sbVWf3HLaIhTYWDnvQiKrQkb5GAw/setWebhook?url=https://medaftelebott-3-f0578401.deta.app/'
const app = express()
const token = "6395374268:AAEK2E4sbVWf3HLaIhTYWDnvQiKrQkb5GAw"
const bot = new Telegraf(token);
const web_link = "https://alphaspecialschool.vercel.app/";
let sandBoxLink ='https://6cllf7.csb.app/'
let webhookLink ='https://medaftelebott-4-f0578401.deta.app'

app.use(morgan('dev'))


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use(await bot.createWebhook({domain: webhookLink }))



app.get('/', (req, res)=> {
  res.send({msg: "Conencted Successfuly"})
  }) 

app.post('/checkData', async (req,res)=>{
  let {data} = req.body
  console.log(data)
let valRes = await verifyTelegramWebAppData(data._auth, token)
console.log(valRes)

res.send(valRes)



})
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



/*
app.get('/', (req, res)=> {
  res.send('working')
})

*/


  

  
  app.use((req, res, next) => {
      const error = new Error();
      error.message = 'Not Found';
      error.status = 404;
      next(error);
  });
  
  app.use((error, req, res, next) => {
      res.status(error.status || 500).json({
          error: error
      });
  });

bot.launch();

app.listen(8080, ()=> console.log('app running on port 8080'))