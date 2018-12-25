<template>
    <div class="box">
        404 &nbsp;
        <router-link :to="{name: 'main'}">{{$t('common.backMain')}}</router-link>
    </div>
</template>
<script>
export default {

};
</script>
<style lang="stylus" scoped>
    .box {
        width 100vw
        height 100vh
        display flex
        justify-content center
        align-items center
        font-size 30px
        background #302c43
        color #f8d500
    }
</style>

