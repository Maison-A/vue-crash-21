<!---------    MAIN       --------->
<template>
    <header>
        <h1>{{title}}</h1>
        <Button @btnClick="$emit('toggle-add-task')" 
        :text="showAddTask ? 'Close' : 'Add Task'" 
        :color= "showAddTask ? 'red' : 'green'"/>        
    </header>
</template>

<!---------    SCRIPT       --------->
<script>
import Button from './Button'

export default{
    name:'HeaderComponent',
    props: 
    { 
        title: String,
        showAddTask: Boolean
    },        
    components:
    {
        Button,
    }
 }

</script>

<!---------    STYLE       --------->
<style scoped>
    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
</style>