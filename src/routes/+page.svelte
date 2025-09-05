<script>
	import Section from '$lib/Section.svelte';
	import CallToActionCard from '../lib/CallToActionCard.svelte';
	import BasicCard from '$lib/cards/BasicCard.svelte';
	import Splide from '$lib/Splide.svelte';
	import CardImageSide from '$lib/cards/CardImageSide.svelte';
	import Carusel2 from '$lib/Carusel2.svelte';

	// document.body.scrollIntoView();

	// Hämtar bilder till bildspelet
	import { getImagesFromFolder } from '$lib/imageFetcher';

	let images = [];

	async function getImages() {
		images = await getImagesFromFolder('startsida_carusel');
	}
	getImages();

	// Video

	const VIDEO_ID = 'E71aiXf2UmY';
	const src =
		`https://www.youtube.com/embed/${VIDEO_ID}?` +
		new URLSearchParams({
			autoplay: '1', // starta direkt
			mute: '1', // krävs för autoplay i de flesta webbläsare
			controls: '0', // inga kontroller
			rel: '0', // visa inte relaterade videos i slutet
			fs: '0', // ingen fullskärmknapp
			modestbranding: '1',
			disablekb: '1', // ignorera tangentbord (space etc.)
			playsinline: '1', // iOS: spela inline
			loop: '1', // loopa
			playlist: VIDEO_ID, // krävs för loop
			iv_load_policy: '3' // dölj annotations
		}).toString();
</script>

<Section>
	<article class="relative mb-10">
		<img src="/img/Backround-img-min.webp" alt="" class="absolute w-full h-full object-cover" />
		<div class="absolute w-full h-full bg-black	opacity-[0.85]" />
		<div class="hero min-h-screen">
			<div class="hero-content flex-col lg:px-10 lg:flex-row xl:px-32">
				<div class="mx-x flex flex-col">
					<h1 class="text-5xl text-slate-50 p-4 font-bold leading-tight">
						Trött på gravitationens lagar?
					</h1>
					<p class="pb-6 px-4 text-slate-50	 mt-0 text-center self-center">
						Välkommen till SWAG!<br />Calisthenics & träningsglädje i Göteborg
					</p>
					<button class="btn btn-primary w-fit self-center text-slate-50	">
						<a href="/kurser">Se kurser & open gym</a></button
					>
				</div>
				<img
					src="/img/SWAG_logo.png"
					class="max-w-[70vw] md:max-w-md lg:max-w-sm w- my-48 lg:my-2 mx-4 rounded-lg shadow-2xl"
					alt="SWAG logga"
				/>
			</div>
		</div>
	</article>

	<article class="video-wrapper m-10">
		<iframe
			class="video"
			title="SWAG video"
			{src}
			frameborder="0"
			allow="autoplay"
			referrerpolicy="no-referrer-when-downgrade"
		/>
	</article>

	<article class="flex justify-evenly flex-wrap gap-10 w-11/12 mb-40 relative">
		<BasicCard
			title="Funktionell styrka"
			text="Kroppsviktsträning är inte bara bra för att man lär sig göra härliga saker med kroppen, det är ett utmärkt sätt att stärka upp kroppen för att klara av vardagliga påfrestningar"
			img="/img/L9.jpg"
			alt="Gruppbild"
		/>

		<BasicCard
			title="Strategisk träning"
			text="För att bygga upp starka muskler och leder börjar man från den nivån man är på och steg för steg bygger kroppen till en robust maskin för att både motverka skador samt nå de mål man har"
			img="/img/L19.jpg"
			alt="Gruppbild"
		/>

		<BasicCard
			title="Gemenskap"
			text="På swag förbättrar vi vår fysik. Vi har kul och gör roliga aktiviteter i och utanför träningslokalen. SWAG står för en sund och hälsosamm livstil."
			img="/img/L5.jpg"
			alt="Gruppbild"
		/>
	</article>

	<article class="mb-40">
		<Carusel2 {images} />
	</article>

	<article class="flex gap-10 lg:gap-10 mb-20 w-full flex-row flex-wrap items-center justify-center">
		<CardImageSide
			title="Kurser och open gym"
			text="SWAG har kurs i kroppsviktsträning där du kan lära dig bemästra din kroppsviktsträning. Vi har även open gym träningar som är perfekta för att ta sin träning i egen hand tillsammans med oss."
			img="/img/Jakob_pt_short.webp"
			alt="Jakob lär ut muscle up"
			href="/kurser"
		/>

		<CardImageSide
			title="Evenemang"
			text="Vi har tidigare haft sverigemästerskap i calisthenics och en tävling vi kallade för swagmästerskapet. Läs mer för att ta reda på om det finns något evenemang på gån!"
			img="/img/L 4.jpg"
			alt="swag-medlemmar som bygger en ställning"
			href="/evenemang"
		/>

		<CardImageSide
			title="Läs om SWAG"
			text="Läs om vad vi står för, se våra stadgar, vad för förening vi är och få en överblick över vad streetworkout är."
			img="/img/Gruppbild-min.webp"
			alt="Gruppbild"
			href="/about"
		/>
	</article>
</Section>

<style>
	.index {
		text-align: center;
		display: block;
		margin: 20px auto;
	}

	#first-call-action {
		background-size: cover;
		height: 450px;
	}

	.slogan {
		/* font-size: 40px; */
		font-weight: bold;
		font-family: serif;
		font-style: italic;
		line-height: 50px;
	}

	.video-background {
		position: absolute;
		width: 100%;
		max-width: 442px;
		height: 100%; /* full höjd – justera vid behov */
		overflow: hidden;
		background-size: cover;
	}
	.video {
		position: relative;
		inset: 0;
		max-width: 250px;
		width: 100%;
		height: 70vh;
		pointer-events: none; /* kritiskt: gör videon ej klickbar (kan ej pausas) */
		left: 50%;
		top: 100%;
		transform: translate(-50%, 0);
		margin-top: 25px;
	}
	#video-id {
	}
</style>
