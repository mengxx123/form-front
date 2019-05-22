<template>
    <my-page title="测试">
        <div class="common-container container">
            <div class="form-box" v-if="form">
                <div class="name">{{ form.name }}</div>
                <div class="meta">
                    <div class="item">发布时间：{{ form.publishTime | timeFilter }}</div>
                    <div class="item">提交数量：{{ form.submitCount }}</div>
                </div>
                <div class="desc">{{ form.description }}</div>
            </div>
            <ul class="item-list">
                <li class="item" v-for="item in items">
                    <div v-if="item.type === 'text'">
                        <ui-text-field v-model="item.userInput" :label="item.title" />
                    </div>
                    <div v-else-if="item.type === 'select'">
                        <!-- multiple -->
                        <ui-select-field v-model="item.userInput"  :label="item.title">
                            <ui-menu-item v-for="option, index in item.options" 
                                :key="index" :value="option" :title="option"/>
                        </ui-select-field>
                    </div>
                    <div class="" v-else>
                        未知类型
                    </div>
                </li>
            </ul>
            <ui-raised-button primary label="提交" @click="submit" />
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    import {format} from '@/util/time'
    import {timeFilter, commonTimeFilter} from '@/util/filter'

    export default {
        data () {
            return {
                form: null,
                items: [],
            }
        },
        computed: {
        },
        mounted() {
            let id = this.$route.params.id
            this.$http.get(`/forms/${id}`).then(
                response => {
                    let data = response.data
                    this.form = data
                },
                response => {
                    console.log(response)
                })
            this.$http.get(`/forms/${id}/items`).then(
                response => {
                    let data = response.data
                    this.items = data
                    for (let i = 0; i < this.items.length; i++) {
                        let item = this.items[i]
                        if (item.type === 'select') {
                            this.items[i].options = item.value.split(',')
                        }
                    }
                },
                response => {
                    console.log(response)
                })
        },
        destroyed() {
        },
        methods: {
            submit() {
                this.$message({
                    type: 'info',
                    text: '功能暂未实现'
                })
            }
        },
        filters: {
            timeFilter
        }
    }
</script>

<style lang="scss" scoped>
.form-box {
    margin-bottom: 24px;
    .name {
        margin-bottom: 16px;
        font-size: 24px;
        // text-align: center;
    }
    .desc {
        // text-align: center;
        color: #666;
    }
    .meta {
        display: flex;
        margin-bottom: 16px;
        color: #888;
    }
    .item {
        margin-right: 16px;
    }
}
.container {
    max-width: 600px;
}
.item-list {
    .item {}
}
</style>
