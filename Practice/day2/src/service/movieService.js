// 用于获取电影的数据
export default {
    // 获取多条数据
    async getMovies(page, limit) {
        var url = `http://yuanjin.tech:5005/api/movie?page=${page}&limit=${limit}`;
        var datas = await fetch(url).then(resp => resp.json());
        return datas;
    },
    // 获取一条数据
    async getMovie(id) {
        var url = `http://yuanjin.tech:5005/api/movie/${id}`;
        var datas = await fetch(url).then(resp =>
        resp.json()
        );
        return datas;
    }
};