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
    .addStringOption(option => (
            option.setName("data").setDescription("Dane o serwerze (link z zaproszeniem, nazwa, liczba członków bez botów)").setRequired(true)
    )
)
const docs = new SlashCommandBuilder()
    .setName("howto")
    .setDescription("Jak złożyć wniosek?")

const commands = [ping, partnership, docs]

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
        if (interaction.options.getString("data")) {
            const toRealize = interaction.options.getString("data")

            client.channels.cache.get("883479817914294282").send(toRealize)

            const embed = new MessageEmbed()
                .setDescription("**Wysłano wniosek**\n\nWysłano wniosek pomyślnie do administracji!")
                .setColor("GREEN")
            interaction.reply({embeds: [embed]})
        }
    }
    if (interaction.commandName === "howto") {
        interaction.reply({content: "Poczytaj o tym tutaj => https://docs.krivebot.xyz/partnership/"})
    }
});

client.on("ready", () => {
    console.log("Ready")
    client.user.setPresence({ activities: [{ name: "Gotowy do otrzymywania wniosków!" }] });
})
client.login(token)