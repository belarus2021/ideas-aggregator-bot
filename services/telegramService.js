import Telegraf, {Telegram} from 'telegraf';
import Stage from "telegraf/stage";
import LocalSession from "telegraf-session-local";
import {goHome} from '../helpers/telegramHelper';
import {
  offerWizard,
  matchingWizard,
  welcomeWizard,
  chooseCityWizard,
  mainMenuMiddleware,
} from "../helpers/wizardHelper"

const {SERVER_URL, TELEGRAM_API_KEY} = process.env;

const isPolling = !SERVER_URL;

export const bot = new Telegraf(TELEGRAM_API_KEY,{
  telegram: { webhookReply: isPolling }
});
export const telegram = new Telegram(TELEGRAM_API_KEY); // required for initiating a conversation

export function botInit(expressApp) {
  if (!isPolling) {
    console.log('SERVER_URL',SERVER_URL)
    bot.telegram.setWebhook(`${SERVER_URL}/bot${TELEGRAM_API_KEY}`).catch(e => console.warn('telegram.setWebhook err', e));
    expressApp.use(bot.webhookCallback(`/bot${TELEGRAM_API_KEY}`));
  }
  // Scene registration
  bot.use((new LocalSession({database: '.data/telegraf_db.json'})).middleware())
  // bot.use(session());
  const stage = new Stage([offerWizard, matchingWizard, welcomeWizard, chooseCityWizard]);
  stage.use(mainMenuMiddleware);
  bot.use(stage.middleware());

  bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
  })

  bot.start(async ctx => {
    goHome(ctx);
  });
  bot.action("back", async ctx => {
    goHome(ctx).catch(e => {
      console.warn('back enter err', e)
    });
  });

  bot.on("callback_query", ctx => {
    goHome(ctx)
  })

  // bot.help(ctx => ctx.reply("Send me a sticker"));
  bot.on("sticker", ctx => ctx.reply("👍"));
  bot.hears("hi", ctx => ctx.reply("Hey there"));
  /*
   your bot commands and all the other stuff on here ....
  */
  if (isPolling) {
    bot.launch();
  }
  // bot.telegram.setWebhook(`${HEROKU_URL}${TELEGRAM_API_KEY}`)
  // // Http webhook, for nginx/heroku users.
  // bot.startWebhook(`/${TELEGRAM_API_KEY}`, null, PORT)
}
