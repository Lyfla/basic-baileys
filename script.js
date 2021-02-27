// KALO KOPAS KASIH WM LAH >:V //
// HARGAI YANG BUAT >:V //

/**
 * This source code below is free, please DO NOT sell this in any form!
 * Source code ini gratis, jadi tolong JANGAN jual dalam bentuk apapun! 
 *
 * If you want to contributing to this source code, pull requests are always open.
 * Apabila kamu ingin berkontribusi ke source code ini, pull request selalu kami buka.
 *
 * Thanks for the contributions.
 * Terima kasih atas kontribusinya.
 */

/** 
 * BASE: MHANKBARBAR
 * RECODE: DWIRIZQI
 * SUPPORT: ZARK
*/


// Modules //
const {
    MessageType,
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { help } = require('./src/help')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson, fetchText } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const fs = require('fs-extra')
const axios = require('axios')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const fetch = require('node-fetch')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const lolis = require('lolis.life')
const loli = new lolis()
const canvas = require('canvacord')
const bent = require('bent')
const ms = require('parse-ms')
const toMs = require('ms')

// JSON FILE //
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./src/simi.json'))
const setting = JSON.parse(fs.readFileSync('./src/settings.json'))
prefix = setting.prefix
blocked = []

// RUNTIME FUNCTION //
function kyun(seconds){
    function pad(s){
      return (s < 10 ? '0' : '') + s;
    }
    var hours = Math.floor(seconds / (60*60));
    var minutes = Math.floor(seconds % (60*60) / 60);
    var seconds = Math.floor(seconds % 60);
  
    //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
    return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
  }

