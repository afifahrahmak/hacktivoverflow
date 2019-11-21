<template>
  <div>
    <q-item class="card-question">
      <div class="number">
        <p
          style="color: #757575; font-size: 14px; margin-bottom:0; question.downvote.length"
        >{{ question.score }}</p>
        <p style="color: #757575; font-size: 9px;">vote</p>

        <div class="answer">
          <p style="margin:0; color: #757575;">{{question.answer.length}}</p>
          <p style="font-size:10px; color: #757575;">answers</p>
        </div>
      </div>
      <q-item-section top class="text">
        <div>
          <q-item-label lines="1">
            <span
              style="font-size: 16px;"
              class="text-weight-medium cursor-pointer"
              @click="toReadArticle"
            >{{question.title}}</span>
            <p class="author">author - {{question.user.username}}</p>
            <p
              style="font-size: 13px;"
              v-html="question.question"
            >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod consequuntur a quam, esse nesciunt commodi voluptate ratione laborum nobis autem, nam ipsum sed delectus, nisi dolor veritatis et recusandae!. Lorem ipsum dolor sit amet consectetur adipisicing elit. A, quidem nostrum culpa praesentium odio ipsa. Suscipit, qui debitis odio sit reiciendis veritatis doloremque. Tenetur, error! Unde voluptate voluptatem quo tempora!</p>
          </q-item-label>
          <div class="tags">
            <p
              class="tag"
              v-for="(tag, i) in question.tags"
              :key="i"
              @click="goDetailTag(tag.name)"
            >{{tag}}</p>
          </div>
        </div>
        <q-item-label lines="1" class="q-mt-xs text-body2 text-primary">
          <q-item-label
            style="font-size: 10px; font-style: italic; margin-bottom: 5px;"
            caption
            lines="1"
          >publish : {{question.createdAt.slice(0,10)}}</q-item-label>
        </q-item-label>
      </q-item-section>

      <q-item-section top side v-if="userQuestion.status">
        <div class="text-grey-8 q-gutter-xs">
          <DropdownQuestion :question="question"></DropdownQuestion>
        </div>
      </q-item-section>
    </q-item>

    <q-separator spaced />

    <q-dialog
      position="top"
      v-model="notification"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card class="bg-orange-14 text-white">
        <q-card-section>
          <div class="text-h6 text-center">{{ message.status }}</div>
        </q-card-section>

        <q-card-section>{{ message.content }}</q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DropdownQuestion from "../components/DropdownQuestion";
export default {
  name: "questionList",
  props: ["question"],
  components: {
    DropdownQuestion
  },
  data() {
    return {
      notification: false,
      message: {
        status: "",
        content: ""
      }
    };
  },
  methods: {
    toReadArticle() {
      this.$router.push(`question/${this.question._id}`);
    },
    upvote() {
      this.$store
        .dispatch("upvoteQuestion", this.question._id)
        .then(data => {})
        .catch(err => {
          (this.notification = true),
            (this.message.status = "Oops something wrong!");
          this.message.content = `${err.data.message} please login to vote`;
          setTimeout(() => {
            (this.notification = false), (this.message.status = "");
            this.message.content = "";
          }, 1000);
        });
    },
    downvote() {
      this.$store
        .dispatch("downvoteQuestion", this.question._id)
        .then(data => {})
        .catch(err => {
          (this.notification = true),
            (this.message.status = "Oops something wrong!");
          this.message.content = `${err.data.message} please login to vote`;
          setTimeout(() => {
            (this.notification = false), (this.message.status = "");
            this.message.content = "";
          }, 1000);
        });
    }
  },
  created() {},
  computed: {
    ...mapState(["userQuestion"])
  }
};
</script>

<style scoped>
.lem {
  margin: auto -3vh auto auto;
  width: 50px;
}
.author {
  font-size: 12px;
  color: grey;
}
.card-question {
  display: flex;
  justify-content: space-between;
  height: 130px;
  max-width: 600px;
  /* border-bottom: 1px solid #dbdcdc; */
}
.number {
  text-align: center;
  width: 100px;
  padding: 10px;
}
.answer {
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.text {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  text-align: left;
  padding: 10px;
  height: 130px;
}
.tags {
  display: flex;
}
.tag {
  font-size: 10px;
  background-color: #cee0ed;
  padding: 3px;
  border-radius: 5px;
  margin-right: 5px;
  cursor: pointer;
}
button {
  width: 150px;
  height: 40px;
  background-color: #007ed9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>