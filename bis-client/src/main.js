import Vue from 'vue'
import App from './App.vue'
import Vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.config.productionTip = false


const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})

Vue.use(Vuetify);
Vue.use(VueRouter);

const app = new Vue({
    vuetify: Vuetify,
    router,
    render: h => h(App)
})

// app.use(vuetify);
// app.use(VueRouter);

app.$mount('#app')
