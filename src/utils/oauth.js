const { ClientCredentials } = require('simple-oauth2');

export async function getToken() {
	const oauthOptions = {
    client: {
      id: process.env.BNET_CLIENT_ID,
      secret: process.env.BNET_CLIENT_SECRET
    },
    auth: {
      tokenHost: "https://us.battle.net/oauth/token"
    }
  };

	const client = new ClientCredentials(oauthOptions);
	const { token } = await client.getToken();
	return token;
}