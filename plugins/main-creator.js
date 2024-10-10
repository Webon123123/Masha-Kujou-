let handler = async (m, { conn, usedPrefix, isOwner }) => {
    // Wait
    const loadingMessage = `
    ⏳✨ Cargando... ✨⏳
    ╔══════════════════════════╗
    ║  🌟 Por favor espera... 🌟  ║
    ╚══════════════════════════╝
    `;
   
  
    await conn.sendMessage(m.chat, { text: loadingMessage }, { quoted: m });

 
    let vcard = `BEGIN:VCARD
VERSION:3.0
N:;Masha Kujou;;;
FN:Masha Kujou
ORG:Masha Kujou
TITLE:Desarrolladora
item1.TEL;waid=595976230899:5218261000681
item1.X-ABLabel:Masha Kujou
X-WA-BIZ-DESCRIPTION:Desarrolladora de bots y más.
X-WA-BIZ-NAME:Masha Kujou
END:VCARD`;

    // Send
    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: 'Masha Kujou Developer',
            contacts: [{ vcard }]
        }
    }, { quoted: m });
};

handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño', 'mashakujou', 'masha-kujou', 'kujousama'];

export default handler;