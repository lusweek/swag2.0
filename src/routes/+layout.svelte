<script lang="ts">
	import Nav from '../lib/Nav.svelte';

	// let lastScrollPosition = 0;
	// let showNav = true;
</script>

<!-- Scroll animation function -->
<!-- <svelte:window on:scroll={()=>{
	console.log('körs 3');
    var currentScrollposition = window.pageYOffset || document.documentElement.scrollTop; //Get current scroll position
    if (currentScrollposition > lastScrollPosition) {
    showNav = false
    }else{ 
    showNav = true
    }
    lastScrollPosition = currentScrollposition;
    }}></svelte:window> -->

<!-- <nav 
data-theme="business"
class="nav navbar {showNav == true? "show": "hide" }"
> -->
<Nav>
	<slot data-theme="business" />
</Nav>
<!-- </nav> -->
