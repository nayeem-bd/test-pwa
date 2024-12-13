<template>
  <h1>Users</h1>
</template>
<script>
import { delay } from '@/lib/utils';

export default {
  data() {
    return {
      merchants: []
    };
  },
  components: {},
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
