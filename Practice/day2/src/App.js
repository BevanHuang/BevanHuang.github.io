var template = `
    <div>
        <header>
            <router-link :to="{name:'home'}">首页</router-link>
            <router-link :to="{name:'movie'}">电影页</router-link>
        </header>
        <router-view></router-view>
    </div>
`;
export default {
    template
}