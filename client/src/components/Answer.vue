<template>
  <q-list style="border-top:1px solid rgb(207, 207, 207);">
    <q-item class="container">
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

        <p rounded size="12px" style="margin: 0 0 0 25px; font-weight:bolder;">{{score}}</p>

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
        <q-item-label lines="1" class="q-mt-xs text-body2 text-primary">
          <span v-html="answer.answer"></span>
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import jwt from "jsonwebtoken";

export default {
  name: "answer",
  props: ["answer"],
  data() {
    return {
      score: 0,
      flagColor: null,
      colorUpvote: "grey-10",
      colorDownvote: "grey-10"
    };
  },
  methods: {
    // generateVoteColorUpvote() {
    //   if (this.flagColor === 1) {
    //     this.colorUpvote = "orange-14";
    //   } else if (this.flagColor === -1) {
    //     this.colorUpvote = "grey-10";
    //   } else {
    //     this.colorUpvote = "grey-10";
    //   }
    // },
    // generateVoteColorDownvote() {
    //   if (this.flagColor === -1) {
    //     this.colorDownvote = "orange-14";
    //   } else if (this.flagColor === 1) {
    //     this.colorDownvote = "grey-10";
    //   } else {
    //     this.colorDownvote = "grey-10";
    //   }
    // },
    // genereteColor() {
    //   let votes = this.answer.votes;
    //   let user = jwt.verify(localStorage.getItem("token"), "rahasia");
    //   let id = user._id;
    //   let flag;
    //   votes.forEach(vote => {
    //     if (vote.user === id) {
    //       if (vote.value === 1) {
    //         flag = 1;
    //       } else if (vote.value === -1) {
    //         flag = -1;
    //       } else {
    //         flag = 0;
    //       }
    //     }
    //   });
    //   this.flagColor = flag;
    //   this.generateVoteColorUpvote();
    //   this.generateVoteColorDownvote();
    // },
    showScore() {
      let votes = this.answer.votes;
      this.score = 0;
      votes.forEach(vote => {
        this.score += vote.value;
      });
    },
    upvote() {
      this.$store.dispatch("upvoteAnswer", this.answer._id).then(data => {
        this.$emit("fetchRequest");
        this.genereteColor();
      });
    },
    downvote() {
      this.$store.dispatch("downvoteAnswer", this.answer._id).then(data => {
        this.$emit("fetchRequest");
      });
    }
  },
  created() {
    this.showScore();
    this.genereteColor();
  },
  watch: {
    answer: function() {
      this.showScore();
      this.genereteColor();
    }
  }
};
</script>

<style scoped>
.vote {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  margin-top: 6vh;
}
.vote .vote-val {
  padding: 0;
  margin: 0;
}
.lem {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2vh;
}
</style>