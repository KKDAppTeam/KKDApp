
<template>
    <section>
        <div class="comming">
            <router-link :to="{name: 'miner.main'}" class="link">进入老K矿机</router-link>
        </div>

        <router-view></router-view>
    </section>
</template>
<script>
export default {

};
</script>
<style lang="stylus" scoped>
    .comming {
        width 100vw
        height 100vh
        display flex
        justify-content center
        align-items center
        font-size 30px
        background #302c43
        color #f8d500
        .link {
            color #f8d500

        }
    }

</style>
