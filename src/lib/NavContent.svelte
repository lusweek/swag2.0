<script>
    export let checked;
    export let handleClick;
    import { authHandlers, authStore } from '../stores/authStore';

	let currentUser;
	authStore.subscribe((curr) => {
		currentUser = curr?.currentUser
	});

</script>

<li on:click={handleClick}><a href="/">Startsida</a></li> 
<li on:click={handleClick}><a href="/kurser">Open gym & kurser</a></li>
<li on:click={handleClick}><a href="/about">Om oss</a></li>
<!-- <li on:click={handleClick}><a href="/evenumang">Evenumang</a></li> -->
<!-- <li on:click={handleClick}><a href="/anmälan">Anmälan</a></li> -->
<!-- <li on:click={handleClick}><a href="/login">Logga in</a></li> -->
<!-- <li on:click={handleClick}><button class="btn btn-outline primary">Logga in</button></li> -->
{#if currentUser}
<li on:click={handleClick}><a  on:click={authHandlers.logout}>Logga ut</a></li>
{/if}
