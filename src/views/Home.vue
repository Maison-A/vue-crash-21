<template>
<div>
    <AddTask v-show="showAddTask" @add-task="addTask" />
     <!--vbind the tasks to the tasks data in order to ensure its dynamic-->
     <Tasks 
     @toggle-reminder="toggleReminder"
     @delete-task="deleteTask" 
     :tasks="tasks"/>
</div>
</template>

<script>
import Tasks from '../components/Tasks'
import AddTask from '../components/AddTask'
export default {
  name: 'HomeView',
  props: {
    showAddTask: Boolean,
  },
  components: {
    Tasks,
    AddTask,
  },
  data() {
    return {
      tasks: [],
    }
  },
  methods: {
    async addTask(task) {
      const res = await fetch('api/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(task),
      })

      const data = await res.json()

      this.tasks = [...this.tasks, data]
    },
    async deleteTask(id) {
      if (confirm('Are you sure?')) {
        
        const res = await fetch(`api/tasks/${id}`, {
          method: 'DELETE',
        })
        // filter is a high level array method, this will only return
        // tasks that that are not the tasks that are being filterd 
        res.status === 200
          ? (this.tasks = this.tasks.filter((task) => task.id !== id))
          : alert('Error deleting task')
      }
    },
    async toggleReminder(id) {
      const taskToToggle = await this.fetchTask(id)
      const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

      const res = await fetch(`api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updTask),
      })

      const data = await res.json()

      //map conditional. check if proper id is passed, then return array of objects
      // where initial task properties are left but change the reminder to the opposite of 
      // its current value
      this.tasks = this.tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    },
    async fetchTasks() {
      const res = await fetch('api/tasks')

      const data = await res.json()

      return data
    },
    async fetchTask(id) {
      const res = await fetch(`api/tasks/${id}`)

      const data = await res.json()

      return data
    },
  },
  async created() {
      // wait for promise
    this.tasks = await this.fetchTasks()
  },
}
</script>