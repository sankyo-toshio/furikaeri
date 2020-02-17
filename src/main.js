import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

// Vue.config.ignoredElements = ['b-field', 'b-input', 'b-checkbox']
// import { createLocalVue } from '@vue/test-utils';
 
import Amplify, * as AmplifyModules from 'aws-amplify' // 追記
import { AmplifyPlugin } from 'aws-amplify-vue' // 追記
import aws_exports from './aws-exports' // 追記
Amplify.configure(aws_exports) // 追記

// const localVue = createLocalVue();
// localVue.use(AmplifyPlugin, AmplifyModules, Buefy);  // for debug
Vue.use(AmplifyPlugin, AmplifyModules) // 追記
Vue.use(Buefy) // important

Vue.config.productionTip = false


new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')

