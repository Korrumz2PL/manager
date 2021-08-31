const Discord = require("discord.js")
const { token } = require("./config.json")
const { Client, Intents } = require("discord.js")
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { MessageEmbed } = require("discord.js")
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const commands = [{
    name: "ping",
    description: "Ping bota"
}];

const clientId = "864950117869944853"
const guildId = "804477558061137972"

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Loading (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Loaded (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply(`\`${client.ws.ping}ms\``);
    }
});

client.on("ready", () => {
    console.log("Ready")
})
client.login(token)