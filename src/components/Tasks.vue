<!-- eslint-disable vue/no-multiple-template-root -->
<!---------    MAIN       --------->
<template>
<div>
    <!--loop through tasks data-->
      <div  v-for="task in tasks" :key="task.id">
    <Task @toggle-reminder="$emit('toggle-reminder',task.id)" 
    @delete-task="$emit('delete-task',task.id)" :task="task"/>
    <!-- <Task
      @toggle-reminder="$emit('toggle-reminder', task.id)"
      @delete-task="$emit('delete-task', task.id)"
      :task="task" -->
  </div>
    <!-- <div :key="task.id" v-for="task in tasks">
    <Task :task="task"/>
    </div> -->

</div>
    
</template>

<!---------    SCRIPT       --------->
<script>
import Task from './Task'

    export default{
        name: 'Tasks-component',
        props:{
            tasks: Array
        },
        components:{
            Task
        },
        emits:['delete-task','toggle-reminder']
    }
</script>

<!---------    STYLE       --------->