import Mailjet from "node-mailjet";

const apiKey = process.env.MAILJET_API_KEY;
const secretKey = process.env.MAILJET_SECRET_KEY;

if (!apiKey || !secretKey) {
  throw new Error('Mailjet API_KEY and SECRET_KEY must be defined');
}

const mailjet = Mailjet.apiConnect(apiKey, secretKey);

export default mailjet