<template>
  <q-layout view="lHh LpR fFf">
    <q-drawer show-if-above v-model="left" side="left" bordered class="side">
      <br />
      <br />
      <br />
      <div class="q-pa-md" style="max-width: 450px">
        <span class="text-h5 text-weight-bold">#tags</span>
        <q-list bordered separator>
          <TrendingTag v-for="(tag,i) in trendingTags" :key="i" :tag="tag"></TrendingTag>
        </q-list>
      </div>

      <div class="q-pa-md" style="max-width:450px" v-if="isLogin">
        <q-list separator>
          <q-item clickable v-ripple @click="fetchUserQuestion">
            <q-item-section avatar>
              <q-icon color="warning" name="textsms" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="navvv">YOUR QUESTION</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="seeAll">
            <q-item-section avatar>
              <img src="../assets/internet.png" alt="internet" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="navvv">PUBLIC</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="seeAnswer">
            <q-item-section avatar>
              <q-icon color="lime-10" name="question_answer" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="navvv">YOUR ANSWER</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <div
        class="q-pa-md q-gutter-md"
        style="max-width: 900px"
        v-if="!userQuestion.status && !isAnswer"
      >
        <div class="ask">
          <p style="font-size:15px" class="navvv">ALL QUESTION</p>
          <q-btn
            class="gt-xs"
            unelevated
            outlined
            no-caps
            color="orange-6"
            v-if="isLogin"
            @click="toQuestionForm"
          >Ask Question</q-btn>
        </div>
        <q-list style="max-width: 900px">
          <QuestionList
            v-for="(question, index) in filteredQuestions"
            :key="index"
            :question="question"
          ></QuestionList>
        </q-list>
      </div>

      <div class="q-pa-md q-gutter-md" v-if="userQuestion.status && !isAnswer">
        <q-list style="max-width: 900px">
          <QuestionList
            v-for="(question, index) in userQuestion.data"
            :key="index"
            :question="question"
          ></QuestionList>
        </q-list>
      </div>

      <div v-if="isAnswer" class="ans">
        <AnswerList></AnswerList>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import QuestionList from "../components/QuestionList";
import TrendingTag from "../components/TrendingTag";
import AnswerList from "../components/AnswerList";

import { mapState } from "vuex";

export default {
  name: "home",
  data() {
    return {
      left: false
    };
  },
  components: {
    QuestionList,
    TrendingTag,
    AnswerList
  },
  methods: {
    seeAll() {
      this.$store.commit("SEEALL");
    },
    seeAnswer() {
      this.$store.dispatch("fetchAnswerUser");
    },
    fetchUserQuestion() {
      this.$store
        .dispatch("fetchUserQuestion")
        .then(data => {})
        .catch(err => {});
    },
    toQuestionForm() {
      this.$router.push("/questionForm");
    }
  },
  created() {
    this.$store.dispatch("fetchQuestion");
    this.$store.dispatch("auth");
  },
  computed: {
    ...mapState([
      "questions",
      "userQuestion",
      "trendingTags",
      "isLogin",
      "isAnswer",
      "search"
    ]),
    filteredQuestions: function() {
      return this.questions.filter(question => {
        let tagsFlag = false;
        question.tags.forEach(tag => {
          if (tag.match(this.search)) tagsFlag = true;
        });
        return question.title.match(this.search) || tagsFlag;
      });
    }
  },
  watched: {
    isLogin() {}
  }
};
</script>

<style scoped>
.navvv {
  font-size: 12px;
  font-weight: bolder;
  letter-spacing: 0.12em;
}
.ask {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border-bottom: 1px solid #dbdcdc;
}
.container {
  width: 250px;
  height: 100%;
  position: fixed;
  text-align: left;
  padding: 30px 50px 30px 70px;
}
.ans {
  width: 100%;
}
img {
  height: 20px;
}
</style>
