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

		try {
			const data = await getDocs(evenemangRef);
			const _imageUrls = await getImagesFromFolder('evenemang');
			evenemang = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

			evenemang = evenemang.map((event) => {
				const URL_Encoded = encodeURI(event.title)
				let image = _imageUrls.find((element) => element.includes(URL_Encoded))
				return { ...event, image }
				});
		} catch (error) {
			console.error('Error retrieving events:', error);
		} finally {
			isLoading = false;
		}

	};
	getEvenemang();
	console.log(evenemang)

</script>

<div class="sw sw-page">
<section class="sw-subhero">
	<div class="sw-wrap">
		<span class="sw-eyebrow">/ Evenemang</span>
		<h1>Evenemang</h1>
		<p>
			Tävlingar, jams och träffar. SWAG har arrangerat sverigemästerskap i calisthenics
			och vårt eget swagmästerskap.
		</p>
		{#if currentUser}
			<div class="ev-admin">
				<a href="/evenemang/skapaEvenemang" class="sw-cta-link">+ Skapa evenemang</a>
			</div>
		{/if}
	</div>
</section>

{#if evenemang.length > 0}
	<section class="sw-wrap ev-list">
		{#each evenemang as event, index}
			<article class="sw-sheet ev-card">
				<span class="ev-date">{event.date}</span>
				<h1>{event.title}</h1>
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

				<div class="ev-body">
					{#if event.image}
						<div class="sw-photo ev-photo"><img src={event.image} alt="Bild på event" /></div>
					{/if}

					<p class="ev-text">{event.text}</p>
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
		{/each}
	</section>
{:else}
	<section class="sw-wrap ev-empty">
		<h2>Inga kommande evenemang</h2>
		<p>Håll utkik — nästa event dyker snart upp här.</p>
	</section>
{/if}
<Loader {isLoading} />
</div>

<style>
	.ev-admin {
		margin-top: 28px;
	}
	.ev-list {
		padding: 56px 0;
		display: flex;
		flex-direction: column;
		gap: 32px;
	}
	.ev-card {
		margin: 0 auto;
		width: 100%;
	}
	.ev-date {
		font-family: var(--f-mono);
		font-size: 12px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--yellow-deep);
	}
	.ev-body {
		display: flex;
		gap: 28px;
		flex-wrap: wrap;
		align-items: flex-start;
		margin-top: 12px;
	}
	.ev-photo {
		width: 280px;
		max-width: 100%;
		aspect-ratio: 4 / 5;
		flex-shrink: 0;
	}
	.ev-text {
		flex: 1;
		min-width: 260px;
	}
	.ev-empty {
		padding: 96px 0;
		text-align: center;
	}
	.ev-empty h2 {
		font-family: var(--f-display);
		font-weight: 800;
		font-size: clamp(32px, 5vw, 64px);
		text-transform: uppercase;
		color: var(--ink);
		margin: 0 0 12px;
	}
	.ev-empty p {
		color: var(--ink-3);
		font-family: var(--f-mono);
		letter-spacing: 0.04em;
	}
</style>
