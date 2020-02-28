// 每个电影的格式

var template = `
<div class="data">
    <div class="poster">
        <router-link 
            :to="{
                name:'movie-detail',
                params: {
                    id: movie._id
                }
            }"
        >
            <img 
            :src="movie.poster" 
            :alt="movie.name">
        </router-link>
    </div>
    <div class="words">
        <router-link 
            :to="{
                name:'movie-detail',
                params: {
                    id: movie._id
                }
            }"
        >
            <h2 class="title">{{movie.name}}</h2>
        </router-link>
        <div class="attach">
            <span>英文名：{{movie.ename}}</span>
            <span>类型：{{movie.type}}</span>
            <br>
            <span>上映地区：{{movie.area}}</span>
            <span>上映时间：{{movie.upDate}}</span>
            <span>时长：{{movie.time}}</span>
        </div>
        <div class="desc">
            {{movie.intro}}
        </div>
    </div>
</div>
`;

export default {
    props: ["movie"],  // 把电影的数据传递进来
    template
}