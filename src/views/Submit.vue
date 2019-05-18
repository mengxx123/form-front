<template>
    <my-page title="云设表单">
        <!-- <ui-raised-button label="制作表单" primary to="/form/add"/> -->
        <ul class="submit-list">
            <li class="item" v-for="item in submits">
                <router-link class="link" :to="'/submits/' + item.id">
                    <div>游客</div>
                    <div class="name">{{ item.createTime | timeFilter }}</div>
                </router-link>
                <button type="button" @click.stop="remove(item)">删除</button>
            </li>
            <div v-if="!submits.length">暂无数据</div>
        </ul>
    </my-page>
</template>

<script>
    /* eslint-disable */
    import {timeFilter, commonTimeFilter} from '@/util/filter'

    export default {
        data () {
            return {
                pagination: {
                    page: 1,
                },
                form: null,
                submits: []
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.loadData()
            },
            loadData() {
                let id = this.$route.params.id
                this.$http.get(`/forms/${id}`).then(
                    response => {
                        let data = response.data
                        this.form = data
                    },
                    response => {
                        console.log(response)
                    })

                this.$http.get(`/forms/${id}/submits?page_size=20&page=${this.pagination.page}`).then(
                    response => {
                        let data = response.data
                        console.log('data', data)
                        this.submits = data
                    },
                    response => {
                        console.log(response)
                    })
            },
            remove(item) {
                this.$http.delete(`/submits/${item.id}`).then(
                    response => {
                        this.$message({
                            type: 'success',
                            text: '删除成功'
                        })
                        this.loadData()
                    },
                    response => {
                        console.log(response)
                        this.$message({
                            type: 'success',
                            text: '删除失败'
                        })
                    })
            }
        },
        filters: {
            timeFilter
        }
    }
</script>

<style lang="scss" scoped>
.submit-list {
    .item {
        margin-bottom: 16px;
    }
}
</style>
