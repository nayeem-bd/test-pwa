<template>
  <DashBoard />
</template>
<script>
import { delay } from '@/lib/utils';
import DashBoard from './_components/DashBoard.vue';

export default {
  data() {
    return {};
  },
  components: {
    DashBoard
  },
  async beforeRouteEnter(to, from, next) {
    await delay(1000);
    next();
  },

  beforeRouteUpdate(to, from) {
    // You can implement logic for route updates here
  },
  methods: {
    setPost(post) {
      this.post = post;
    },
    setError(err) {
      this.error = err.toString();
    }
  }
};
</script>
