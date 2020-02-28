import Home from './components/Home.js';
import MovieContainer from './components/MovieContainer.js';
import MovieDetailShow from './components/MovieDetailShow.js';
export default new VueRouter({
    routes: [
        {
            name: 'home',
            path: '/',
            component: Home
        },
        {
            name: 'movie',
            path: '/movie',
            component: MovieContainer
        },
        {
            name: 'movie-detail',
            path: '/movie/:id',
            component: MovieDetailShow
        }
    ]
});;