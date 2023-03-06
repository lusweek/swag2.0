<script lang="ts" >
import Nav from "../lib/Nav.svelte";

let lastScrollPosition = 0
let showNav = true

</script>

<!-- Scroll animation function -->
<svelte:window on:scroll={()=>{
    var currentScrollposition = window.pageYOffset || document.documentElement.scrollTop; //Get current scroll position
    if (currentScrollposition > lastScrollPosition) {
    showNav = false
    }else{ 
    showNav = true
    }
    lastScrollPosition = currentScrollposition;
    }}></svelte:window>


<nav 
data-theme="business"
class="nav navbar {showNav == true? "show": "hide" }"
>
    <Nav />
</nav>

<slot data-theme="business" />

<style>

nav{
    transition: 0.5s ease-out;
    position: fixed;
    z-index: 50;
}

.hide{
    top: -80px;
}
.show{
    top: 0px;
}


</style>