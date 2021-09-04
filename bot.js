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

const publish = new SlashCommandBuilder()
    .setName("publish")
    .setDescription("Opublikuj partnerstwo")
    .addStringOption(option => (
            option.setName("server_data").setDescription("Data o serwerze").setRequired(true)
        )
    )
const commands = [
    ping,
    partnership,
    docs,
    publish
]

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
    if (interaction.commandName === "publish") {
        if (interaction.options.getString("server_data")) {
            const partnershipModerators = ["682572949219180547", "304979757852917762", "817883855310684180"]
            if (partnershipModerators.hasOwnProperty(interaction.user.id)) return interaction.reply({content: "Ne możesz użyć tej komendy!"})

            const partnership = interaction.options.getString("server_data")

            const embed3 = new MessageEmbed()
                .setDescription(`**Nowe partnerstwo**\n\n${partnership}`)
                .setFooter(`Wywołane przez: ${interaction.user.tag}`)
                .setTimestamp()
                .setColor("GREEN")
            client.channels.cache.get("883727373500031088").send({
                embeds: [embed3]
            })
            interaction.reply({content: "Opublikowano partnerstwo."})
        }
    }
});

client.on("ready", () => {
    console.log("Ready")
    client.user.setPresence({ activities: [{ name: "Gotowy do otrzymywania wniosków!" }] });
})
client.login(token)