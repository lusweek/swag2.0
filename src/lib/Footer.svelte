<script>
	import { authStore, authHandlers } from '../stores/authStore';
	import FaInstagram from 'svelte-icons/fa/FaInstagram.svelte'

	let currentUser;
	authStore.subscribe((curr) => {
		currentUser = curr?.currentUser
	});

	function logout() {
		authHandlers.logout
		location.href='/'
	}

</script>

<section class="bg-slate-300 py-16 flex justify-evenly items-center">

	<div class="text-start	">
		<p>Email: <a href="mailto:swag.goteborg@gmail.com">swag.goteborg@gmail.com</a></p>
		<p class="">Telefon: <a href="tel: 0709301799">0709301799</a></p>
		<p>
			{#if currentUser}
			<a on:click={logout}>Logga ut</a>
			{:else}
			admin: <a href="/login">Logga in</a>
			{/if}
		</p>
	</div>
	<div class="w-9">
		<a href="https://www.instagram.com/swag_streetworkout/" target="_blank"><FaInstagram /></a>
		
	</div>

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

	a {
		text-decoration: underline;
	}
</style>
