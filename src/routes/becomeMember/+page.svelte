<!-- <script lang="ts">
	import { collection, addDoc } from 'firebase/firestore';
	import { db } from '$lib/firebase/firebase.client';
	import CupcakeArticle from '$lib/CupcakeArticle.svelte';


    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	// Adds document to firestore

	const membersRef = collection(db, 'members');

	const createStaff = async () => {
		await addDoc(membersRef, {
			fName: '',
			lName: '',
			adress: '',
			email: '',
			postNr: Number(),
			birth: Number(),
			tel: Number(),
			message: ''
		});
	};

// ===== SuperForms ===== //
	export let data: PageData;

	// Client API:
	const { form, errors, constraints } = superForm(data.form);
    
</script>

<section class="w-screen flex flex-col items-center lg:flex lg:flex-col lg:items-center mx-auto">
	<CupcakeArticle>
		<h1>Bli medlem i swag</h1>

		<SuperDebug data={$form} />

		<form method="POST">
			<label for="name">Name</label>
			<input
				type="text"
				name="name"
				data-invalid={$errors.name}
				bind:value={$form.name}
				{...$constraints.name}
			/>
			{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
		
			<label for="email">E-mail</label>
			<input
				type="email"
				name="email"
				data-invalid={$errors.email}
				bind:value={$form.email}
				{...$constraints.email}
			/>
			{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}
		
			<div><button>Submit</button></div>
		</form>
		
		<style>
			.invalid {
				color: red;
			}
		</style>
		

	</CupcakeArticle>
</section> -->
