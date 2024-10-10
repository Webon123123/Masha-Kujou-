const {
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion, 
    MessageRetryMap,
    makeCacheableSignalKeyStore, 
    jidNormalizedUser,
    PHONENUMBER_MCC
   } = await import('@whiskeysockets/baileys')
import moment from 'moment-timezone'
import NodeCache from 'node-cache'
import readline from 'readline'
import qrcode from "qrcode"
import fs from "fs"
import pino from 'pino'
import * as ws from 'ws'
const { CONNECTING } = ws
import { Boom } from '@hapi/boom'
import { makeWASocket } from '../lib/simple.js'

if (global.conns instanceof Array) console.log()
else global.conns = []

let handler = async (m, { conn: _conn, args, usedPrefix, command, isOwner }) => {
  let parent = args[0] && args[0] == 'plz' ? _conn : await global.conn
  if (!((args[0] && args[0] == 'plz') || (await global.conn).user.jid == _conn.user.jid)) {
	return m.reply(`⚠️ ¡𝙀𝙨𝙩𝙚 𝙘𝙤𝙢𝙖𝙣𝙙𝙤 𝙨𝙤𝙡𝙤 𝙥𝙪𝙚𝙙𝙚 𝙨𝙚𝙧 𝙪𝙨𝙖𝙙𝙤 𝙚𝙣 𝙚𝙡 𝙗𝙤𝙩 𝙥𝙧𝙞𝙣𝙘𝙞𝙥𝙖𝙡! ⚠️\n\n🚀 𝐄𝐧𝐥𝐚𝐜𝐞 𝐝𝐞𝐥 𝐛𝐨𝐭 𝐩𝐫𝐢𝐧𝐜𝐢𝐩𝐚𝐥: wa.me/${global.conn.user.jid.split`@`[0]}?text=${usedPrefix}code`)
}

  async function serbot() {

  let authFolderB = m.sender.split('@')[0]

    if (!fs.existsSync("./serbot/"+ authFolderB)){
        fs.mkdirSync("./serbot/"+ authFolderB, { recursive: true });
    }
    args[0] ? fs.writeFileSync("./serbot/" + authFolderB + "/creds.json", JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t')) : ""

const {state, saveState, saveCreds} = await useMultiFileAuthState(`./serbot/${authFolderB}`)
const msgRetryCounterMap = (MessageRetryMap) => { };
const msgRetryCounterCache = new NodeCache()
const {version} = await fetchLatestBaileysVersion();
let phoneNumber = m.sender.split('@')[0]

const methodCodeQR = process.argv.includes("qr")
const methodCode = !!phoneNumber || process.argv.includes("code")
const MethodMobile = process.argv.includes("mobile")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (texto) => new Promise((resolver) => rl.question(texto, resolver))

const connectionOptions = {
  logger: pino({ level: 'silent' }),
  printQRInTerminal: false,
  mobile: MethodMobile, 
  browser: [ "Ubuntu", "Chrome", "20.0.04" ], 
  auth: {
  creds: state.creds,
  keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
  },
  markOnlineOnConnect: true, 
  generateHighQualityLinkPreview: true, 
  getMessage: async (clave) => {
  let jid = jidNormalizedUser(clave.remoteJid)
  let msg = await store.loadMessage(jid, clave.id)
  return msg?.message || ""
  },
  msgRetryCounterCache,
  msgRetryCounterMap,
  defaultQueryTimeoutMs: undefined,   
  version
  }

let conn = makeWASocket(connectionOptions)

if (methodCode && !conn.authState.creds.registered) {
    if (!phoneNumber) {
        process.exit(0);
    }
    let cleanedNumber = phoneNumber.replace(/[^0-9]/g, '');
    if (!Object.keys(PHONENUMBER_MCC).some(v => cleanedNumber.startsWith(v))) {
        process.exit(0);
    }

    setTimeout(async () => {
        let codeBot = await conn.requestPairingCode(cleanedNumber);
        codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot;
        let txt = `╭━━━⟅ *𝕊𝔼ℝ𝔹𝕆𝕋 - 𝕊𝕌𝔹𝔹𝕆𝕋* ⟆━━━╮\n`
            txt += `┃ ✧ 𝐔𝐬𝐚 𝐞𝐬𝐭𝐞 𝐂ó𝐝𝐢𝐠𝐨 𝐩𝐚𝐫𝐚 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐫𝐭𝐞 𝐞𝐧 𝐮𝐧 𝐒𝐮𝐛 𝐁𝐨𝐭\n`
            txt += `┃ ➤ 𝐏𝐚𝐬𝐨𝐬 𝐩𝐚𝐫𝐚 𝐥𝐨𝐠𝐫𝐚𝐫𝐥𝐨:\n`
            txt += `┃ ➤ *1*: 𝗧𝗼𝗾𝘂𝗲 𝗲𝗻 𝗹𝗼𝘀 𝟯 𝗽𝘂𝗻𝘁𝗼𝘀 𝗱𝗲 𝗠𝗲𝗻ú.\n`
            txt += `┃ ➤ *2*: 𝗦𝗲𝗹𝗲𝗰𝗰𝗶𝗼𝗻𝗲 𝗱𝗶𝘀𝗽𝗼𝘀𝗶𝘁𝗶𝘃𝗼𝘀 𝘃𝗶𝗻𝗰𝘂𝗹𝗮𝗱𝗼𝘀.\n`
            txt += `┃ ➤ *3*: 𝗧𝗼𝗾𝘂𝗲 𝗲𝗻 *𝗩𝗶𝗻𝗰𝘂𝗹𝗮𝗿 𝗰𝗼𝗻 𝗻ú𝗺𝗲𝗿𝗼 𝗱𝗲 𝘁𝗲𝗹é𝗳𝗼𝗻𝗼*.\n`
            txt += `┃ ➤ *4*: 𝗘𝘀𝗰𝗿𝗶𝗯𝗲 𝗲𝗹 𝗰𝗼𝗱𝗶𝗴𝗼.\n`
            txt += `╰━━━━━━⟅ ✦ ✦ ✦ ⟆━━━━━━╯\n`
            txt += `🌟 *𝐍𝐨𝐭𝐚:* 𝐄𝐬𝐭𝐞 𝐜ó𝐝𝐢𝐠𝐨 𝐬𝐨𝐥𝐨 𝐟𝐮𝐧𝐜𝐢𝐨𝐧𝐚 𝐩𝐚𝐫𝐚 𝐞𝐥 𝐧ú𝐦𝐞𝐫𝐨 𝐪𝐮𝐞 𝐥𝐨 𝐬𝐨𝐥𝐢𝐜𝐢𝐭ó.`
         await parent.reply(m.chat, txt, m)
         await parent.reply(m.chat, codeBot, m)
        rl.close()
    }, 3000)
}

conn.isInit = false
let isInit = true

async function connectionUpdate(update) {
    const { connection, lastDisconnect, isNewLogin, qr } = update
    if (isNewLogin) conn.isInit = true
    const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
        if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
      let i = global.conns.indexOf(conn)
      if (i < 0) return console.log(await creloadHandler(true).catch(console.error))
      delete global.conns[i]
      global.conns.splice(i, 1)

          if (code !== DisconnectReason.connectionClosed) {
          parent.sendMessage(m.chat, { text: "🌐 *𝕮𝖔𝖓𝖊𝖝𝖎ó𝖓 𝖕𝖊𝖗𝖉𝖎𝖉𝖆...*" }, { quoted: m })
        } else {
        }
      }
    
    if (global.db.data == null) loadDatabase()

    if (connection == 'open') {
    conn.isInit = true
    global.conns.push(conn)
    await parent.reply(m.chat, args[0] ? '✨ *𝕮𝖔𝖓𝖊𝖈𝖙𝖆𝖉𝖔 𝖈𝖔𝖓 é𝖝𝖎𝖙𝖔* ✨' : '🌐 *𝕮𝖔𝖓𝖊𝖈𝖙𝖆𝖉𝖔 𝖊𝖝𝖎𝖙𝖔𝖘𝖆𝖒𝖊𝖓𝖙𝖊 𝖆 𝖂𝖍𝖆𝖙𝖘𝕬𝖕𝖕* 🌐\n\n📌 *𝕹𝖔𝖙𝖆:* 𝕰𝖘𝖙𝖔 𝖊𝖘 𝖙𝖊𝖒𝖕𝖔𝖗𝖆𝖑.\n🔄 *𝕾𝖎 𝖊𝖑 𝕭𝖔𝖙 𝖕𝖗𝖎𝖓𝖈𝖎𝖕𝖆𝖑 𝖘𝖊 𝖗𝖊𝖎𝖓𝖎𝖈𝖎𝖆 𝖔 𝖘𝖊 𝖉𝖊𝖘𝖆𝖈𝖙𝖎𝖛𝖆, 𝖙𝖔𝖉𝖔𝖘 𝖑𝖔𝖘 𝖘𝖚𝖇 𝖇𝖔𝖙𝖘 𝖙𝖆𝖒𝖇𝖎é𝖓 𝖘𝖊 𝖉𝖊𝖘𝖆𝖈𝖙𝖎𝖛𝖆𝖗á𝖓.*\n\n📞 *𝕮𝖔𝖓𝖘𝖊𝖗𝖛𝖆 𝖊𝖑 𝖊𝖓𝖑𝖆𝖈𝖊 𝖉𝖊 𝖑𝖔𝖘 𝖘𝖚𝖇 𝖇𝖔𝖙𝖘 𝖕𝖆𝖗𝖆 𝖗𝖊𝖎𝖓𝖎𝖈𝖎𝖆𝖗:*\nhttps://whatsapp.com/channel/0029Vak9Hmd1iUxdfDUdCK1w', m)
    await sleep(5000)
    if (args[0]) return
    
    await parent.reply(conn.user.jid, `📝 *𝐋𝐚 𝐬𝐢𝐠𝐮𝐢𝐞𝐧𝐭𝐞 𝐯𝐞𝐳 𝐪𝐮𝐞 𝐬𝐞 𝐜𝐨𝐧𝐞𝐜𝐭𝐞, 𝐞𝐧𝐯í𝐚 𝐞𝐥 𝐬𝐢𝐠𝐮𝐢𝐞𝐧𝐭𝐞 𝐦𝐞𝐧𝐬𝐚𝐣𝐞 𝐩𝐚𝐫𝐚 𝐢𝐧𝐢𝐜𝐢𝐚𝐫 𝐬𝐞𝐬𝐢ó𝐧 𝐬𝐢𝐧 𝐮𝐭𝐢𝐥𝐢𝐳𝐚𝐫 𝐨𝐭𝐫𝐨 𝐜ó𝐝𝐢𝐠𝐨:*`, m)
    
    await parent.sendMessage(conn.user.jid, {text : usedPrefix + command + " " + Buffer.from(fs.readFileSync("./serbot/" + authFolderB + "/creds.json"), "utf-8").toString("base64")}, { quoted: m })
  }

  const timeoutId = setTimeout(() => {
        if (!conn.user) {
            try {
                conn.ws.close()
            } catch {}
            conn.ev.removeAllListeners()
            let i = global.conns.indexOf(conn)
            if (i >= 0) {
                delete global.conns[i]
                global.conns.splice(i, 1)
            }
            fs.rmdirSync(`./serbot/${authFolderB}`, { recursive: true })
        }
    }, 30000)
  
let handler = await import('../handler.js')
let creloadHandler = async function (restatConn) {
try {
const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error)
if (Object.keys(Handler || {}).length) handler = Handler
} catch (e) {
console.error(e)
}
if (restatConn) {
try { conn.ws.close() } catch { }
conn.ev.removeAllListeners()
conn = makeWASocket(connectionOptions)
isInit = true
}

if (!isInit) {
conn.ev.off('messages.upsert', conn.handler)
conn.ev.off('connection.update', conn.connectionUpdate)
conn.ev.off('creds.update', conn.credsUpdate)
}
  
conn.handler = handler.handler.bind(conn)
conn.connectionUpdate = connectionUpdate.bind(conn)
conn.credsUpdate = saveCreds.bind(conn, true)

conn.ev.on('messages.upsert', conn.handler)
conn.ev.on('connection.update', conn.connectionUpdate)
conn.ev.on('creds.update', conn.credsUpdate)
isInit = false
return true
}
creloadHandler(false)
}
serbot()

}
handler.help = ['code']
handler.tags = ['serbot']
handler.command = ['code', 'codebot']
handler.rowner = false

export default handler

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}