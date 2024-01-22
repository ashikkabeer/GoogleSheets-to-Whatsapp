const {
  getAuthToken,
  getSpreadSheetValues,
} = require("./googleSheetsService.js");
const app = require("express")();
const { testGetSpreadSheetValues } = require("./test");
require("dotenv").config();
const qrcode = require("qrcode-terminal");
const {
  Client,
  GroupChat,
  LocalAuth,
  MessageMedia,
} = require("whatsapp-web.js");
const SESSION_FILE_PATH = "./session.json";
const { logging } = require("googleapis/build/src/apis/logging/index.js");
const client = new Client({
  puppeteer: {
    args: ["--no-sandbox"],
  },
  authStrategy: new LocalAuth({
    clientId: "client-one",
  }),
  puppeteer: {
    headless: false,
  },
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});
client.on("ready", () => {
  console.log("Client is ready!");
});
client.on("message", async (message) => {
  console.log(message);
});
app.post("/send-message", (req, res) => {
  const message = req.body.message;
  // use the whatsappwebjs library to send the message
});
// -------------------------
const batchSize = 10;
const totalIterations = 101; //last index in the sheets
// -------------------------
async function sendMessagesBatch(details, startIndex, endIndex) {
  const messages = [];
  for (let i = startIndex; i < endIndex; i++) {

    // write message here
    const msg = `write the message here`;

    
    const std = details[1][i].substring(1); // Assuming std is a phone number
    messages.push({ std, msg });
  }
  const sendPromises = messages.map(({ std, msg }) => {
    console.log(`Sending message to ${std}`);
    return client.sendMessage(std, msg);
  });
  await Promise.all(sendPromises);
}

client.on("message_create", async (message) => {
  if (message.body === "alert") {
    console.log("It's in the if loop \n");
    try {
      const details = await testGetSpreadSheetValues();

      for (let startIndex = 40; startIndex < 101; startIndex += batchSize) {
        const endIndex = Math.min(startIndex + batchSize, totalIterations);
        await sendMessagesBatch(details, startIndex, endIndex);
      }
    } catch (error) {
      console.error(error.message, error.stack);
    }
  }
});
client.initialize();
