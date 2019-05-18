<template>
    <my-page title="测试">
        <div class="container">
            <div class="form-box" v-if="submit">
                <div class="name">{{ submit.name }}</div>
                <div class="meta">
                    <div class="item">提交时间：{{ submit.createTime | timeFilter }}</div>
                </div>
                <!-- <div class="desc">{{ submit.description }}</div> -->
            </div>
            <ul class="item-list">
                <li class="item" v-for="{content, formItem} in items">
                    <div v-if="formItem.type === 'text'">
                        <ui-text-field v-model="content" :label="formItem.label" />
                    </div>
                    <div v-else-if="formItem.type === 'select'">
                        <!-- multiple -->
                        <ui-select-field v-model="content"  :label="formItem.label">
                            <ui-menu-item v-for="option, index in formItem.options" 
                                :key="index" :value="option" :title="option"/>
                        </ui-select-field>
                    </div>
                    <div class="" v-else>
                        未知类型
                    </div>
                </li>
            </ul>
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
                submit: null,
                items: [],
            }
        },
        computed: {
        },
        mounted() {
            let id = this.$route.params.id
            this.$http.get(`/submits/${id}`).then(
                response => {
                    let data = response.data
                    this.submit = data
                    this.items = this.submit.items
                    for (let i = 0; i < this.items.length; i++) {
                        let item = this.items[i]
                        if (item.formItem.type === 'select') {
                            this.items[i].formItem.options = item.formItem.value.split(',')
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
    margin: 0 auto;
}
.item-list {
    .item {}
}
</style>
