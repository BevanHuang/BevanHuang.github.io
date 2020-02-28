import MovieDetail from './MovieDetail.js';
import movieService from '../service/movieService.js';

var template = `
<div>
    <movie-detail :movie="movie" />
</div>
`;

export default {
    template,
    components: {
        MovieDetail
    },
    data() {
        return {
            movie: null
        }
    },
    async created() {
        // console.log(this.$router);
        // console.log(this.$route);
        var movieId = this.$route.params.id;
        var resp = await movieService.getMovie(movieId);
        this.movie = resp.data;
        console.log(this.movie);
    }
}