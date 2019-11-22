import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    loggedId: '',
    questions: [],
    trendingTags: [],
    userQuestion: {
      status: false,
      data: []
    },
    userAnswer: [],
    isAnswer: false,
    search: ''
  },
  mutations: {
    LOGIN(state, payload) {
      state.isLogin = payload;
    },
    LOGOUT(state) {
      state.user = null;
      state.isLogin = false
      localStorage.removeItem("token");
    },
    SEARCHTRIGGER(state, payload) {
      state.search = payload
    },
    SEEALL(state, payload) {
      state.userQuestion.data = [],
        state.userQuestion.status = false
      state.isAnswer = false
      state.search = ''
    },
    FETCHQUESTION(state, payload) {
      state.questions = payload
      let questions = []
      payload.forEach(question => {
        let newAnswer = 'hello'
        let score = 0
        question.votes.forEach(vote => {
          score += vote.value
        })
        let obj = {
          ...question,
          score,
          newAnswer
        }
        questions.push(obj)
      })
      state.questions = questions
    },
    FETCHTRENDINGTAG(state, data) {
      state.trendingTags = data
    },
    FETCHUSERQUESTION(state, data) {
      let questions = [];
      data.forEach(question => {
        let obj = {}
        let score = 0
        question.votes.forEach(vote => {
          score += vote.value
        })
        obj = {
          ...question,
          score
        }
        questions.push(obj)
      })
      state.userQuestion.data = questions;
      state.userQuestion.status = true;
      state.isAnswer = false
    },
    FETCHANSWERUSER(state, data) {
      state.userAnswer = data
      state.isAnswer = true
    }
  },
  actions: {
    auth(context, payload) {
      if (localStorage.getItem("token")) {
        context.commit("LOGIN", true)
      } else {
        context.commit("LOGIN", false)
      }
    },
    login(context, user) {
      return Axios({
        method: "post",
        url: "http://54.169.133.84/user/login",
        data: user
      });
    },
    register(context, user) {
      return Axios({
        method: "post",
        url: "http://54.169.133.84/user/register",
        data: user
      });
    },
    postQuestion(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'post',
          url: 'http://54.169.133.84/question/',
          data: payload,
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    patchQuestion(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'patch',
          url: `http://54.169.133.84/question/${payload.id}`,
          data: payload.question,
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            context.dispatch('fetchQuestion')
            context.dispatch('fetchUserQuestion')
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    fetchQuestion(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'get',
          url: 'http://54.169.133.84/question/',
        })
          .then(({ data }) => {
            context.commit('FETCHQUESTION', data)
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    fetchTrendingTag(context, payload) {
      Axios({
        method: 'get',
        url: `http://54.169.133.84/question/tag`
      })
        .then(({ data }) => {
          context.commit('FETCHTRENDINGTAG', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    fetchUserQuestion(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'get',
          url: `http://54.169.133.84/question/user`,
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            context.commit('FETCHUSERQUESTION', data)
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    upvoteQuestion(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'patch',
          url: `http://54.169.133.84/question/upvote/${payload}`,
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            context.dispatch('fetchQuestion')
            if (context.state.userQuestion.status) {
              context.dispatch('fetchUserQuestion')
            }
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    downvoteQuestion(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'patch',
          url: `http://54.169.133.84/question/downvote/${payload}`,
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            context.dispatch('fetchQuestion')
            if (context.state.userQuestion.status) {
              context.dispatch('fetchUserQuestion')
            }
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    answer(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'post',
          url: `http://54.169.133.84/answer/${payload.questionId}`,
          data: {
            answer: payload.answer
          },
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    upvoteAnswer(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'patch',
          url: `http://54.169.133.84/answer/upvote/${payload}`,
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    downvoteAnswer(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'patch',
          url: `http://54.169.133.84/answer/downvote/${payload}`,
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    deleteQuestion(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'delete',
          url: `http://54.169.133.84/question/${payload}`,
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            context.dispatch('fetchUserQuestion')
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    fetchAnswerUser(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: "get",
          url: 'http://54.169.133.84/answer',
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            context.commit('FETCHANSWERUSER', data)
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    patchAnswer(context, payload) {
      return new Promise(function (resolve, reject) {
        Axios({
          method: 'patch',
          url: `http://54.169.133.84/answer/${payload.id}`,
          data: { answer: payload.answer },
          headers: { token: localStorage.getItem('token') }
        })
          .then(({ data }) => {
            context.dispatch('fetchAnswerUser')
            resolve(data)
          })
          .catch(({ response }) => {
            reject(data)
          })
      })
    },

  },
  modules: {
  }
})
