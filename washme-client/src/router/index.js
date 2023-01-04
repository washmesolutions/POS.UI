import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import store from '@/state/store'
import routes from './routes'
import axios from 'axios'
import Auth from '@/api/authentication/authapi.js'

var authApi = new Auth()
//Vue.use(vuexI18n.plugin, store)

axios.interceptors.request.use(
    config => {
        if(process.env.NODE_ENV == 'development'){
          config.withCredentials = true
        }
        return config;
    });

Vue.use(VueRouter)
Vue.use(VueMeta, {
    // The component option name that vue-meta looks for meta info on.
    keyName: 'page',
})

const router = new VueRouter({
    routes,
    // Use the HTML5 history API (i.e. normal-looking routes)
    // instead of routes with hashes (e.g. example.com/#/about).
    // This may require some server configuration in production:
    // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    },
})

router.beforeEach((routeTo, routeFrom, next) => {
    if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
        // Check if auth is required on this route
        // (including nested routes).
        const authRequired = routeTo.matched.some((route) => route.meta.authRequired)

        // If auth isn't required for the route, just continue.
        if (!authRequired) return next()

        // If auth is required and the user is logged in...
        if (store.getters['auth/loggedIn']) {
            // Validate the local user token...
            return store.dispatch('auth/validate').then((validUser) => {
                // Then continue if the token still represents a valid user,
                // otherwise redirect to login.
                validUser ? next() : redirectToLogin()
            })
        }

        // If auth is required and the user is NOT currently logged in,
        // redirect to login.
        redirectToLogin()

        // eslint-disable-next-line no-unused-vars
        // eslint-disable-next-line no-inner-declarations
        function redirectToLogin() {
            // Pass the original route to the login component
            next({
                name: 'login',
                query: {
                    redirectFrom: routeTo.fullPath
                }
            })
        }
    } else if (process.env.VUE_APP_DEFAULT_AUTH === "fakebackend") {
        const publicPages = ['/login', '/register', '/forgot-password'];
        const authpage = !publicPages.includes(routeTo.path);
        const loggeduser = localStorage.getItem('user');

        //const authpage = false
        //const loggeduser = ""
        if (authpage && !loggeduser) {
            return next('/login');
        }

        next();
    } else if (process.env.VUE_APP_DEFAULT_AUTH === "fakebackend2") {
        if (routeTo.name !== 'Error' && routeTo.name !== 'login') {
            authApi.authenticate(function (response) {
                document.title = response.data.portalName
                next()
            }, function(error) {
                console.error(error)
            })
        } else {
            next()
        }
    }
})


export default router