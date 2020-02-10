import BackTop from "components/content/backTop/BackTop";

export const backTopMixin = {
    data() {
        return {
            isActive: false
        }
    },
    components: {
        BackTop
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0);
        }
    }
}