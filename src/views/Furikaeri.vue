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
      <div class="point">
        <div class="level-item has-text-centered">
          <div>
            <b-field label="Point">
              <b-input v-model="input.point"></b-input>
            </b-field>
          </div>
        </div>
      </div>
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
    <div class="content" style="margin-top:20px;">
      <div class="container content has-text-justified">
        <section>
          <div
            class="field"
            v-for="furikaeri in furikaeris"
            v-bind:data="furikaeri"
            v-bind:key="furikaeri.name"
          >
            <div class="columns">
              <div class="column is-1">{{ furikaeri.name }}</div>
              <div class="column is-1">{{ furikaeri.description }}</div>
              <div class="column is-1">{{ furikaeri.point }}</div>
            </div>
            <!-- <b-field v-model="furikaeri.done">
              <span
                style="white-space:pre-wrap;"
              >{{ furikaeri.name }}:&nbsp;&nbsp;&nbsp;{{ furikaeri.description }}</span>
            </b-field> -->
          </div>
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
      furikaeris: []
    };
  },
  created: async function() {
    await this.listTodos();
  },
  methods: {
    createTodo: async function() {
      if (this.input.name !== "" || this.input.description !== "") {
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
    }
  }
};
</script>
<style scoped>
.todo-wrapper {
  /* 適宜記述 */
}
</style>