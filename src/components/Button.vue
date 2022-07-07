<!---------    MAIN       --------->
<template>
    <button @click="onClick()" :style="{background: color}"
            class="btn">{{text}}
    </button>
</template>

<!---------    SCRIPT       --------->
<script>
    export default{
        name: 'Button-component',   
        props:
        {
            text: String,
            color: String
        },
        methods:
        {
            onClick()
            {
                console.log('click')
            },
        }     
    }
</script>
