<script>
    export let checked;
    export let handleClick;
    import { authHandlers, authStore } from '../stores/authStore';

	let currentUser;
	authStore.subscribe((curr) => {
		currentUser = curr?.currentUser
	});

</script>
{#if !currentUser}
<li on:click={handleClick}><a href="/" rel="external">Startsida</a></li> 
{/if}
<li on:click={handleClick}><a href="/kurser">Kurser</a></li>
<li on:click={handleClick}><a href="/openGym">Open gym</a></li>
<li on:click={handleClick}><a href="/evenemang">Evenemang</a></li>
<li on:click={handleClick}><a href="/anmälan" rel="external">Medlemsskap & anmälan</a></li>
{#if !currentUser}
<li on:click={handleClick}><a href="/about" rel="external">Om oss</a></li>
{/if}

<!-- <li on:click={handleClick}><a href="/login">Logga in</a></li> -->
<!-- <li on:click={handleClick}><button class="btn btn-outline primary">Logga in</button></li> -->
{#if currentUser}
<li on:click={handleClick}><a href="/members" rel="external">Medlemmar</a></li>
<li on:click={authHandlers.logout}><a>Logga ut</a></li>
{/if}
