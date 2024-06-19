import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Material Design Icons
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          background: '#ffffff',
          primary: '#4caf50',
          secondary: '#8bc34a',
          accent: '#cddc39',
          error: '#ff0000',
          warning: '#e91e63',
          info: '#00bcd4',
          success: '#4caf50'
        }
      }
    }
  }
});

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount('#app');
