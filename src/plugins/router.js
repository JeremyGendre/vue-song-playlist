import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../pages/home/Home";
import PageNotFound from "../pages/error/PageNotFound";
import PageNotAuthorized from "../pages/error/PageNotAuthorized";
import Login from "../pages/userLifeCycle/Login";
import Register from "../pages/userLifeCycle/Register";
import Logout from "../pages/userLifeCycle/Logout";
import PlaylistContainer from "../pages/playlist/PlaylistContainer";
import SongsContainer from "../pages/songs/SongsContainer";
import Favorites from "../pages/playlist/Favorites";

Vue.use(VueRouter);

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/playlist/:id', name: 'playlist', component: PlaylistContainer },
    { path: '/favorites', name: 'favorites', component: Favorites },
    { path: '/songs', name: 'songs', component: SongsContainer },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/logout', name: 'logout', component: Logout },
    { path: "/403", name: 'not_authorized', component: PageNotAuthorized },
    { path: "/404", name: 'not_found', component: PageNotFound },
    { path: "*", name: 'not_found_default', component: PageNotFound }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
