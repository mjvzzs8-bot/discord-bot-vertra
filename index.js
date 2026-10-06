const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responde com Pong!"),

  new SlashCommandBuilder()
    .setName("teste")
    .setDescription("Comando de teste do bot")
].map(command => command.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands }
    );

    console.log("Comandos /ping e /teste registrados.");
  } catch (error) {
    console.error("Erro ao registrar comandos:", error);
  }
})();

client.once("ready", () => {
  console.log(`Bot online como ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("🏓 Pong!");
  }

  if (interaction.commandName === "teste") {
    await interaction.reply("✅ Funcionou! O novo comando está funcionando.");
  }
});

client.login(token);
