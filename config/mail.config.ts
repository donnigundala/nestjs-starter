import { registerAs } from "@nestjs/config";

export default registerAs('mail', () => ({
  driver: process.env.MAIL_DRIVER || 'smtp',
  host: process.env.MAIL_HOST || 'smtp.mailtrap.io',
  port: process.env.MAIL_PORT || 2525,
  username: process.env.MAIL_USERNAME || null,
  password: process.env.MAIL_PASSWORD || null,
  encryption: process.env.MAIL_ENCRYPTION || null
}));
