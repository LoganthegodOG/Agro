const botsettings = require("./botsettings.json");
const Discord = require("discord.js");
const prefix = botsettings.prefix;

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
	console.log('Bot is ready! '+ bot.user.username);


});

bot.on("message", async message =>{
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;

	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);

	if(!command.startsWith(prefix)) return;

	if(command === `${prefix}userinfo`) {
		let embed = new Discord.RichEmbed()
			.setAuthor(message.author.username)
			.setDescription("This is the user's info!")
			.setColor("#9e346f")
			.addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
			

			message.channel.sendEmbed(embed);

			return;

	}

	if(command === `${prefix}mute`) {
		if(message.memeber.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have the permissions to manage messages");
		
		let toMute = message.mentions.users.first() || message.guild.members.get(args[0]);
		if(!toMute) return message.channel.sendMessage("You did not specify a user mention or ID!");

		return message.reply(toMute.username || toMute.user.username);


	}
	
});

bot.login(botsettings.token);