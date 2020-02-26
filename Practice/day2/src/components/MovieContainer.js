// 该组件仅用于获取电影数据

import MovieLists from "./MovieLists.js";
import movieService from '../service/movieService.js';

var template = `
    <movie-lists :movies="movies" />
`;

export default {
    components: {
        MovieLists
    },
    data() {
        return {
            movies: []
        }
    },
    template,
    async created() {
        // 获取电影数据
        var resp = await movieService.getMovies(1, 10);
        console.log(resp);
        this.movies = resp.data;
    }
}