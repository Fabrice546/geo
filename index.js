const { MessageEmbed, Client } = require("discord.js");
const client = new Client();
const prefix = variables.prefix;
const { get } = require('axios');


const variables = require(`./variables/variables.json`);


client.on('ready', function() {
	console.log("Prêt à être utiliser à 100%.")
	
});

client.on('message', async function(message) {
	////////-------////////
	//--A NE PAS TOUCHER-//
	////////-------////////
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;
	////////////////////
	////////////////////
	if (!message.content.startsWith(prefix)) return;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	if(message.content.startsWith(prefix + "help")){
		message.delete(message.author);
		let embed_hhwid = new MessageEmbed()
			.setColor('random')
			.setTitle(`Bot IP Geo`)
			.setImage("https://media.discordapp.net/attachments/755487927588618274/756826026557964328/bannergif.gif")
			.setDescription(`${prefix}geo **ajouter une ipv4 ou ipv6**
			Documentation: [clic ici](https://ipgeolocation.io/documentation/ip-geolocation-api.html)`)
			.setTimestamp()
			.setFooter(`Demander par ${message.author.tag}`)
		message.channel.send(embed_hhwid);
	}
//////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////COMMANDE USER//////////////////////
///////////////////////////////////////////////////


if(message.content.startsWith(prefix + "geo")){
	message.delete(message.author);
	
	let content = message.content.split(" ");
	let args = content.slice(1);
	const ip = args.join(" ");
	if(!ip) {
		return message.reply("Veuillez entrez une IP ou un nom de site !");
	}
	get(`${variables.link}${variables.apikey}${variables.ipgeo}${ip}${variables.lang}${variables.language}`, {
		headers: {
			'Content-Type': "application/json",
		}
	}).then( (res) => {
		//-----------------------------//
		//           STATS             //
		//-----------------------------//
		try {
			//console.log(res.data)
			if(`${res.data.message}` == "Provided API key is not valid. Contact technical support for assistance at support@ipgeolocation.io")
			{
				let Estats = new MessageEmbed()
				.setColor(0x36393F)
				.setTitle(`Erreur de la demande`)
				.setDescription(`Merci de vérifier si votre API key est valide !`)
				.setTimestamp()
				.setFooter(`Demander par ${message.author.tag}`)
				message.channel.send({embed: Estats});
			}
			else
			if(`${res.data.message}` == "IP to geolocation lookup for domain or service name is not supported on your free subscription. This feature is available to all paid subscriptions only.")
			{
				let Estats = new MessageEmbed()
				.setColor(0x36393F)
				.setTitle(`Abonnement non valide`)
				.setDescription(`La recherche d'IP vers la géolocalisation pour le nom de domaine ou de service n'est pas prise en charge par votre abonnement gratuit. Cette fonctionnalité est disponible uniquement pour tous les abonnements payants.`)
				.setTimestamp()
				.setFooter(`Demander par ${message.author.tag}`)
				message.channel.send({embed: Estats});
			}
			else
			if(`${res.data.ip}` == `${ip}`)
			{
				let Istats = new MessageEmbed()
				.setColor(0x36393F)
				.setTitle(`Information Geo ${ip}`)
				.setImage(`${res.data.country_flag}`)
				.setDescription(`
				\r\n**INFORMATION LOCALISATION**
				\n**Ville:** ${res.data.city}
				\n**Département:** ${res.data.district}
				\n**Province:** ${res.data.state_prov}
				\n**Capital:** ${res.data.country_capital}
				\n**Pays:** ${res.data.country_name}
				\n**Continent:** ${res.data.continent_name}
				\n**Code Postal:** ${res.data.zipcode}
				\n**Latitude:** ${res.data.latitude}
				\n**Longitude:** ${res.data.longitude}
				\n
				**INFORMATION OPERATEUR**
				\r**Opérateur:** ${res.data.isp}
				\n
				\n**INFORMATION PAYS**
				\n**Numéro Code:** ${res.data.calling_code}
				\n**Langage:** ${res.data.languages}
				\n**Monnaie:** ${res.data.currency.code} - ${res.data.currency.name} - ${res.data.currency.symbol}
				\n**Horaire:** ${res.data.time_zone.current_time}
				
				`)
				
				.setTimestamp()
				.setFooter(`Demander par ${message.author.tag}`)
			message.channel.send({embed: Istats});
			}
		
		}catch(error)  {
			//console.log(res.data)
			let Estats = new MessageEmbed()
				.setColor(0x36393F)
				.setTitle(`Erreur system`)
				.setDescription(`Une erreur inconnu est survenu...`)
				.setTimestamp()
				.setFooter(`Demander par ${message.author.tag}`)
				message.channel.send({embed: Estats});
		
			}
	}).catch ((error) => {
		return message.channel.send(`:x: Utilisateur n'a pas trouvé.`);
	})
}

//////////////////////////////////////////////


})//

client.login(variables.token);