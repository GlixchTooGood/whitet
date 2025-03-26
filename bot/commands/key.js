const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageFlags } = require("discord.js");
const db = require("../../middlewares/db");
const path = require("path");
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const crypto = require('crypto');

const Keys = db.getKeys();

// Function to generate a random base64 string
function generateRandomBase64String(length) {
    const randomBytes = crypto.randomBytes(length);
    return randomBytes.toString('base64');
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getkey')
        .setDescription('Gets your access key for whitet'),
    async execute(interaction) {
        const randomB64 = generateRandomBase64String(36);
        const user = interaction.user;
        console.log(`Command sent by: ${user.username} (ID: ${user.id})`);
        const key = await Keys.findOne({discordId:user.id});
        if (!key) {
            await Keys.create({
                discordId: user.id,
                token: randomB64
            });
            await interaction.reply({
                content: `Here's your token, \`\`\`${randomB64}\`\`\` welcome to Whitet.`,
                flags: MessageFlags.Ephemeral
            });
        } else {
            await interaction.reply({
                content: `You already have a token, please login or register. The token being, \`${key.token}\`. If something isn't right, contact SOUNDGOD.`,
                flags: MessageFlags.Ephemeral
            });
        }
    },
};
