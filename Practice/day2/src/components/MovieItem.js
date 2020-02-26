// 每个电影的格式

var template = `
<div class="data">
    <div class="poster">
        <img :src="movie.poster" alt="">
    </div>
    <div class="words">
        <h2 class="title">{{movie.name}}</h2>
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