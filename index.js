const { Client, GatewayIntentBits, Partials } = require('discord.js');
require("dotenv").config()

const generateImage = require("./generateImage")

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
    ],
    partials: [Partials.Channel]
});

const welcomeChannelId = "1131380261158912141"; // Replace with your actual channel ID

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
    if (message.content == "hi"){
        message.reply("Hello World!!!!!")
    }
})

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member, member.guild);
    const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);
    if (welcomeChannel) {
        welcomeChannel.send({
            content: `Welcome <@${member.id}> to Dyl's Den!`,
            files: [img],
        });
    } else {
        console.error(`Welcome channel with ID ${welcomeChannelId} not found.`);
    }
});

client.login(process.env.TOKEN);
