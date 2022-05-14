import Vue from 'vue'
import App from './App.vue'
import Vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import routes from './routes'
import weekNumberScript from './weekNumber.js'

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


app.$mount('#app')

weekNumberScript()
