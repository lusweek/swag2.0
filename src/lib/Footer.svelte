<script>
	import { authStore, authHandlers } from '../stores/authStore';
	import FaInstagram from 'svelte-icons/fa/FaInstagram.svelte';
	import Loader from './Loader.svelte';

	let currentUser;
	authStore.subscribe((curr) => {
		currentUser = curr?.currentUser;
	});

	let isLoading = false;

	function handleLoader() {
		isLoading = true;
		setTimeout(() => {
			isLoading = false;
		}, 2000); // 2 sekunder
	}
</script>

<footer class="sw-footer">
	<div class="sw-wrap">
		<div class="sw-footer-grid">
			<div>
				<div class="sw-nav-brand" style="margin-bottom:20px">
					<img src="/img/swag_logo_vector_02.svg" alt="SWAG logga" />
					SWAG
				</div>
				<p style="max-width:36ch; font-size:14px; color:var(--chalk-2); margin:0">
					Street Workout Athletes Gothenburg. Ideell förening för calisthenics,
					kroppsviktsträning och träningsglädje i Göteborg.
				</p>
			</div>

			<div>
				<h4>Sidor</h4>
				<ul>
					<li><a href="/" rel="external">Startsida</a></li>
					<li><a href="/kurser">Kurser</a></li>
					<li><a href="/openGym">Open gym</a></li>
					<li><a href="/evenemang">Evenemang</a></li>
					<li><a href="/about" rel="external">Om oss</a></li>
				</ul>
			</div>

			<div>
				<h4>Kontakt</h4>
				<ul>
					<li>
						<a on:click={handleLoader} href="mailto:swag.goteborg@gmail.com"
							>swag.goteborg@gmail.com</a
						>
					</li>
					<li><a href="tel:0709301799">0709301799</a></li>
					<li>
						{#if currentUser}
							<a on:click={authHandlers.logout}>Logga ut</a>
						{:else}
							<a href="/login" rel="external">Admin: Logga in</a>
						{/if}
					</li>
					<li>
						<a
							on:click={handleLoader}
							href="mailto:lukash@live.se?subject=Rapportering av fel på SWAG-hemsidan&body=Jag har upptäckt ett fel på er hemsida. Beskriv exakt vad felet är och skicka gärna med bilder. Tack så mycket!"
							>Rapportera fel</a
						>
					</li>
				</ul>
			</div>

			<div>
				<h4>Följ</h4>
				<ul>
					<li>
						<a
							href="https://www.instagram.com/swag_streetworkout/"
							target="_blank"
							rel="noreferrer">Instagram</a
						>
					</li>
				</ul>
				<a
					class="sw-footer-ig"
					href="https://www.instagram.com/swag_streetworkout/"
					target="_blank"
					rel="noreferrer"
					aria-label="SWAG på Instagram"
				>
					<span class="sw-footer-ig-icon"><FaInstagram /></span>
				</a>
			</div>
		</div>

		<div class="sw-footer-bottom">
			<span>© 2026 SWAG · Street Workout Athletes Gothenburg</span>
			<span>Tränad i Göteborg · Byggd för gravitation</span>
		</div>
	</div>

	<div class="sw-footer-mega" aria-hidden="true">SWAG</div>
</footer>

<Loader {isLoading} />

<style>
	.sw-footer-ig {
		display: inline-flex;
		margin-top: 16px;
		color: var(--cream);
	}
	.sw-footer-ig:hover {
		color: var(--yellow);
	}
	.sw-footer-ig-icon {
		display: block;
		width: 28px;
		height: 28px;
	}
</style>
