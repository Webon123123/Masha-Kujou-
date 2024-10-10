import { canLevelUp, xpRange } from '../lib/levelling.js'
import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
import fs from 'fs'

let handler = async (m, { conn, usedPrefix, command}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let bio = await conn.fetchStatus(who).catch(_ => 'undefined')
  let biot = bio.status?.toString() || 'Sin Info'
  let user = global.db.data.users[who]
  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://i.ibb.co/P4nbf7g/file.jpg')
  let { exp, limit, name, registered, regTime, age, level } = global.db.data.users[who]
  let { min, xp, max } = xpRange(user.level, global.multiplier)
  let username = conn.getName(who)
  let prem = global.prems.includes(who.split`@`[0])
  let sn = createHash('md5').update(who).digest('hex')
  let api = await axios.get(`https://deliriusapi-official.vercel.app/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`)
  let userNationalityData = api.data.result
  let userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : 'Desconocido'
  let img = await (await fetch(`${pp}`)).buffer()

  // Premium Users
  let txt = prem
    ? `🎉  *P E R F I L  -  VIP  P R E M I U M*  🎉\n\n`
    : ` –  *P E R F I L  -  U S E R*\n\n`

  txt += prem
    ? `✨  ┌━━━━━━━━━━━━━━━━━━┈ ✦  ━━━━━━━━━━━━━━━━━━━━┐\n`
    : `┌  ✩\n`

  txt += `│  ✩  *Nombre* : ${name}\n`
  txt += `│  ✩  *Edad* : ${registered ? `${age} años` : '×'}\n`
  txt += `│  ✩  *Numero* : ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}\n`
  txt += `│  ✩  *Nacionalidad* : ${userNationality}\n`
  txt += `│  ✩  *Link* : wa.me/${who.split`@`[0]}\n`
  txt += `│  ✩  *Estrellas* : ${limit}\n`
  txt += `│  ✩  *Nivel* : ${level}\n`
  txt += `│  ✩  *XP* : Total ${exp} (${user.exp - min}/${xp})\n`

  // Información extra para los usuarios Premium
  if (prem) {
    txt += `│  ✩  *Rango Premium* : 🏅VIP Exclusive🏅\n`
    txt += `│  ✩  *Beneficios Premium* :\n`
    txt += `│    ─ Acceso a comandos exclusivos 🔥\n`
    txt += `│    ─ Bonos de experiencia y recompensas 🌟\n`
    txt += `│    ─ Soporte preferencial 💬\n`
  }

  txt += `│  ✩  *Premium* : ${prem ? 'Si' : 'No'}\n`

  txt += prem
    ? `✨  └━━━━━━━━━━━━━━━━━━┈ ✦  ━━━━━━━━━━━━━━━━━━━━┘\n`
    : `└  ✩\n`

  txt += `└  ✩  *Registrado* : ${registered ? 'Si': 'No'}`

  let mentionedJid = [who]
  await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m)
}

handler.help = ['perfil', 'perfil *@user*']
handler.tags = ['rg']
handler.command = /^(perfil|profile)$/i
handler.register = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function formatDate(n, locale = 'es-US') {
  let d = new Date(n)
  return d.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function formatHour(n, locale = 'en-US') {
  let d = new Date(n)
  return d.toLocaleString(locale, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  })
}