<script>
	import { authStore, authHandlers } from '../stores/authStore';

	let currentUser;
	authStore.subscribe((curr) => {
		currentUser = curr?.currentUser
	});
</script>

<section class="bg-slate-300 py-16 link">
	{#if currentUser}
	<a on:click={authHandlers.logout}>Logga ut</a>
	{:else}
	<a href="/login">Logga in</a>
	{/if}
</section>

<style>
	section {
		position: relative;
		left: 0;
		bottom: 0;
		width: 100%;
		color: white;
		background-color: #303030;
		text-align: center;
		margin-top: 100px;
	}
</style>
