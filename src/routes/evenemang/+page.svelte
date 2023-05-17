<script lang="ts">
	import '../../app.css';
	import { getDocs, collection } from 'firebase/firestore';
	import { db } from '$lib/firebase/firebase.client';
	import Loader from '$lib/Loader.svelte';
	import { authStore } from '../../stores/authStore';

	let currentUser;
	authStore.subscribe((curr) => {
		currentUser = curr?.currentUser;
	});

	// Gets data from firestore

	const evenemangRef = collection(db, 'evenemang');
	let evenemang: Array<object> = [];
	let isLoading = false;

	const getEvenemang = async () => {
		isLoading = true;
		const data = await getDocs(evenemangRef);
		evenemang = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
		isLoading = false;
	};
	getEvenemang();
</script>

{#if currentUser}
    <a href="/evenemang/skapaEvenemang"><button class="btn m-auto">Skapa evenemang!</button></a>
{/if}

<h1>Evenemang</h1>

{#if evenemang}
	{#each evenemang as event}
		<section class="flex items-center w-screen flex-col">
			<article
				data-theme="light"
				class="container flex flex-col items-center text-center m-6 rounded pb-6"
			>
				<h1>{event.title}</h1>
				<h2>{event.date}</h2>
				<p>{event.shortText}</p>
				<a href={`/evenemang/${event.id}`}>
					<button class="btn btn-info">Läs mer</button>
				</a>
			</article>
		</section>
	{/each}
{/if}
<Loader {isLoading} />
