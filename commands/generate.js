const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('generate')
		.setDescription('Generate with Stable Diffusion')
        .addStringOption(prompt =>
            prompt.setName('prompt')
            .setDescription('The prompt to generate with')
            .setRequired(true))
        .addIntegerOption(steps =>
            steps.setName('steps')
                .setDescription('How many sampling steps to generate with (more = longer generation time)')
                .setRequired(true)
                .addChoices(
                        { name: '5 steps', value: 5 },
                        { name: "10 steps", value: 10 },
                        { name: '20 steps', value: 20 },
                        { name: '35 steps', value: 35 },
                        { name: '50 steps', value: 50 },
                        ))
        .addStringOption(negPrompt =>
            negPrompt.setName('negative-prompt')
                .setDescription('The negative prompt to (not) generate with')
                .setRequired(false))
        .addIntegerOption(seed =>
            seed.setName('seed')
                .setDescription('The Seed to generate of off')
                .setRequired(false)),
	async execute(interaction) {
        var prompt = interaction.options.getString('prompt');
        var negPrompt = interaction.options.getString('negative-prompt');
        var steps = interaction.options.getInteger('steps');
        var seed = interaction.options.getInteger('seed');

        if(negPrompt == null){
            negPrompt = "none"
        }
        if(seed == null){
            seed = Math.floor(Math.random() * (9223372036854775807 - 1) + 1);
        }

        const exampleEmbed = new EmbedBuilder()
            .setTitle('Stable Diffusion')
            .setURL('https://github.com/Maxb0tbeep/Stable-Diffusion-Bot')
            .setDescription(`Prompt: ${prompt}, Negative Prompt: ${negPrompt}, Steps: ${steps}, Seed: ${seed}`)
            .setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()


        await interaction.reply({ embeds: [exampleEmbed] });

    },
};