// START //
module.exports = yui = async (yui, message) => {
    try {
        if (!message.hasNewMessage) return
        message = message.messages.all()[0]
        if (!message.message) return
        if (message.key && message.key.remoteJid == 'status@broadcast') return
        if (message.key.fromMe) return

        global.prefix
		global.blocked

        const content = JSON.stringify(message.message)
		const from = message.key.remoteJid
		const type = Object.keys(message.message)[0]
        const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
		const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
        body = (type === 'conversation' && message.message.conversation.startsWith(prefix)) ? message.message.conversation : (type == 'imageMessage') && message.message.imageMessage.caption.startsWith(prefix) ? message.message.imageMessage.caption : (type == 'videoMessage') && message.message.videoMessage.caption.startsWith(prefix) ? message.message.videoMessage.caption : (type == 'extendedTextMessage') && message.message.extendedTextMessage.text.startsWith(prefix) ? message.message.extendedTextMessage.text : ''
		budy = (type === 'conversation') ? message.message.conversation : (type === 'extendedTextMessage') ? message.message.extendedTextMessage.text : ''
		const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
		const args = body.trim().split(/ +/).slice(1)
		const isCmd = body.startsWith(prefix)

        const botNumber = yui.user.jid
		const ownerNumber = [`6281358181668@s.whatsapp.net`] // replace this with your number
		const isGroup = from.endsWith('@g.us')
		const sender = isGroup ? message.participant : message.key.remoteJid
		const groupMetadata = isGroup ? await yui.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.jid : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender) || false
		const isWelkom = isGroup ? welkom.includes(from) : false
		const isNsfw = isGroup ? nsfw.includes(from) : false
		const isSimi = isGroup ? samih.includes(from) : false
		const isOwner = ownerNumber.includes(sender)
        const isUrl = (url) => {
            return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
        }
        const reply = (teks) => {
            yui.sendMessage(from, teks, text, {quoted:message})
        }
        const sendMess = (hehe, teks) => {
            yui.sendMessage(hehe, teks, text)
        }
        const mentions = (teks, memberr, id) => {
            (id == null || id == undefined || id == false) ? yui.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : yui.sendMessage(from, teks.trim(), extendedText, {quoted: message, contextInfo: {"mentionedJid": memberr}})
        }

        colors = ['red','white','black','blue','yellow','green']
		const isMedia = (type === 'imageMessage' || type === 'videoMessage')
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
		const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
		const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
		if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
		if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
		if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
		if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
		let authorname = yui.contacts[from] != undefined ? yui.contacts[from].vname || yui.contacts[from].notify : undefined	
		if (authorname != undefined) { } else { authorname = groupName }
        function addMetadata(packname, author) {	
            if (!packname) packname = 'WABot'; if (!author) author = 'Bot';	
            author = author.replace(/[^a-zA-Z0-9]/g, '');	
            let name = `${author}_${packname}`
            if (fs.existsSync(`./src/stickers/${name}.exif`)) return `./src/stickers/${name}.exif`
            const json = {	
                "sticker-pack-name": packname,
                "sticker-pack-publisher": author,
            }
            const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
            const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

            let len = JSON.stringify(json).length	
            let last	

            if (len > 256) {	
                len = len - 256	
                bytes.unshift(0x01)	
            } else {	
                bytes.unshift(0x00)	
            }	

            if (len < 16) {	
                last = len.toString(16)	
                last = "0" + len	
            } else {	
                last = len.toString(16)	
            }	

            const buf2 = Buffer.from(last, "hex")	
            const buf3 = Buffer.from(bytes)	
            const buf4 = Buffer.from(JSON.stringify(json))	

            const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

            fs.writeFile(`./src/stickers/${name}.exif`, buffer, (err) => {	
                return `./src/stickers/${name}.exif`	
            })	

        }
        // DEBUG //
			const util = require('util')
            const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor
            let rawText = message.message.conversation ?
            message.message.conversation :
            (type === 'imageMessage' || type === 'videoMessage')
        if (message.message.conversation.startsWith('> ')  && isOwner) {
            console.log(from, 'is trying to use the execute command')
            let type = Function
            if (/await/.test(rawText)) type = AsyncFunction
            let func = new type('print', 'yui', 'message', 'fetch', 'axios', 'ffmpeg', !/^return /.test(rawText.slice(2)) && rawText.slice(2).split('\n').length === 1 ? 'return ' + rawText.slice(2) : rawText.slice(2))
            let output
            try {
                output = func((...args) => {
                    console.log(...args)
                    reply(util.format(...args))
                }, yui, message, fetch, axios, ffmpeg, require => text134.replace(/^(async function|function|async).+\(.+?\).+{/, `case 'command':`).replace(/this\.(text|url|args)/g, (_, text) => {
                  switch (text134) {
                    case 'text': 
                        return "args.join(' ')"
                        break
                    case 'args': 
                        return "args"
                        break
                    case 'url': 
                        return "args[0]"
                        break
                    case 'prefix': 
                        return "prefix"
                        break
                    default: return _
                  }
                }).replace(/}$/, '    break'))
                console.log(output)
                reply('*Console Output*\n\n' + util.format(output))
            } catch (e) {
                reply('*Console Error*\n\n' + util.format(e))
            }
        }
        switch(command) {
            case 'nyeh':
                reply('apa')
                mentions('apasih', true)
                yui.sendMessage(from, 'Paan', text)
                break
            case 'info':
				me = yui.user
				uptime = process.uptime()
				teks = `*Nama bot* : ${me.name}\n*Nomor Bot* : @${me.jid.split('@')[0]}\n*Prefix* : ${prefix}\n*Total Block Contact* : ${blocked.length}\n*The bot is active on* : ${kyun(uptime)}`
				buffer = await getBuffer(me.imgUrl)
				yui.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
				break				
            case 'stiker':
			case 'sticker':
				if ((isMedia && !message.message.videoMessage || isQuotedImage) && args.length == 0) {
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(message).replace('quotedM','m')).message.extendedTextMessage.contextInfo : message
					const media = await yui.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.webp')
					await ffmpeg(`./${media}`)
						.input(media)
						.on('start', function (cmd) {
							console.log(`Started : ${cmd}`)
						})
						.on('error', function (err) {
							console.log(`Error : ${err}`)
							fs.unlinkSync(media)
							reply(mess.error.stick)
						})
						.on('end', function () {
							console.log('Finish')
							exec(`webpmux -set exif ${addMetadata('BOT', authorname)} ${ran} -o ${ran}`, async (error) => {
								if (error) return reply(mess.error.stick)
								yui.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: message})
								fs.unlinkSync(media)	
								fs.unlinkSync(ran)	
							})
							/*yui.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: message})
							fs.unlinkSync(media)
							fs.unlinkSync(ran)*/
						})
						.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
						.toFormat('webp')
						.save(ran)
				} else if ((isMedia && message.message.videoMessage.seconds < 11 || isQuotedVideo && message.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
					const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(message).replace('quotedM','m')).message.extendedTextMessage.contextInfo : message
					const media = await yui.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.webp')
					reply(mess.wait)
					await ffmpeg(`./${media}`)
						.inputFormat(media.split('.')[1])
						.on('start', function (cmd) {
							console.log(`Started : ${cmd}`)
						})
						.on('error', function (err) {
							console.log(`Error : ${err}`)
							fs.unlinkSync(media)
							tipe = media.endsWith('.mp4') ? 'video' : 'gif'
							reply(`❌ Gagal, pada saat mengkonversi ${tipe} ke stiker`)
						})
						.on('end', function () {
							console.log('Finish')
							exec(`webpmux -set exif ${addMetadata('BOT', authorname)} ${ran} -o ${ran}`, async (error) => {
								if (error) return reply(mess.error.stick)
								yui.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: message})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							/*yui.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: message})
							fs.unlinkSync(media)
							fs.unlinkSync(ran)*/
						})
						.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
						.toFormat('webp')
						.save(ran)
				} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(message).replace('quotedM','m')).message.extendedTextMessage.contextInfo : message
					const media = await yui.downloadAndSaveMediaMessage(encmedia)
					ranw = getRandom('.webp')
					ranp = getRandom('.png')
					reply(mess.wait)
					keyrmbg = 'Your-ApiKey'
					await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg, size: 'auto', type: 'auto', ranp}).then(res => {
						fs.unlinkSync(media)
						let buffer = Buffer.from(res.base64img, 'base64')
						fs.writeFileSync(ranp, buffer, (err) => {
							if (err) return reply('Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi.')
						})
						exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
							fs.unlinkSync(ranp)
							if (err) return reply(mess.error.stick)
							exec(`webpmux -set exif ${addMetadata('BOT', authorname)} ${ranw} -o ${ranw}`, async (error) => {
								if (error) return reply(mess.error.stick)
								yui.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: message})
								fs.unlinkSync(ranw)
							})
							//yui.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: message})
						})
					})
				/*} else if ((isMedia || isQuotedImage) && colors.includes(args[0])) {
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(message).replace('quotedM','m')).message.extendedTextMessage.contextInfo : message
					const media = await yui.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.webp')
					await ffmpeg(`./${media}`)
						.on('start', function (cmd) {
							console.log('Started :', cmd)
						})
						.on('error', function (err) {
							fs.unlinkSync(media)
							console.log('Error :', err)
						})
						.on('end', function () {
							console.log('Finish')
							fs.unlinkSync(media)
							yui.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: message})
							fs.unlinkSync(ran)
						})
						.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=${args[0]}@0.0, split [a][b]; [a] palettegen=reserve_transparent=off; [b][p] paletteuse`])
						.toFormat('webp')
						.save(ran)*/
				} else {
					reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
				}
				break
        
            default:
                if (isGroup && isSimi && budy != undefined) {
                    console.log(budy)
                    muehe = await simih(budy)
                    console.log(muehe)
                    reply(muehe)
                } else if (isCmd) {
                    return console.log(color('[WARN]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
                }
            }
    } catch (e) {
        console.error('Error : %s', color(e, 'red'))
    }
}
