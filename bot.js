const Discord = require("discord.js")
const { token } = require("./config.json")
const { Client, Intents } = require("discord.js")
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { MessageEmbed } = require("discord.js")
const { SlashCommandBuilder } = require('@discordjs/builders');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const ping = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping bota")

const partnership = new SlashCommandBuilder()
    .setName("partnership")
    .setDescription("Wyślij wniosek o partnerstwo")

    partnership.addStringOption(option =>
        option.setName("link").setDescription("zaproszenie do serwera").setRequired(true)
    )
const commands = [ping, partnership]

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

    if (interaction.commandName === "ping") {
        interaction.reply({content: `Ping: \`${client.ws.ping}\``})
    }
    if (interaction.commandName === "partnership") {
        if (interaction.options.getSubcommand() === "link") {
            const test = interaction.options.getString("test2")

            if (test) {
               await interaction.reply({content: "działa"})
            }

        }
    }
});

client.on("ready", () => {
    console.log("Ready")
})
client.login(token)