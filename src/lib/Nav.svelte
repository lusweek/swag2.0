<script>
	import NavContent from './NavContent.svelte';
	
	let checked = false;
	const closeDrawer = () => checked = false;

</script>


<div class="drawer drawer-end">
	<input id="new-drawer" type="checkbox" bind:checked={checked} class="drawer-toggle" />
	<div class="drawer-content">
		<div class="sticky top-0 z-30 flex justify-center w-full h-16 shadow-sm">
			<nav id="navbar" class="navbar nav sticky bg-base-100">
				<div class="flex-1 justify-between">
					<a href="/"><img src="/img/swag_logo_vector_02.svg" alt="Swag logga"></a> 
					<ul class="menu menu-horizontal hidden md:flex">
						<NavContent />
					</ul>
				</div>
					<div class="flex-end">
					<span
					class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
					data-tip="Menu"
				>
					<label class="btn btn-square btn-ghost drawer-button md:hidden" for="new-drawer">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="inline-block w-5 h-5 stroke-current"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/></svg
						>
					</label>
				</span>

				</div>
			
			</nav>
		</div>
		<slot />
	</div>
	<div class="drawer-side">
		<label class="drawer-overlay" for="new-drawer" />
		<ul class="menu p-4 w-80 bg-base-100 text-base-content">
			<NavContent handleClick={closeDrawer} />
		</ul>
	</div>
</div>

<style>
nav{
transition: 0.5s ease-out;
}

.hide{
    display: none;
}
.show{
    display: flex;
}

img{
	height: 55px;
	margin-left: 10px;
}
</style>
