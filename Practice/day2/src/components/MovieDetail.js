var template = `
    <div class="data-container detail">
        <button @click="$router.back()">< 返回</button>
        <img :src="movie.poster">
        <table>
            <tr>
                <td>中文名:</td>
                <td>{{movie.name}}</td>
            </tr>
            <tr>
                <td>英文名:</td>
                <td>{{movie.ename}}</td>
            </tr>
            <tr>
                <td>类型:</td>
                <td>{{movie.type}}</td>
            </tr>
            <tr>
                <td>地区:</td>
                <td>{{movie.area}}</td>
            </tr>
            <tr>
                <td>评分:</td>
                <td>{{movie.score}}</td>
            </tr>
            <tr>
                <td>简介:</td>
                <td>{{movie.intro}}</td>
            </tr>
        </table>
    </div>
`;

export default {
    template,
    props: ["movie"],  // 传入一个电影对象
}