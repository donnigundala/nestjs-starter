import { registerAs } from "@nestjs/config";

export default registerAs('app', () => ({
    env: process.env.NODE_ENV || 'development',
    name: process.env.APP_NAME || 'NestJS Application',
    key: process.env.APP_KEY || 'base64:WoOtsoVQnpm6JQcRVLRXcw8vauGQKstC3GnfFQopKE4=',
    url: process.env.APP_URL || 'http://localhost',
    debug: process.env.APP_DEBUG || true,
    port: process.env.APP_PORT || 3000
}));
