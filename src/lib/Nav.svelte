<script>
	import NavContent from './NavContent.svelte';
	let checked = '';

	function handleClick() {
		checked = ''
	}
</script>

<div class="navbar bg-base-100 fixed z-30 ">
	<div class="flex-1">
		<a href="/" class="h-full normal-case text-xl">
			<img class="h-14 pl-6" src="/img/swag_logo_vector_02.svg" alt="Swags logga">
		</a>
	</div>
	<div class="flex-none">
		<!-- Visar menyn i navbaren -->
		<div class="md:flex hidden">
			<ul class="menu menu-horizontal px-1 md:flex hidden">
			<NavContent checked={checked} handleClick={handleClick} />
			</ul>
		</div>
		<!-- Visar hamburjaren -->
		<label for="my-drawer-4" class="drawer-button btn btn-primary md:hidden" >
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
		
		
	</div>
</div>


<div class="drawer drawer-end fixed {checked ? "z-30" : "z--1"} ">
	<input bind:checked={checked} id="my-drawer-4" type="checkbox" class="drawer-toggle md:hidden"/>
	<div class="drawer-content">
	  <!-- Page content here -->
	</div> 
	<div class="drawer-side">
	  <label for="my-drawer-4" class="drawer-overlay"></label>
	  <ul class="menu p-4 w-80 bg-base-100 text-base-content place-content-stretch">
		<NavContent checked={checked} handleClick={handleClick}/>
	  </ul>
	</div>
  </div>


  <style>
	.fixed{
		position: fixed;
	}
	.z--1{
		z-index: -1;
	}
  </style>