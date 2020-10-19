# Telegram bot for currency exchange

A telegram bot for p2p currency exchange in node.js

## Usage

```npm i```

Create .env in root folder and fill with vars:
```
FIREBASE_DB_URL=https://my-project.firebaseio.com
TELEGRAM_API_KEY=11111111:AASAAAAAAAAAA
PORT=3000
NEWS_TELEGRAM_CHANNEL=mynewschannelname
TECH_SUPPORT_TELEGRAM_GROUP=https://t.me/joinchat/CCCCCCCCCCCCCCCC
ADMIN_GROUP_ID=-10000000000
```

Create a project on firebase with realtime database and add the config file (fb-service-account.json) to the .data folder

```npm start```
