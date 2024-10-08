// https://nuxt.com/docs/api/configuration/nuxt-config

import { loadConfig } from "./config/env";

const config = loadConfig(process.env);

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxt/image', '@pinia/nuxt'],
  plugins: [
    './plugins/vue-apollo',
    './plugins/pinia-store',
    // './plugins/socket.client',
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  runtimeConfig: {
    public: {
      appName: config.appName,
      apiDev: config.apiDev,
      apiProd: config.apiProd,
      uriSocketDev: config.uriSocketDev,
      uriSocketProd: config.uriSocketProd
    }
  },

})