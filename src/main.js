import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import firebase from 'firebase'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyAp9Npdd-VYCImaTu04_JCnVYtaywsuf-g",
  authDomain: "gpcg-movinet.firebaseapp.com",
  databaseURL: "https://gpcg-movinet.firebaseio.com",
  projectId: "gpcg-movinet",
  storageBucket: "gpcg-movinet.appspot.com",
  messagingSenderId: "914553674603",
  appId: "1:914553674603:web:3789285c111c6a8b"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged( user => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})


