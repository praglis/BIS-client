import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.config.productionTip = false


const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})

Vue.use(vuetify);
Vue.use(VueRouter);

const app = new Vue({
    vuetify,
    router,
    render: h => h(App)
})

// app.use(vuetify);
// app.use(VueRouter);

app.$mount('#app')
