<template>
  <div class="todo">
    <div class="level-item has-text-centered">
      <b-field>
        <b-input v-model="taskText" minlength="1" maxlength="30" placeholder="タスクを入力してください"></b-input>
        <p class="control">
          <button class="button is-primary" v-on:click="addTask()">＋</button>
        </p>
      </b-field>
    </div>
    <div class="level-item has-text-centered">
      <section>
        <div class="field" v-for="task in tasks" v-bind:data="task" v-bind:key="task.text">
          <b-checkbox v-model="task.done">
            <span v-bind:class="{'done': task.done}">{{ task.message }}</span>
          </b-checkbox>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToDo",
  created: function() {
    // `this` は vm インスタンスを指します
    this.taskText = "";
  },
  methods: {
    addTask() {
      var addData = { message: this.taskText };
      this.tasks.push(addData);
      this.taskText = "";
    }
  },
  data() {
    return {
      tasks: [{ message: "タスク１" }, { message: "タスク２" }]
    };
  }
};
</script>

<style scoped>
.done {
  text-decoration: line-through;
  color: grey;
}
</style>