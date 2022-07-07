<!---------    MAIN       --------->
<template>
    <header>
        <h1>{{title}}</h1>
        <Button text="Add Task" color="green"/>        
    </header>
</template>

<!---------    SCRIPT       --------->
<script>
import Button from './Button'

export default{
    name:'Header-component',
    props: 
    { 
        title: String,
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