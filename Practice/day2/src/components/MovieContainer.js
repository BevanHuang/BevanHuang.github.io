// 该组件仅用于获取电影数据

import MovieLists from "./MovieLists.js";
import movieService from '../service/movieService.js';
import Loading from './modal/Loading.js';
import Pager from './Pager.js';

var template = `
<div>
    <movie-lists :movies="movies" />
    <loading :isShow="isShow"></loading>
    <pager 
    :currentPage="currentPage" 
    :total="total" 
    :limitPage="limitPage" 
    @page-change="handlePageChange" />
</div>

`;

export default {
    components: {
        MovieLists,
        Loading,
        Pager
    },
    data() {
        return {
            movies: [],
            isShow: false,
            currentPage: 1,  // 当前页
            total: 0,  // 总的数据量
            limitPage: 5  // 页容量(每页的数据量)
        }
    },
    template,
    async created() {
        // 获取电影数据
        this.getMovies();
    },
    methods: {
        handlePageChange(newPage) {
            this.currentPage = newPage;
            this.getMovies();
        },
        async getMovies() {
            this.isShow = true;
            var resp = await movieService.getMovies(this.currentPage, this.limitPage);
            // console.log(resp);
            this.total = resp.count;
            this.movies = resp.data;
            this.isShow = false;
        }
    }
}


