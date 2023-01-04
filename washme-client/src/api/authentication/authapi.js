import Vue from 'vue'
import axios from 'axios'
import { authorizationServiceUrl } from './../url.js'

export default Vue.extend({
    methods: {
        authenticate(successCallback, errorCallback) {
            const URL = `${authorizationServiceUrl}/Auth/CheckLogin`
            axios.get(URL).then(response => {
              successCallback(response)
              var currentURL = window.history.pushState({ path: currentURL }, '', currentURL)
              Vue.prototype.$user = response.data
              if (response && response.status === 403 && response.body && response.body.Message && response.body.Message.length) {
                window.location = response.body.Message
              }
            }).catch(error => {
              if(error){
                this.redirectToLoginOnAuthFailure(error.response)
              }
              errorCallback(error)
            })
          },
        redirectToLoginOnAuthFailure: function (authException) {
            if (authException && authException.status === 403 && authException.data && authException.data.RedirectLocation) {
              var location = authException.data.RedirectLocation
              var samlRequest = authException.data.SAMLRequest
              if (samlRequest && samlRequest.length > 0) {
                document.getElementById('saml_spinit_samlrequest').value = samlRequest
                document.getElementById('saml_spinit_post').setAttribute('action', location)
                document.getElementById('saml_spinit_post').submit()
              } else {
                window.location = location
              }
            }
        },
        Login(userObject, successCallback, errorCallback) {
            const URL = `${authorizationServiceUrl}/Auth/Login`
            axios.post(URL, userObject).then(response => {
              successCallback(response)
            }).catch(error => {
              errorCallback(error)
            })
        },
    }
})