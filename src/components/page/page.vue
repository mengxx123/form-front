<template>
    <ui-page :title="title || page.title" :page="page" ref="page" :backable="backable" :containerMaxWidth="containerMaxWidth">
        <div slot="drawer">
            <div class="header">
                <img class="logo" src="/static/img/form.svg">
            </div>
            <ui-list @itemClick="toggle()">
                <ui-list-item title="首页" to="/">
                    <ui-icon value="home" slot="left" />
                </ui-list-item>
                <!-- <ui-list-item title="我的表单" to="/forms">
                    <ui-icon value="star" slot="left" />
                </ui-list-item> -->
                <ui-list-item title="关于" to="/about">
                    <ui-icon value="info" slot="left" />
                </ui-list-item>
            </ui-list>
        </div>
        <slot></slot>
    </ui-page>
</template>

<script>
    export default {
        data() {
            return {
                open: false,
                docked: true
            }
        },
        props: {
            page: {
                type: Object,
                default: function () {
                    return {
                        title: '云设'
                    }
                }
            },
            title: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: '11'
            },
            containerMaxWidth: {
                type: Number,
                default: 1000
            },
            backable: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
        },
        methods: {
            toggle() {
                this.$refs.page.hideDrawerIfMobile()
            }
        }
    }
</script>

<style lang="scss" scoped>
.header {
    padding: 40px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.logo {
    display: block;
    width: 80px;
    margin: 0 auto;
}
.ui-position-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
}
</style>