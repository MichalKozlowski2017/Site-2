require('./bootstrap');
window.Vue = require('vue');

import VeeValidate from 'vee-validate';
import { ErrorBag } from 'vee-validate';
Vue.use(VeeValidate);


Vue.component('test', require('./components/Test.vue'));
Vue.component('banner', require('./components/Banner.vue'));
Vue.component('forms', require('./components/Form.vue'));
Vue.component('form-note', require('./components/Form-note.vue'));
Vue.component('nagroda', require('./components/Nagroda.vue'));
Vue.component('shop', require('./components/Shop.vue'));

const app = new Vue({
    el: '#app'
});
