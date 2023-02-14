<script lang="ts" >
import Nav from "../lib/Nav.svelte";

// $: är som useEffect, när windowWidth ändras körs det som kommer efter 
    // $:windowWidth, handleInnerWidth;

</script>
<nav data-theme="business">
    <Nav />
</nav>

<slot data-theme="business" />

<style>
    nav{
        height: 60px;
    }
</style>