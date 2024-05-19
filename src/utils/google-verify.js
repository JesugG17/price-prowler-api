import { OAuth2Client } from 'google-auth-library';
import { ENV } from '../config/env.js';

const client = new OAuth2Client(ENV.GOOGLE_CLIENT_ID, ENV.GOOGLE_CLIENT_SECRET, 'postmessage');
export const googleVerify = async (code) => {
  try {
    const { tokens } = await client.getToken(code);
    console.log(tokens);

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: ENV.GOOGLE_CLIENT_ID,
    });

    const { name, picture, email } = ticket.getPayload();

    return {
      ok: true,
      name,
      picture,
      email,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
};
