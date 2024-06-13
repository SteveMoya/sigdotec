import GitHub from '@auth/core/providers/github'
import Facebook from '@auth/core/providers/facebook'
import Google from '@auth/core/providers/google'
import { defineConfig } from 'auth-astro'
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "@utils/constans"


export default defineConfig({
	providers: [
		GitHub({
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET,
		}),
		Facebook({
			clientId: FACEBOOK_CLIENT_ID,
			clientSecret: FACEBOOK_CLIENT_SECRET,
		}),
		Google({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
		})
	],
})