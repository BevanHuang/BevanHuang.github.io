// 入口文件
// 作用：导入spa的首页
import App from './App.js';

new Vue({
    el: '#app',
    data: {

    },
    template: `
        <div>
            <App />
        </div>
    `,
    components: {
        App
    }
});