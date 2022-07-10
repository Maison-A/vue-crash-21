<!---------    MAIN       --------->
<template>
  <div class="container">    
    <Header @toggle-add-task="toggleAddTask" 
    title="Task Tracker"
    :showAddTask="showAddTask"/>
   
   <div v-show="showAddTask">
      <AddTask @add-task="addTask" />
    </div>
   
   <!--vbind the tasks to the tasks data in order to ensure its dynamic-->
   <Tasks @toggle-reminder="toggleReminder"
    @delete-task="deleteTask" :tasks="tasks"/>
  </div>
</template>

<!---------    SCRIPT       --------->
<script>
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

export default {
  name: 'App',
  components: {
    Header,
    Tasks,
    AddTask
  },
  data(){
    return{
      // use a life cycle method
      tasks: [],
      showAddTask: false
    }
  },
  methods:
  {
    toggleAddTask(){
      this.showAddTask = !this.showAddTask
    },
   async addTask(task){
    const res = await fetch('api/tasks',{method: 'POST',
   
   headers:{
      'Content-type': 'application/json',
      body: JSON.stringify(task)
    }})
    const data = await res.json()
      this.tasks=[...this.tasks, data]
    },
    deleteTask(id)
    {
      if(confirm('Are you sure?')){
        // filter is a high level array method, this will only return
        // tasks that that are not the tasks that are being filterd 
        this.tasks=this.tasks.filter((task)=>task.id !== id)

      }
    },
    toggleReminder(id){
      //map conditional. check if proper id is passed, then return array of objects
      // where initial task properties are left but change the reminder to the opposite of 
      // its current value
      this.tasks = this.tasks.map((task)=> task.id === id ? {...task, reminder: !task.reminder} : task)
    },
    async fetchTasks()
    {
      const res = await fetch('api/tasks')
      const data = await res.json()
      return data
    },
    
    async fetchTask(id)
    {
      const res = await fetch(`api/tasks/${id}`)
      const data = await res.json()
      return data
    }
  },
  async created()
  {
    // wait for promise
    this.tasks = await this.fetchTasks()
  }
}
</script>

<!---------    STYLE       --------->
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Poppins', sans-serif;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
