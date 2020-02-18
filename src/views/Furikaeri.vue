<template>
  <div>
    <nav class="content">
      <div class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Furikaeri</p>
            <b-field label="Name">
              <b-input v-model="input.name"></b-input>
            </b-field>
          </div>
        </div>
      </div>
      <div class="level">
        <div class="level-item has-text-centered">
          <div>
            <b-field label="Content">
              <b-input v-model="input.description"></b-input>
            </b-field>
          </div>
        </div>
      </div>
      <!-- <div class="point">
        <div class="level-item has-text-centered">
          <div>
            <b-field label="Point">
              <b-input v-model="input.point"></b-input>
            </b-field>
          </div>
        </div>
      </div> -->
    </nav>
    <div class="field">
      <button class="button is-link" @click="createTodo">ADD</button>
    </div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Result</h1>
        </div>
      </div>
    </section>
    <div class="content" style="margin-top:2%;">
      <div class="container content has-text-justified">
        <section>
          <div id="app" style="margin-bottom:10%;">
            <table border="1">
              <thead>
                <th v-for="header in tableHeader" :key="header">{{header}}</th>
              </thead>
              <tr v-for="(item, index) in furikaeris" v-bind:key="item.id">
                <td>{{index}}</td>
                <td>{{item.name}}</td>
                <td>{{item.description}}</td>
                <td>{{item.point}}</td>
                <td>
                  <b-button
                    class="button is-link"
                    type="is-success"
                    @click="updatePoint(index)"
                  >ワカル!!</b-button>
                </td>
                <td>
                  <b-button
                  class="button is-link"
                  type="is-danger"
                  @click="deleteFurikaeri(item.id)"
                >x</b-button>
                </td>
              </tr>
            </table>
          </div>
          <!-- <div class="field" v-for="(item, index) in furikaeris" v-bind:key="item.id">
            <div class="columns">
              <div class="column is-1">{{ item.name }}</div>
              <div class="column is-1">{{ item.description }}</div>
              <div class="column is-1">{{ item.point }}</div>
              <div class="column is-1">
                <b-button class="button is-link" type="is-success" @click="updatePoint(index)">ワカル!!</b-button>
              </div>
              <div class="column is-0">
                <b-button
                  class="button is-link"
                  type="is-danger"
                  @click="deleteFurikaeri(item.id)"
                >x</b-button>
              </div>
            </div> -->
            <!-- <b-field v-model="furikaeri.done">
              <span
                style="white-space:pre-wrap;"
              >{{ furikaeri.name }}:&nbsp;&nbsp;&nbsp;{{ furikaeri.description }}</span>
            </b-field>-->
          <!-- </div> -->
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import * as queries from "@/graphql/queries";

export default {
  name: "furikaeri",
  data: function() {
    return {
      input: {
        name: "",
        description: ""
      },
      furikaeris: [],
      tableHeader: ["#", "名前", "内容", "ポイント", "ワカル", "削除"]
    };
  },
  created: async function() {
    await this.listTodos();
    console.log("create");
  },
  // computed: {
  //     // amountで並べ替え
  //     sortedFurikaerisByPointDesc(){
  //       // TODO pointはinteger型にしておく
  //       return this.furikaeris.slice().sort((a, b) => {
  //         return (Number(a.point) < Number(b.point)) ? 1 : (Number(a.point) > Number(b.point)) ? -1 : 0;
  //       });
  //     }
  // },
  methods: {
    createTodo: async function() {
      if (this.input.name !== "" || this.input.description !== "") {
        this.input.point = 1
        await API.graphql(
          graphqlOperation(mutations.createTodo, { input: this.input })
        ).catch(err => console.error(err));
        await this.listTodos();
      } else {
        console.info("input empty");
      }
    },
    listTodos: async function() {
      const res = await API.graphql(
        graphqlOperation(queries.listTodos)
      ).catch(err => console.error(err));
      this.furikaeris = res.data.listTodos.items;
      this.furikaeris.sort((a, b) => {
        // point 降順で並び替え
        if (Number(a.point) < Number(b.point)) return 1;
        if (Number(a.point) > Number(b.point)) return -1;
        return 0;
      });
      console.log(this.furikaeris);
    },
    updatePoint: async function(index) {
      console.log(index);
      let updateFurikaeri = this.furikaeris[index];
      updateFurikaeri.point = Number(updateFurikaeri.point) + 1;
      const res = await API.graphql(
        graphqlOperation(mutations.updateTodo, { input: updateFurikaeri })
      ).catch(err => console.error(err));
      console.log(res);
      await this.listTodos();
    },
    deleteFurikaeri: async function(id) {
      console.log(id);
      // const updateFurikaeri = this.furikaeris[index]
      const res = await API.graphql(
        graphqlOperation(mutations.deleteTodo, { input: { id } })
      ).catch(err => console.error(err));
      console.log(res);
      await this.listTodos();
    }
  }
};
</script>
<style scoped>
.todo-wrapper {
  /* 適宜記述 */
}
</style>