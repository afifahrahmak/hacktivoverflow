<template>
  <div class="row cont">
    <!-- <div class="imeg">
      <img src="../assets/asks.png" alt style="width:500px;" />
    </div>-->
    <div class="q-pa-md col-8 addd" style="max-width: 50%; margin-left: 100px;">
      <h4>ask question</h4>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          outlined
          stack-label
          v-model="title"
          label="Title"
          hint="Be specific and imagine you’re asking a question to another person"
        />

        <q-editor
          label="Body"
          hint="include all the information someone would need to answer your question"
          min-height="20vh"
          toolbar-bg="white"
          toolbar-text-color="black"
          v-model="question"
          :dense="$q.screen.lt.md"
          :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          },
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['print', 'fullscreen'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['viewsource']
      ]"
          :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
        />

        <q-input
          hint="Add tag to describe what your question is about"
          outlined
          stack-label
          v-model="tag"
          label="Tags"
          @keyup.space="addTags"
        />
        <div>
          <q-btn
            class="tag"
            :label="tag"
            size="sm"
            v-for="(tag,i) in tags"
            :key="i"
            @click="removeTag(tag)"
          />
        </div>
        <div style="margin-top: 25px;">
          <q-btn label="Post" unelevated size="15px" no-caps type="submit" color="primary" />
          <q-btn
            label="Reset"
            unelevated
            size="15px"
            no-caps
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>

      <q-dialog
        position="top"
        v-model="notification"
        persistent
        transition-show="flip-down"
        transition-hide="flip-up"
      >
        <q-card class="bg-white text-grey">
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
    onSubmit() {
      let question = {
        title: this.title,
        question: this.question,
        tags: this.tags
      };
      this.$store
        .dispatch("postQuestion", question)
        .then(data => {
          this.title = "";
          this.question = "";
          this.tag = "";
          this.tags = [];
          (this.notification = true),
            (this.message.status = "Post Question Success");
          this.message.content = "Successfully post a question!";
          setTimeout(() => {
            this.notification = false;
            this.message.status = "";
            this.message.content = "";
            this.$router.push("/");
          }, 1000);
        })
        .catch(err => {
          (this.notification = true),
            (this.message.status = "Post Question Fail");
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
  }
};
</script>

<style scoped>
.imeg {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.cont {
  display: flex;
  justify-content: center;
  align-items: center;
}
.addd {
  background-image: url("../assets/asks.png");
  background-size: 500px;
  background-repeat: no-repeat;
  background-position-x: 200px;
}
.tags {
  display: flex;
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