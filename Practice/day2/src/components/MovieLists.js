// 显示多个电影的组件
import MovieItem from "./MovieItem.js"

var template = `
    <div class="data-container">
        <movie-item v-for="item in movies" :key="item._id" :movie="item" />
    </div>
`

export default {
    components: {
        MovieItem
    },
    props: ["movies"], // 电影数组
    template
}