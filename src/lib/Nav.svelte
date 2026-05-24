<script>
	import NavContent from './NavContent.svelte';

	let open = false;
	const closeDrawer = () => (open = false);
</script>

<header class="sw-nav">
	<div class="sw-nav-inner">
		<a class="sw-nav-brand" href="/" rel="external">
			<img src="/img/swag_logo_vector_02.svg" alt="SWAG logga" />
			SWAG
		</a>

		<nav>
			<ul class="sw-nav-links">
				<NavContent />
			</ul>
		</nav>

		<a class="sw-nav-cta" href="/anmälan" rel="external">
			Bli medlem
			<span aria-hidden="true">→</span>
		</a>

		<button
			class="sw-nav-burger"
			aria-label="Meny"
			aria-expanded={open}
			on:click={() => (open = !open)}
		>
			<svg viewBox="0 0 24 24" fill="none" width="20" height="20" class="stroke-current">
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-width="2"
					d={open ? 'M5 5l14 14M19 5L5 19' : 'M4 6h16M4 12h16M4 18h16'}
				/>
			</svg>
		</button>
	</div>

	<div class="sw-nav-mobile" class:open>
		<ul>
			<NavContent handleClick={closeDrawer} />
		</ul>
	</div>
</header>

<slot />
