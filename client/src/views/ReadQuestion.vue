<template>
  <div class="row container">
    <div class="col-3"></div>
    <div class="q-gutter-md col-9">
      <q-list class="rounded">
        <q-item>
          <q-item-section top class="col-1 gt-sm lem">
            <q-btn
              size="20px"
              flat
              round
              color="grey"
              icon="keyboard_arrow_up"
              @click="upvote"
              style="margin:0px;"
            />

            <p
              rounded
              size="12px"
              style="margin: 0 0 0 25px; font-weight:bolder;"
            >{{question.score}}</p>

            <q-btn
              size="20px"
              flat
              color="grey"
              round
              icon="keyboard_arrow_down"
              @click="downvote"
              style="margin-bottom:20px;"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">
              <h4 style="font-size: 20px; margin-top: 0px;">{{ question.title }}</h4>
              <span class="text-weight-medium cursor-pointer">
                <b>author</b>
                : {{question.user.username}}
              </span>
            </q-item-label>
            <q-item-label caption lines="1">publish: {{question.createdAt.slice(0,10)}}</q-item-label>
            <q-item-label lines="1" class="q-mt-xs text-body2 text-primary">
              <span style v-html="question.question"></span>
              <br />
              <div class="tags">
                <p
                  class="tag"
                  v-for="(tag, i) in question.tags"
                  :key="i"
                  @click="goDetailTag(tag.name)"
                >{{tag}}</p>
              </div>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <div class="answer" style="margin-top:20px;">
        <Answer
          v-for="(answer, index) in question.answer"
          :key="index"
          :answer="answer"
          @fetchRequest="toFetch"
        ></Answer>
      </div>
      <div v-if="isLogin" width="100px !important;">
        <h5 class="text-center" style="margin: 4vh auto 1vh auto; font-size: 15px;">your answer</h5>
        <q-editor
          min-height="10vh"
          toolbar-bg="grey-4"
          toolbar-text-color="orange-6"
          v-model="answer"
          :definitions="{
            bold: {label: 'Bold', icon: null, tip: 'My bold tooltip'}
            }"
        />
        <q-btn
          unelevated
          color="orange-13"
          no-caps
          label="post answer"
          style="width:115px; margin-top: 1vh;"
          class="float-left"
          @click="answerAsycn"
        />
      </div>
    </div>

    <br />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Answer from "../components/Answer";
import jwt from "jsonwebtoken";

export default {
  components: {
    Answer
  },
  data() {
    return {
      name: "readQuestion",
      question: {},
      answer: "",
      flagColor: null,
      colorUpvote: "grey-10",
      colorDownvote: "grey-10"
    };
  },
  methods: {
    answerAsycn() {
      this.$store
        .dispatch("answer", {
          questionId: this.question._id,
          answer: this.answer
        })
        .then(data => {
          this.answer = "";
          this.fetch();
        });
    },
    upvote() {
      this.$store.dispatch("upvoteQuestion", this.question._id).then(data => {
        this.fetch();
      });
    },
    downvote() {
      this.$store.dispatch("downvoteQuestion", this.question._id).then(data => {
        this.fetch();
      });
    },
    fetch() {
      let user = jwt.verify(localStorage.getItem("token"), "rahasia");
      let id = user._id;
      this.$store.dispatch("fetchQuestion").then(data => {
        let question = this.questions.filter(question => {
          return question._id === this.$route.params.id;
        });
        this.question = question[0];
      });
    },
    toFetch() {
      this.fetch();
    }
  },
  computed: {
    ...mapState(["questions", "isLogin"])
  },
  created() {
    this.fetch();
  },
  watch: {}
};
</script>

<style scoped>
.container {
  margin-top: 2vh;
  margin-bottom: 15vh;
  margin-right: 15vh;
}
.vote-btn {
  margin: 0 -2vh 0 0;
  width: 20px !important;
}
.vote {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  margin-top: 12vh;
}
.vote .vote-val {
  padding: 0;
  margin: 0;
}
.lem {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 8vh;
}
h4 {
  padding: 0;
  margin: 6vh auto 1vh auto;
}
.answer {
  margin-top: 10vh;
}
.tags {
  display: flex;
  margin-top: 8px;
}
.tag {
  color: rgb(207, 138, 8);
  font-size: 10px;
  background-color: #cee0ed;
  padding: 5px;
  border-radius: 5px;
  margin-right: 5px;
  cursor: pointer;
}
</style>