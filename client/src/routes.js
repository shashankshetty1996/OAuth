// Lazy Loading
const HomeComponent = resolve => {
  require.ensure(['./containers/Home/Home.vue'], () => {
    resolve(require('./containers/Home/Home.vue'));
  });
};

const LoginComponent = resolve => {
  require.ensure(['./containers/Login/Login.vue'], () => {
    resolve(require('./containers/Login/Login.vue'));
  });
};

const routes = [
  { path: '/', name: 'Login', component: LoginComponent },
  { path: '/home', name: 'Home', component: HomeComponent },
  { path: '*', redirect: '/home' }
];

export default routes;