const Discord = require("discord.js");
const client = new Discord.Client();

const generator = require("generate-password");
const config = require("./config.js");

client.login(process.env.TOKEN);

const anim = require("chalk-animation");
client.on("ready", () => {
    console.log('Le bot est online!')
    client.user.setActivity(config.status, {
        type: "STREAMING",
        url: "https://www.twitch.tv/ninja"
    });
});

const getFake = () => {
    let fakeString = generator.generate({ length: 16, numbers: true });
    return `https://discord.gift/${fakeString}`;
};

client.on("message", (message) => {

    if(message.author.bot || !message.guild) return;

    if(message.channel.id === config.genClassic){
        message.delete(1);
        if(!message.content.startsWith(`${config.prefix}classic`)) return message.delete();
        message.author.createDM().then((channel) => channel.send(getFake()));
        return message.channel.send({ embed: { author: { name: "🚀 Regarde tes MPs! Ta reçu un Nitro Classic" }, color: 0x7289DA }})
        .then(msg => {
            msg.delete(5000)
          })
    } else if(message.content.startsWith(`${config.prefix}classic`)){
        return message.channel.send(`Tu es pas dans le bon salon. Vas dans <#${config.genClassic}>!`)
        .then(msg => {
            msg.delete(5000)
          })
    }

    if(message.channel.id === config.genGames){
        message.delete(1);
        if(!message.content.startsWith(`${config.prefix}games`)) return message.delete();
        message.author.createDM().then((channel) => channel.send(getFake()));
        return message.channel.send({ embed: { author: { name: "🚀 Regarde tes MPs! Ta reçu un Nitro Games" }, color: 0x7289DA }})
        .then(msg => {
            msg.delete(5000)
          })
    } else if(message.content.startsWith(`${config.prefix}games`)){
        return message.channel.send(`Tu es pas dans le bon salon. Vas dans <#${config.genGames}>!`)
        .then(msg => {
            msg.delete(5000)
          })
    }

});
