<script lang="ts">
	import '../../app.css';
	import { getDocs, collection } from 'firebase/firestore';
	import { db } from '$lib/firebase/firebase.client';
	import Loader from '$lib/Loader.svelte';
	import { authStore } from '../../stores/authStore';
	import { getStorage, ref, getDownloadURL } from "firebase/storage";
	import { getImagesFromFolder } from '$lib/imageFetcher'
	import { onMount } from 'svelte';
	import Cms from '$lib/CMS/Cms.svelte';

	let currentUser: any;
	authStore.subscribe((curr) => {
		currentUser = curr?.currentUser;
	});

	// Gets data from firestore

	const evenemangRef = collection(db, 'evenemang');
	let evenemang: Array<object> = [];
	let imageUrls = [];
	let isLoading = false;

	const getEvenemang = async () => {
		isLoading = true;

		const data = await getDocs(evenemangRef);
		const _imageUrls = await getImagesFromFolder('evenemang');
		evenemang = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			
		evenemang = evenemang.map((event) => {
			const URL_Encoded = encodeURI(event.title) 
			let image = _imageUrls.find((element) => element.includes(URL_Encoded)) 
			return { ...event, image }
			});
		
		isLoading = false;

	};
	getEvenemang();
	console.log(evenemang)

</script>

{#if currentUser}
	<a href="/evenemang/skapaEvenemang"><button class="btn m-auto">Skapa evenemang!</button></a>
{/if}

<h1>Evenemang</h1>

{#if evenemang.length > 0}
	{#each evenemang as event, index}
		<section class="flex items-center w-screen flex-col">
			<article
				data-theme="light"
				class="container flex flex-col items-center text-center m-6 rounded pb-6"
			>
				<h1>{event.title}</h1>
				<h2>{event.date}</h2>
				<Cms 
					type={'evenemangText'} 
					rows={7}
					value={event.shortText}
					collection={'evenemang'}
					FBDocument={event.id}
					FBField={'date'}
					FBObjectKey={null}
					prevArray={null}
					prevObjectField={null}
					index={null}
					getData={getEvenemang}
				/>
				<p>{event.shortText}</p>
				<Cms 
					type={'evenemangText'} 
					rows={7}
					value={event.shortText}
					collection={'evenemang'}
					FBDocument={event.id}
					FBField={'shortText'}
					FBObjectKey={null}
					prevArray={null}
					prevObjectField={null}
					index={null}
					getData={getEvenemang}
				/>

				<div class="lg:flex p-2 lg:p-8">
					{#if event.image}
						<img src={event.image} class="w-1/3 h-1/3 m-auto lg:w-1/5 lg:w-1/5" alt="Bild på event" />
					{/if}

					<p>{event.text}</p>
					<Cms 
						type={'evenemangText'} 
						rows={7}
						value={event.text}
						collection={'evenemang'}
						FBDocument={event.id}
						FBField={'text'}
						FBObjectKey={null}
						prevArray={null}
						prevObjectField={null}
						index={null}
						getData={getEvenemang}
					/>
				</div>

			</article>
		</section>
	{/each}

{:else}
<h1>Inga kommande evenemang.</h1>

{/if}
<Loader {isLoading} />
