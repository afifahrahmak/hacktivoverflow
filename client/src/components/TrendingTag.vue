<template>
  <q-item clickable v-ripple @click="changeSearch">
    <q-item-section avatar>
      <q-icon color="primary" name="tag" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{tag._id}}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "trendingTag",
  props: ["tag"],
  methods : {
    changeSearch(){
      this.$store.commit('SEARCHTRIGGER' , this.tag._id)
    }
  }
};
</script>

<style>
</style>