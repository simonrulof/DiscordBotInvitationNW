const { Client, DiscordAPIError, MessageCollector, Message } = require('discord.js')
const config = require('./config.json')
const client = new Client({
    partials: ['GUILD_MEMBER', 'CHANNEL', 'USER', 'REACTION']
})

client.on('ready', () => {
    console.log('Le bot est connecté !')
    
})

client.on('message', (message) =>{
    if (message.content.match(/(\w+)/g).length > 3){
        const mots = message.content.split(' ')
        if (message.content.startsWith('creerdonjon')){
            message.channel.send("Donjon - " + mots[1] + " - " + mots[2] + " - 21h30 - lvl " + mots[3] + "+ -\n🛡️ Tank -\n🏥 Heal -\n⚔️ Dps -")
            .catch(console.error)
            message.delete()
        }
        if (message.content.startsWith('Donjon - ')){
            message.react('🛡️')
            message.react('🏥')
            message.react('⚔️')
        }
        message.awaitReactions()
    }
    if (message.content == ('actualise')){
        message.channel.messages.fetch()
        message.channel.send("actualisé")
    }
})


client.on('messageReactionAdd', (reaction_orig, user) => {
    if (!(reaction_orig.message.author.id === user.id)) {
        const test = reaction_orig.message.content
        const name = user
        const words = test.split('-')
        if (reaction_orig.emoji.name === '🛡️'){
            reaction_orig.message.edit(words[0]+ '-' + words[1]+ '-' + words[2]+ '-' + words[3]+ '-' + words[4]+ '-' + words[5] + '<' +'@' + name.id + '>' + ' -' + words[6]+ '-' + words[7]+ '-')
        }
        if (reaction_orig.emoji.name === '🏥'){
            reaction_orig.message.edit(words[0]+ '-' + words[1]+ '-' + words[2]+ '-' + words[3]+ '-' + words[4]+ '-' + words[5] + '-' + words[6] + '<' +'@' + name.id + '>' + ' -' + words[7]+ '-')
        }
        if (reaction_orig.emoji.name === '⚔️'){
            reaction_orig.message.edit(words[0]+ '-' + words[1]+ '-' + words[2]+ '-' + words[3]+ '-' + words[4]+ '-' + words[5] + '-' + words[6] + '-' + words[7] + '<' +'@' + name.id + '>' + ' -')
        }
    }
})

client.on('messageReactionRemove', (reaction_orig, user) =>{
    if (!(reaction_orig.message.author.id === user.id)) {
        const words = reaction_orig.message.content.split('-')
        if (reaction_orig.emoji.name === '🛡️'){
            const joueurs = words[5].split(' ')
            var i = 0;
            while (!(joueurs[i] === ('<@' + user.id + '>'))){
                i++;
            }
            const test = words[5].split(joueurs[i])
            reaction_orig.message.edit(words[0]+ '-' + words[1]+ '-' + words[2]+ '-' + words[3]+ '-' + words[4]+ '-' + test[0] + test[1] + '-' + words[6]+ '-' + words[7]+ '-')
        }
        if (reaction_orig.emoji.name === '🏥'){
            const joueurs = words[6].split(' ')
            var i = 0;
            while (!(joueurs[i] === ('<@' + user.id + '>'))){
                i++;
            }
            const test = words[6].split(joueurs[i])
            reaction_orig.message.edit(words[0]+ '-' + words[1]+ '-' + words[2]+ '-' + words[3]+ '-' + words[4]+ '-' + words[5] + '-' + test[0] + test[1] + '-' + words[7]+ '-')
        }
        if (reaction_orig.emoji.name === '⚔️'){
            const joueurs = words[7].split(' ')
            var i = 0;
            while (!(joueurs[i] === ('<@' + user.id + '>'))){
                i++;
            }
            const test = words[7].split(joueurs[i])
            reaction_orig.message.edit(words[0]+ '-' + words[1]+ '-' + words[2]+ '-' + words[3]+ '-' + words[4]+ '-' + words[5] + '-' + words[6] + '-' + test[0] + test[1] + '-')
        }
    }
})

client.login(process.env.TOKEN)
