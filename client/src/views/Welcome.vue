<template>
  <div>
    <div v-if="!$store.state.user">
      <div class="row justify-between welcome">
        <h4 class="text-white" style="margin-top: 200px;">We loved Hacktiv8 people</h4>
      </div>
      <div class="row dua">
        <!-- <div class="q-px-lg q-pb-md" id="timeline">
          <q-timeline color="secondary">
            <q-timeline-entry heading>
              Welcome To Hoverflow
              <br />
              <br />The Medium To Deliver Q&As
            </q-timeline-entry>

            <q-timeline-entry title="Register" subtitle="Step 1" side="left" icon="assignment_ind">
              <div>
                Welcome To Hoverflow! For those newcomers, let me introduce a
                bit to what we do here.
                <br />This is an open forum to ask all your questions of which you
                desire.
                <br />Here everyone can answer your questions and upvote / downvote
                based on their interests.
                <br />To get started please register first!
                <br />If you are an old user, please skip to step 2!
                <br />Once you finished register, skip to step 3!
              </div>
            </q-timeline-entry>

            <q-timeline-entry
              title="Login"
              subtitle="Step 2"
              side="right"
              icon="assignment_turned_in"
            >
              <div>
                For the veterans of the forum, please login
                <br />and once you're done go to the next step!
              </div>
            </q-timeline-entry>

            <q-timeline-entry
              title="Question Asking"
              subtitle="Step 3"
              side="left"
              icon="question_answer"
            >
              <div>
                Now that you finished your login process,
                <br />you will be relocated to your dashboard,
                <br />where all your questions are displayed.
                <br />To ask a new question, kindly click "add new"
                <br />Once you're done, please go to the next and final step!
              </div>
            </q-timeline-entry>

            <q-timeline-entry title="Done!" subtitle="FInal Step" side="right">
              <div>
                That's it! You're finally set! That covers the basics of what we
                do here, basically.
                <br />Feel free to roam around and try on several of our features to
                get a feel of our website!
                <br />Thank you for choosing Hoverflow as a platform to shed your
                thoughts
                <br />and ask your questions!
                <br />See you next time!
              </div>
            </q-timeline-entry>
          </q-timeline>
        </div>-->
      </div>
    </div>
    <!-- <div v-else>
      <div class="row">
        <div class="q-pa-md q-gutter-md">
          <q-list bordered class="rounded-borders" style="width: 50vw; margin-left:25vw;">
            <q-item-label header>Questions</q-item-label>
            <div v-for="(question, index) in $store.state.questions" :key="index">
              <QuestionBar :question="question" :index="index" />
            </div>
          </q-list>
        </div>
      </div>
    </div>-->
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