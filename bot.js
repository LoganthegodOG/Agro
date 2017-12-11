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
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You dont have the permission to do so!");
			
		
		let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
		if(!toMute) return message.channel.sendMessage("You did not specify a user mention or ID!");

		let role = message.guild.roles.find(r => r.name === "Agro Muted");
		if(!role) {

		}
		try{
		role = await message.guild.createRole({
		name: "Agro Muted",
		color: "##9e346f"

		});

			message.guild.channels.forEach(async (channel,id) => {
				await channel.overwritePermissions(role, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false

				});
			});
		}	catch(e){
			console.log(e.stack);
			}
		
		if(toMute.roles.has(role.id)) return message.channel.sendMessage("This user already is muted");

		await toMute.addRole(role);
		message.channel.sendMessage("That User Has Been Muted");

		return;

	}
	if(command === `${prefix}unmute`) {
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You dont have the permission to do so!");
			
		
		let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
		if(!toMute) return message.channel.sendMessage("You did not specify a user mention or ID!");

		let role = message.guild.roles.find(r => r.name === "Agro Muted");
		
	
		if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("This user is not muted");

		await toMute.removeRole(role);
		message.channel.sendMessage("That User Has Been Unmuted");

		return;

	}
	
});

bot.login(botsettings.token);