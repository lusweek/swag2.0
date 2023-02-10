<script lang="ts">
import Nav from "../lib/Nav.svelte";

// $: är som useEffect, när windowWidth ändras körs det som kommer efter 
    // $:windowWidth, handleInnerWidth;

</script>
<nav>
    <Nav />
</nav>

<slot />

<style>
    nav{
        height: 60px;
    }
</style>