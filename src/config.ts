// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "AP Tutorials";
export const SITE_DESCRIPTION =
  "Welcome to my blog! I create tutorials on Activepieces development!";
export const TWITTER_HANDLE = "@ferning98";
export const MY_NAME = "Pablo Fernandez";

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
