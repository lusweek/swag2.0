<script lang="ts">
    export let message: object
</script>


<div class="bg">
    <div class="wrapper">
        <h1 class="headder">{message.headder}</h1>
        {#each message.texts as text}
            <p>{text}</p>
        {/each}
    </div>
</div>



<style>
.bg{
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 30;
}
.wrapper{
    padding: 20px 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: white;
}

</style>