<template>
    <my-page title="表单" :page="page">
        <!-- <ui-raised-button label="制作表单" primary to="/form/add"/> -->
        <div class="common-container container">
            <ul class="form-list">
                <li class="item" v-for="item in forms">
                    <router-link class="link" :to="'/forms/' + item.id">
                        <div class="name">{{ item.name }}</div>
                    </router-link>
                </li>
            </ul>
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                pagination: {
                    page: 1,
                },
                forms: [],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'apps',
                            href: 'https://app.yunser.com?utm_source=form',
                            target: '_blank',
                            title: '应用'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.$http.get(`/publicForms?page_size=20&page=${this.pagination.page}`).then(
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
            },
            remove(form) {
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

<style scoped>
</style>
