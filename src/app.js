const env = require("../.env");
const Telegraf = require("telegraf");
const bot = new Telegraf(env.token);

const axios = require("axios");

// Evento /start do bot
bot.start(ctx => {
	const from = ctx.update.message.from;
	const id = ctx.update.message.from.id;

	console.log(ctx.update);
	if (from.id === id) {
		ctx.reply(`Seja bem vindo Mestre !`);
	} else {
		ctx.reply(`Seja bem vindo, ${from.first_name} !`);
	}
});

// Evento ao digitar algum texto
/*
bot.on("text", async (ctx, next) => {
	ctx.reply("Novo 👍");
	await ctx.replyWithPhoto({
		url: "https://steembottracker.com/img/bot_logo.png"
	});
	 await ctx.replyWithLocation(29.973008, 31.1303068);
	 await ctx.replyWithVideo("http://files.cod3r.com.br/cod3r.mp4");
	next();
});
*/

// Middleware do evento de texto

/*
bot.on("text", (ctx, next) => {
	ctx.reply("Mid 2");
	next();
});
*/

// Evento ao receber a localização
bot.on("location", ctx => {
	const location = ctx.update.message.location;
	console.log(location);
	ctx.reply(
		`OK, você está em Lat: ${location.latitude} Long: ${location.longitude}`
	);
});

// Evento ao receber uma imagem
bot.on("photo", ctx => {
	const photo = ctx.update.message.photo;
	console.log(photo);
	ctx.reply(`Foto recebida.`);
});

// Evento que envia um Sticker ao receber uma mensagem
bot.on("sticker", ctx => {
	const sticker = ctx.update.message.sticker;
	console.log(sticker);
	ctx.reply(
		`Estou vendo que você enviou o sticker ${sticker.emoji} do conjunto ${
			sticker.set_name
		}`
	);
});

// Evento ao receber um audio
bot.on("voice", async ctx => {
	const id = ctx.update.message.voice.file_id;
	const res = await axios.get(`${env.apiUrl}/getFile?file_id=${id}`);
	const voice = ctx.update.message.voice;
	console.log(voice);
	ctx.reply(`Audio recebido, ele possui ${voice.duration} segundos`);
	ctx.replyWithVoice({ url: `${env.apiFileUrl}/${res.data.result.file_path}` });
});

// Evento de captura de algum texto especifico
bot.hears("pizza", ctx => ctx.reply("Quero!"));
bot.hears(["figado", "chuchu"], ctx => ctx.reply("Passo :)"));
bot.hears(/burger/, ctx => ctx.reply("Quero!"));
bot.hears(/(\d{2}\/\d{2}\/\d{4})/, ctx =>
	ctx.reply(`Você digitou : ${ctx.match[1]}`)
);

bot.startPolling();
