const env = require("../.env");
const Telegraf = require("telegraf");
const bot = new Telegraf(env.token);

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
bot.on("text", (ctx, next) => {
	ctx.reply("Mid 1");
	next();
});

// Middleware do evento de texto
bot.on("text", (ctx, next) => {
	ctx.reply("Mid 2");
});

// Evento ao enviar a localização
bot.on("location", ctx => {
	const location = ctx.update.message.location;
	console.log(location);
	ctx.reply(
		`OK, você está em Lat: ${location.latitude} Long: ${location.longitude}`
	);
});

// Evento ao receber uma voz
bot.on("voice", ctx => {
	const voice = ctx.update.message.voice;
	console.log(voice);
	ctx.reply(`Audio recebido, ele possui ${voice.duration} segundos`);
});

// Evento ao enviar uma imagem
bot.on("photo", ctx => {
	const photo = ctx.update.message.photo;
	console.log(photo);
	ctx.reply(`Foto recebida.`);
});

bot.on("sticker", ctx => {
	const sticker = ctx.update.message.sticker;
	console.log(sticker);
	ctx.reply(
		`Estou vendo que você enviou o sticker ${sticker.emoji} do conjunto ${
			sticker.set_name
		}`
	);
});

bot.startPolling();
