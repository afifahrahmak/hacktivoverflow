<template>
  <div class="container" style="margin: 2vh; width:900px;  overflow: scroll;">
    <q-list
      bordered
      class="rounded-borders"
      style="padding: 5vh; margin: 1vh; width:650px; over"
      v-for="(answer , i) in userAnswer"
      :key="i"
    >
      <q-item class="container">
        <q-item-section style="width:100%">
          <q-item-section lines="1" style="width:100%">
            <span
              class="text-weight-medium text-h5 cursor-pointer"
              @click="toReadArticle(answer.question._id)"
            >{{answer.question.title}}</span>
          </q-item-section>

          <q-separator spaced />
          <q-item-section lines="1" class="q-mt-xs text-body2 text-primary">
            <span class="cursor-pointer" v-for="(tag,i) in answer.question.tags" :key="i">.{{ tag }}</span>
          </q-item-section>
          <q-separator spaced />
          <q-separator spaced />
          <p class="text-bold">your answer :</p>
          <q-item-label lines="1" class="q-mt-xs text-body2 text-primary">
            <span v-html="answer.answer"></span>
          </q-item-label>
        </q-item-section>
        <q-item-section top side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn size="12px" flat dense round icon="edit" @click="toEdit(answer)" />
          </div>
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="edit" persistent>
      <q-card style="min-width: 65vw">
        <q-card-section>
          <div class="text-h6 text-center">UPDATE ANSWER</div>
        </q-card-section>

        <q-card-section>
          <q-editor
            v-model="answer"
            autofocus
            min-height="50vh"
            toolbar-bg="orange-6"
            toolbar-text-color="white"
            :definitions="{
            bold: {label: 'Bold', icon: null, tip: 'My bold tooltip'}
            }"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Update Answer" @click="patchAnswer" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      position="top"
      v-model="notification"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card class="bg-orange-6 text-white">
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

export default {
  name: "answerUser",
  data() {
    return {
      edit: false,
      answer: "",
      toEditId: "",
      message: {
        status: "",
        content: ""
      },
      notification: false
    };
  },
  created() {},
  methods: {
    toReadArticle(payload) {
      this.$router.push(`question/${payload}`);
    },
    toEdit(payload) {
      this.edit = true;
      this.toEditId = payload._id;
      this.userAnswer.forEach(answer => {
        if (answer._id === payload._id) this.answer = payload.answer;
      });
    },
    patchAnswer() {
      this.$store
        .dispatch("patchAnswer", { id: this.toEditId, answer: this.answer })
        .then(data => {
          this.notification = true;
          this.message.status = "Success";
          this.message.content = "Update answer success";
          setTimeout(() => {
            this.notification = false;
            this.edit = false;
          }, 2000);
        })
        .catch(err => {
          this.notification = true;
          this.message.status = "Ooops!";
          this.message.content = err.data.message;
          setTimeout(() => {
            this.notification = false;
            this.edit = false;
          }, 2000);
        });
    }
  },
  computed: {
    ...mapState(["userAnswer"])
  }
};
</script>

<style scoped>
</style>