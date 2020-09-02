import Vue from 'vue'
import App from './App.vue'
import '@aws-amplify/ui-vue';
import Amplify from 'aws-amplify';
import  { Auth } from 'aws-amplify';

import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';

import VueClipboard from 'vue-clipboard2';
const VueScrollTo = require('vue-scrollto');
import fullscreen from 'vue-fullscreen'

Vue.use(fullscreen);
Vue.use(VueScrollTo);
Vue.use(VueClipboard);

const ROOT_DOMAIN = '';

Amplify.configure({
    Auth: {
        region: '',
        userPoolId: '',
        userPoolWebClientId: '',
        mandatorySignIn: false,
        oauth: {
            scope: [ 'email', 'openid'],
            redirectSignIn: `https://um-app.${ROOT_DOMAIN}/`,
            redirectSignOut: `https://um-app.${ROOT_DOMAIN}/`,
            responseType: 'code'
        }
    },
    API: {
        endpoints: [
            {
                name: "UserAPI",
                endpoint: `https://um-user.${ROOT_DOMAIN}`,
                custom_header: async () => { 
                    return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` }                  
                }
            },
            {
                name: "TestAPIKey",
                endpoint: `https://um-test.${ROOT_DOMAIN}`,
            }
        ]
    }
});


Vue.prototype.$Amplify = Amplify;
                    
Vue.config.productionTip = false;

new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')