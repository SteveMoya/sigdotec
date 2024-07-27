export const SITE_TITLE = 'SIGDOTECH Blog';
export const SITE_DESCRIPTION =
  'Articles, stories and tutorials from Tech People';
export const HOMEPAGE_ARTICLE_LIMIT = 6;
export const ARTICLES_PER_PAGE = 6;

export const UNIT_PRICE = 1;
export const CLASS_PRICE = 1;
export const ANUAL_PRICE = 15;
export const CURRENCY = 'USD';

export const isProd = import.meta.env.PROD;
export const isDev = import.meta.env.DEV;
export const GITHUB_CLIENT_ID = import.meta.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = import.meta.env.GITHUB_CLIENT_SECRET;

export const FACEBOOK_CLIENT_ID = import.meta.env.FACEBOOK_CLIENT_ID;
export const FACEBOOK_CLIENT_SECRET = import.meta.env.FACEBOOK_CLIENT_SECRET;

export const GOOGLE_CLIENT_ID = import.meta.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = import.meta.env.GOOGLE_CLIENT_SECRET;

export const AUTH_SECRET = import.meta.env.AUTH_SECRET

export const RESEND_API_KEY = import.meta.env.RESEND_API_KEY

// export const AI_URL = import.meta.env.AI_URL

export const AI_URL = isProd ? import.meta.env.AI_URL :/*Colocar el /test/ al final de la url de desarrollo */ `${import.meta.env.AI_URL}test/`;

export const AI_API_SECRET = import.meta.env.AI_API_SECRET

export const PUBLIC_PAYPAL_CLIENT_ID = import.meta.env.PUBLIC_PAYPAL_CLIENT_ID;
export const PAYPAL_CLIENT_ID = import.meta.env.PAYPAL_CLIENT_ID;
export const PAYPAL_CLIENT_SECRET = import.meta.env.PAYPAL_CLIENT_SECRET;
export const SANBOX_PAYPAL_API = import.meta.env.SANBOX_PAYPAL_API;

export const BASE_URL = import.meta.env.BASE_URL

export const APP_URL = isProd
  ? 'https://sigdotec.com/'
  : 'http://localhost:4321/';
