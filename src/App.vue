<template>
    <section class="view">
        <router-view></router-view>
    </section>
</template>
<script>
export default {

};
</script>
<style lang="stylus" scoped>
.view{
    width 100vw;
    height 100vh;
    overflow-y:scroll;
    overflow-x:hidden
    -webkit-overflow-scrolling: touch;
}
</style>
