<template>
  <div>
    <div v-if="!$store.state.user">
      <div class="row justify-between welcome">
        <h4 class="text-white" style="margin-top: 200px;">We loved Hacktiv8 people</h4>
        <q-btn color="black" label="get started" to="/" />
      </div>
      <div class="row dua"></div>
    </div>
  </div>
</template>

<script>
// import QuestionBar from "./QuestionFromMain.vue";
// import io from "socket.io-client";

export default {
  name: "Welcome",
  components: {
    // QuestionBar
  }
};
</script>

<style scoped>
#timeline {
  width: 100vw;
}
#time {
  font-size: 80px;
  color: white;
}
.dua {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background-image: url("../assets/bg3.png");
  background-size: auto;
  background-repeat: no-repeat;
  height: 200vh;
}
.welcome {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background-image: url("../assets/background1.png");
  background-size: auto;
  background-repeat: no-repeat;
  height: 100vh;
}
</style>