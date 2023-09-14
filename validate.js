import CryptoJS from 'crypto-js'


//let TELEGRAM_BOT_TOKEN='6395374268:AAEK2E4sbVWf3HLaIhTYWDnvQiKrQkb5GAw'

export async function verifyTelegramWebAppData(telegramInitData, token){
    return new Promise((resolve)=>{
let initData = new URLSearchParams(telegramInitData)
const hash = initData.get("hash");
  let dataToCheck= [];

  initData.sort();
  initData.forEach((val, key) => key !== "hash" && dataToCheck.push(`${key}=${val}`));
  
  const secret = CryptoJS.HmacSHA256(token, "WebAppData");
  const _hash = CryptoJS.HmacSHA256(dataToCheck.join("\n"), secret).toString(CryptoJS.enc.Hex);
  
resolve(_hash === hash)


    })
}