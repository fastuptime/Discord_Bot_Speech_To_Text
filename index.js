const Transcriber = require("discord-speech-to-text");
const { Client } = require("discord.js");
const {
    joinVoiceChannel
} = require("@discordjs/voice");
const transcriber = new Transcriber("WİT.Aİ TOKEN");
const client = new Client({ intents: 129 });
const colors = require("colors");
const moment = require("moment");

client.on("ready", () => {
    console.log(`----------------GITHUB.COM/FASTUPTIME----------------\nHer hangi bir bot yaptırmak isterseniz sitemiz,\nhttps://fastuptime.com/ adresinden bize ulaşabilirsiniz.\nGiriş Yapılan Botun İsmi: ${client.user.tag}\n----------------GITHUB.COM/FASTUPTIME----------------`.green);
});

client.on("ready", async () => {
    const channel = client.channels.cache.get("1093565422181294225"); // Kanal ID
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
        selfDeaf: false,
        selfMute: false
    });

    connection.receiver.speaking.on("start", (userId) => {
        transcriber.listen(connection.receiver, userId, client.users.cache.get(userId)).then((data) => {
            if (!data.transcript.text) return;
            console.log(`[${moment().format("HH:mm:ss")}] ${data.user.username}: ${data.transcript.text}`.yellow);
        });
    });

});


client.login("TOKEN");