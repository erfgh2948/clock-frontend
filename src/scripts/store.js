
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      account:{
        id:0
      },
      filter:[
        {id:1,identifier:'레드와인',isOn:false},
        {id:2,identifier:'화이트와인',isOn:false},
        {id:3,identifier:'스파클링',isOn:false},
        {id:4,identifier:'로제와인',isOn:false},
        {id:5,identifier:'기타와인',isOn:false},
        {id:6,identifier:'기타와인',isOn:false},
        //...filter에 음식 등등이 들어갈수 있음.
      ],
      todos: [//for example
        { id: 1, text: '...', done: true },
        { id: 2, text: '...', done: false }
      ],

    }
  },
  mutations: {
    setAccount(state, payload) {//payload가 오면 state.account.id에 세팅한다.
      state.account.id = payload
    },
    setFilterTrue(state, payload) {
      for (var k of state.filter) {//for문 돌려서 CheckBox.vue 에서 payload로 입력받은 identifier를 비교하여 같으면 true를 주어 저장한다. 확인은 home.vue의 testStoreGetters()
        if (k.identifier == payload) {
          state.filter[k.id - 1].isOn = true;
        }
      }
    },
    setFilterFalse(state, payload) {
      for (var k of state.filter) {
        if (k.identifier == payload) {
          state.filter[k.id - 1].isOn = false;
        }
      }
    },

  },
  getters: {
    getFilter (state) {
      return state.filter
    },
    doneTodos (state) {//for example
      return state.todos.filter(todo => todo.done)
    },
      
  }
})
export default store;