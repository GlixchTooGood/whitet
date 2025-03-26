const { Client, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const fs = require('fs');
const deploy = require("./deploy.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
function runBot() {
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
  }
  require("./deploy.js");
  client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    try {
      await client.user.setPresence({ activities: [{ name: "Whitet", type: "PLAYING" }], status: 'online' });
      console.log(`Status set to name: "Whitet",type: "PLAYING"`);
    } catch (error) {
      console.log(`Error: ${error}`);
      console.log("Status not set");
    }
  });

  client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  });

  client.login(process.env.botToken);
}
module.exports = { runBot };