import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App)
app.use(router)
app.use(vue3GoogleLogin, {
  clientId: '121834741975-f6eb8pvkm2dd2rmf9biuf9135ugotc4l.apps.googleusercontent.com'
})

app.mount('#app')