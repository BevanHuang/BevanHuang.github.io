var template = `
<div class="pager" v-if="total > 0">
    <a 
    @click="handleChangePage(1)"
    class="pager-item" 
    :class="currentPage == 1 ? 'disabled' : ''">首页</a>
    <a 
    @click="handleChangePage(currentPage - 1)"
    class="pager-item" 
    :class="currentPage == 1 ? 'disabled' : ''">上一页</a>
    <span class="pager-text">
        <i>{{currentPage}}</i>
        /
        <i>{{pageNumber}}</i>
    </span>
    <a 
    @click="handleChangePage(currentPage + 1)"
    class="pager-item" 
    :class="currentPage == pageNumber ? 'disabled' : ''">下一页</a>
    <a 
    @click="handleChangePage(pageNumber)"
    class="pager-item" 
    :class="currentPage == pageNumber ? 'disabled' : ''">尾页</a>
</div>
`;

export default {
    template,
    props: {
        currentPage: {  // 当前页码
            default: 1,
            type: Number
        },
        total: {  // 总的数据量
            default: 0,
            type: Number
        },
        limitPage: {  // 页容量(每页多少)
            default: 5,
            type: Number
        }
    },
    data() {
        return {

        }
    },
    computed: {
        pageNumber() {
            return Math.ceil(this.total / this.limitPage);
        }
    },
    methods: {
        handleChangePage(newPage) {
            if(newPage < 1 || newPage > this.pageNumber || newPage === this.currentPage) {
                return;
            } else {
                this.$emit("page-change", newPage);
            }
        }
    }
};