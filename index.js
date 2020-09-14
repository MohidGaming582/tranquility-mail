
//const stuff

const Discord = require("discord.js")
const client = new Discord.Client()
const { PREFIX } = require('./config.json')
const moment = require('moment')

require("dotenv").config();
const fs = require("fs");
const Enmap = require("enmap");

client.config = {
  token: process.env.DISCORD_TOKEN,
  prefix: process.env.DISCORD_PREFIX,
  api: process.env.GOOGLE_API,
};
client.commands = new Enmap();
client.queue = new Map();

client.once("ready", () =>
  console.log("Ready, Logged in as " + client.user.tag)
);

fs.readdir(__dirname + "/commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("Loading Command: "+commandName)
  });
});

client.on("message", (message) => {
  if (!message.content.startsWith(client.config.prefix) || message.author.bot)
    return;
  const args = message.content.slice(client.config.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);
  if (!command) return;

  command.run(client, message, args);
});

//const stuff

//startup message

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`); ////Select your own log for console

    setInterval(() => {
        const statuses = [
          '"d!" Prefix',
          'd!help',
          'Prefix is "d!" | d!help'
        ] ////If you want add other, put a ","

        const status = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setActivity(status, { type: "PLAYING" }) //// Select the type of status, PLAYING, WATCHING, etc.
    }, 5000) ///Set any time
    
});

//startup message

//help

client.on('message', async message => {
    if(message.content.startsWith('d!help')) {
    let embed = new Discord.MessageEmbed()
    .setAuthor("Disong")
    .setTitle("Commands")
    .addField("Play", "d!play <songName>")
    .addField("Stop", "d!stop")
    .addField("Check Queue", "d!queue")
    .addField("Pause", "d!pause")
    .addField("Resume", "d!resume")
    .addField("Skip", "d!skip")
    .addField("Volume", "d!volume <number>")
    .addField("Now Playing", "d!np")
    .setDescription("Note: To add song to queue, write d!play <songName> again so it can be added in queue")
    .setFooter("Created By MohidGaming582ᴰᵐ ᶠᵒʳ ᴬᵈˢ#9394")
    .setTimestamp()
    message.channel.send(embed)
    }
})

client.login(process.env.token);