<template>
    <my-page title="我的表单">
        <div class="common-container container">
            <!-- <ui-raised-button label="制作表单" primary to="/form/add"/> -->
            <section>
                <!-- <h2 class="box-title">所有表单</h2> -->
                <ul class="form-list">
                    <!-- <li>
                        <router-link to="/forms/1">示例表单</router-link>
                    </li> -->
                    <li class="item" v-for="form in forms">
                        <div class="title">{{ form.name }}</div>
                        <router-link :to="'/forms/' + form.id">查看</router-link>
                        <router-link :to="`/forms/${form.id}/edit`">编辑</router-link>
                        <a href="#" @click.prevent="remove(form)">删除</a>
                    </li>
                </ul>
            </section>
            <a href="javascript:;" v-if="!$store.state.user" @click="login">点击登陆</a>
        </div>
        <ui-float-button class="float-button" icon="add" secondary @click="add" />
    </my-page>
</template>

<script>
    import oss from '@/util/oss'

    export default {
        data () {
            return {
                forms: [
                ]
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            add() {
                this.$router.push('/form/add')
            },
            login() {
                location.href = oss.getOauthUrl()
            },
            init() {
                this.$http.get(`/forms?page_size=20&page=${1}`).then(
                // this.$http.get(`/forms?page_size=20&page=${this.pagination.page}`).then(
                    response => {
                        let data = response.data
                        // this.forms = this.forms.concat(data)
                        console.log('data', data)
                        this.forms = data

                        // for (let item of this.article) {
                        //     item.tags = 'ass'
                        // }
                        // console.log(response.headers)
                        // console.log('X-Total-Page', response.headers['x-total-page'])
                        // this.pagination.totalPage = response.headers['x-total-page']
                    },
                    response => {
                        console.log(response)
                    })
                // let forms = this.$storage.get('forms')
                // if (forms) {
                //     this.forms = forms
                // } else {
                //     this.$storage.get('forms', [])
                // }

                // let forms = this.$storage.get('forms')
                // if (forms) {
                //     this.forms = forms
                // } else {
                //     this.$storage.get('forms', [])
                // }
            },
            remove(item) {
                let ret = confirm(`确认删除「${item.name}」`)
                if (!ret) {
                    return
                }
                this.$http.delete(`/forms/${item.id}`).then(
                // this.$http.get(`/forms?page_size=20&page=${this.pagination.page}`).then(
                    response => {
                        let data = response.data
                        // this.forms = this.forms.concat(data)
                        console.log('data', data)
                        this.init()
                    },
                    response => {
                        console.log(response)
                    })
                // let forms = this.$storage.get('forms')
                // for (let i = 0; i < forms.length; i++) {
                //     if (forms[i].id === form.id) {
                //         forms.splice(i, 1)
                //         this.forms.splice(i, 1)
                //     }
                // }
                // this.$storage.set('forms', forms)
            }
        }
    }
</script>

<style lang="scss" scoped>
.form-list {
    .item {
        padding: 16px 0;
        border-bottom: 1px solid #000;
    }
    .title {
        font-weight: bold;
        margin-bottom: 8px;
    }
}
</style>
