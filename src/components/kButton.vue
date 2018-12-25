<template>
    <button
        @click="handleClick"
        class="k-button"
        :class="{disabled}"
    >
        {{this.content}}
    </button>
</template>
<script>
export default {
    props: {
        content: {
            type: String,
            default: 'button'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {

        };
    },
    methods: {
        handleClick(evt) {
            if (this.disabled) return;
            this.$emit('click', evt);
        }
    }
};
</script>
<style lang="stylus" scoped>
@import '../common/index.styl';

    .k-button {
        width 100px
        height 36px
        background blue1
        color c1
        border-radius 6px
        box-sizing border-box
        border none
        @extend .center-flex
        box-shadow: inset 0 -3px blue2;
        cursor pointer
        &.disabled {
            background #a09cb6
            box-shadow inset 0 -3px #939191
        }
    }
</style>
