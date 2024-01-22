const app = require('express')()
const {testGetSpreadSheetValues} = require('./test')
require('dotenv').config()
const qrcode = require('qrcode-terminal');
const { Client, GroupChat, LocalAuth, MessageMedia} = require('whatsapp-web.js');
const SESSION_FILE_PATH = './session.json';

const client = new Client({
  session: sessionData, // Your session data object from the previous authentication
  puppeteer: {
    headless: true,
    args: ['--no-sandbox'],
  },
  
  authTimeout: 30000,
  restartOnAuthFail: true,
  phone: '9645209798', // The phone number you want to use to send messages
});
client.on('authenticated', (session) => {
  fs.writeFile('./session.json', JSON.stringify(session), (err) => {
    if (err) console.error(err);
  });
})

app.post("/send-message", (req, res) => {
  const message = req.body.message;
  testGetSpreadSheetValues()
  .then(async (details) => {
    for (let i = 0; i < 101; i++) {
      std = details[1][i];
      console.log(details[0][i]);
      client.sendMessage(std.substring(1), message);
    }
  });
  res.status(200).json({ message: "Message sent successfully" });
});
client.on('ready', () => {
    console.log('Client is ready!');
  });
app.listen(3000,()=>{
      client.initialize();
})
