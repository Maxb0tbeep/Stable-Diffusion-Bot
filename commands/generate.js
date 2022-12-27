const { SlashCommandBuilder } = require('discord.js');

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
        const prompt = interaction.options.getString('prompt');
        const negPrompt = interaction.options.getString('negative-prompt');
        const steps = interaction.options.getInteger('steps');
        const seed = interaction.options.getInteger('seed');

		await interaction.reply(`Prompt: ${prompt}, Negative Prompt: ${negPrompt}, Steps: ${steps}, Seed: ${seed}`);
	},
};