<template>
  <div class="row">
    <div class="col-4"></div>
    <div class="q-pa-md col-8" style="max-width: 50%">
      <h4 style="margin:4vh;">Update Question</h4>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input outlined v-model="title" label="Title" />

        <q-editor
          min-height="40vh"
          toolbar-bg="orange-14"
          toolbar-text-color="white"
          v-model="question"
          :definitions="{
            bold: {label: 'Bold', icon: null, tip: 'My bold tooltip'}
            }"
        />

        <q-input outlined v-model="tag" label="Tags" @keyup.space="addTags" />

        <div class="tag">
          <q-btn
            class="tag"
            :label="tag"
            size="sm"
            v-for="(tag,i) in tags"
            :key="i"
            @click="removeTag(tag)"
          />
        </div>
        <div>
          <q-btn label="Update Question" type="submit" color="primary" />
          <q-btn label="Reset" :outline="true" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>

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
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: null,
      question: "",
      tags: [],
      tag: null,
      id: "",
      message: {
        status: "",
        content: ""
      },
      notification: false
    };
  },

  methods: {
    addTags() {
      this.tags.push(this.tag);
      this.tag = null;
    },
    removeTag(deleteTag) {
      this.tags = this.tags.filter(tag => {
        return tag !== deleteTag;
      });
    },
    fetch() {
      this.$store.dispatch("fetchQuestion").then(data => {
        let question = data.filter(question => {
          return question._id === this.$route.params.id;
        });
        this.question = question[0].question;
        this.title = question[0].title;
        this.tags = question[0].tags;
        this.id = question[0]._id;
      });
    },
    onSubmit() {
      let question = {
        title: this.title,
        question: this.question,
        tags: this.tags
      };
      this.$store
        .dispatch("patchQuestion", { question, id: this.id })
        .then(data => {
          (this.notification = true),
            (this.message.status = "Update Question Success");
          this.message.content = "Successfully updated a question!";
          setTimeout(() => {
            this.notification = false;
            this.message.status = "";
            this.message.content = "";
            this.$router.push("/");
          }, 1000);
        })
        .catch(err => {
          this.notification = true;
          this.message.status = "Update Question Fail";
          this.message.content = "Oops something wrong!";
          err.data.message.forEach(element => {
            this.message.content += ` ${element}`;
          });
          setTimeout(() => {
            this.notification = false;
            this.message.status = "";
            this.message.content = "";
          }, 2000);
        });
    },

    onReset() {
      this.title = null;
      this.question = null;
      (this.tags = []), (this.tag = null);
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style scoped>
.tag {
  color: rgb(207, 138, 8);
  font-size: 10px;
  background-color: #cee0ed;
  padding: 5px;
  border-radius: 5px;
  margin-right: 5px;
}
</style>