<template>
  <q-btn-dropdown color="orange-6" size="sm" label="manage" style="width:80px; height: 9px;">
    <!-- <q-btn-dropdown  flat round style="width:12px; height:12px; padding: 5px;"> -->
    <q-list>
      <q-item clickable @click="toEdit">
        <q-item-section avatar>
          <q-avatar icon="brush" color="primary" text-color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Edit</q-item-label>
          <q-item-label caption>Update your question</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable @click="toDelete">
        <q-item-section avatar>
          <q-avatar icon="delete" color="warning" text-color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Delete</q-item-label>
          <q-item-label caption>delete your question</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="info" color="amber" />
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="warning" text-color="white" />
          <span class="q-ml-sm">Are you sure? Once deleted you cant callback your question!</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="orange-6" v-close-popup />
          <q-btn
            flat
            label="Delete Question"
            color="orange-6"
            :outline="true"
            v-close-popup
            @click="deleteQuestion"
          />
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
  </q-btn-dropdown>
</template>

<script>
export default {
  name: "dropdownQuestion",
  props: ["question"],
  data() {
    return {
      confirm: false,
      notification: false,
      message: {
        status: "",
        content: ""
      }
    };
  },
  methods: {
    toDelete() {
      this.confirm = true;
    },
    toEdit() {
      this.$router.push(`/editquestion/${this.question._id}`);
    },
    deleteQuestion() {
      this.$store
        .dispatch("deleteQuestion", this.question._id)
        .then(data => {
          this.notification = true;
          this.message.status = "Success delete question!";
          this.message.content = `Successfully deleted question. Write another!`;
          setTimeout(() => {
            this.notification = false;
            this.message.status = "";
            this.message.content = ``;
          }, 2000);
        })
        .catch(err => {
          this.notification = true;
          this.message.status = "Failed to delete question!";
          this.message.content = `Oops something wrong! Maybe ${err.data.message}`;
          setTimeout(() => {
            this.notification = false;
            this.message.status = "";
            this.message.content = ``;
          }, 2000);
        });
    }
  }
};
</script>

<style>
</style>