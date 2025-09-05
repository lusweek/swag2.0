<script>
	import { authStore, authHandlers } from '../stores/authStore';
	import FaInstagram from 'svelte-icons/fa/FaInstagram.svelte'
	import Loader from './Loader.svelte';

	let currentUser;
	authStore.subscribe((curr) => {
		currentUser = curr?.currentUser
	});

  let isLoading = false;

  function handleLoader() {
    isLoading = true;

    setTimeout(() => {
      isLoading = false;
    }, 2000); // 2 sekunder
  }

</script>

<section class="bg-slate-300 py-16 flex justify-evenly items-center">

	<div class="text-start	">
		<p>Email: <a 
			on:click={handleLoader} 
			href="mailto:swag.goteborg@gmail.com">swag.goteborg@gmail.com</a></p>
		<p class="">Telefon: <a href="tel: 0709301799">0709301799</a></p>
		<p>
			{#if currentUser}
			<a on:click={authHandlers.logout}>Logga ut</a>
			{:else}
			Admin: <a href="/login">Logga in</a>
			{/if}
		</p>
		<p><a on:click={handleLoader}
			href="mailto:lukash@live.se?subject=Rapportering av fel på SWAG-hemsidan&body=Jag har upptäckt ett fel på er hemsida. Beskriv exakt vad felet är och skicka gärna med bilder. Tack så mycket!"
			>Rapportera fel på hemsidan</a>
		</p>

	</div>
	<div class="w-9">
		<a href="https://www.instagram.com/swag_streetworkout/" target="_blank"><FaInstagram /></a>
		
	</div>

      <Loader isLoading={isLoading} />
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
		cursor: pointer;
	}
</style>
