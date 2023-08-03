<script lang="ts">
	import '../../app.css';
	import { getDocs, collection } from 'firebase/firestore';
	import { db } from '$lib/firebase/firebase.client';
	import Loader from '$lib/Loader.svelte';
	import { authStore } from '../../stores/authStore';
	import { getStorage, ref, getDownloadURL } from "firebase/storage";

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

	// Hämtar bild från firebase Storage

	const storage = getStorage();
	function getImage(id) {
			getDownloadURL(ref(storage, `${id}.jpg`))
			.then((url) => {
			document.getElementById(id)?.setAttribute('src', url)
			})
	}

</script>

{#if currentUser}
	<a href="/evenemang/skapaEvenemang"><button class="btn m-auto">Skapa evenemang!</button></a>
{/if}

<h1>Evenemang</h1>

{#if evenemang}
	{#each evenemang as event}
	{getImage(event.id)}
		<section class="flex items-center w-screen flex-col">
			<article
				data-theme="light"
				class="container flex flex-col items-center text-center m-6 rounded pb-6"
			>
				<h1>{event.title}</h1>
				<h2>{event.date}</h2>
				<p>{event.shortText}</p>

				<!-- Ta bort detta nedanför och lägg tillbaks knappen när
				det går att uppdatera medlem i prod. Samma problem här
				som där. -->

				<div class="lg:flex p-2 lg:p-8">
						<img id={event.id} class="w-1/3 h-1/3 m-auto lg:w-1/5 lg:w-1/5" alt="Bild på event" />
					<p>{event.text}</p>
				</div>

				<!-- <a href={`/evenemang/${event.id}`}>
					<button class="btn btn-info">Läs mer</button>
				 </a> -->
			</article>
		</section>
	{/each}
{/if}
<Loader {isLoading} />
