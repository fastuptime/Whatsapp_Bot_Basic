const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const client = new Client({
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Sistem Aktif!");
});

client.on("message", (message) => {
  const msg = message.body.toLocaleLowerCase();
  if (msg.startsWith(".test")) {
    message.reply("Test");
  }
});

client.initialize();
