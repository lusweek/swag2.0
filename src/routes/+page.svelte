<script>
	import Carusel2 from '$lib/Carusel2.svelte';

	// Hämtar bilder till bildspelet (Firebase Storage)
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
			autoplay: '1',
			mute: '1',
			controls: '0',
			rel: '0',
			fs: '0',
			modestbranding: '1',
			disablekb: '1',
			playsinline: '1',
			loop: '1',
			playlist: VIDEO_ID,
			iv_load_policy: '3'
		}).toString();

	const pillars = [
		{
			n: '/ 01',
			title: 'Funktionell<br>styrka.',
			text: 'Kroppsviktsträning är inte bara bra för att man lär sig göra härliga saker med kroppen — det är ett utmärkt sätt att stärka upp kroppen för att klara av vardagliga påfrestningar.'
		},
		{
			n: '/ 02',
			title: 'Strategisk<br>träning.',
			text: 'För att bygga upp starka muskler och leder börjar man från den nivå man är på och bygger steg för steg kroppen till en robust maskin — för att motverka skador och nå sina mål.'
		},
		{
			n: '/ 03',
			title: 'Gemenskap.',
			text: 'På SWAG förbättrar vi vår fysik, har kul och gör roliga aktiviteter i och utanför träningslokalen. SWAG står för en sund och hälsosam livsstil.'
		}
	];

	const explore = [
		{
			tag: 'Träna',
			title: 'Kurser &<br>Open Gym',
			text: 'SWAG har kurser i kroppsviktsträning där du lär dig bemästra din träning. Vi har även open gym — perfekt för att ta träningen i egna händer tillsammans med oss.',
			href: '/kurser',
			img: '/img/Jakob_pt_short.webp',
			alt: 'Jakob lär ut muscle up'
		},
		{
			tag: 'Tävla',
			title: 'Evenemang',
			text: 'Vi har tidigare haft sverigemästerskap i calisthenics och en tävling vi kallar swagmästerskapet. Läs mer för att se om något evenemang är på gång!',
			href: '/evenemang',
			img: '/img/L 4.jpg',
			alt: 'SWAG-medlemmar som bygger en ställning'
		},
		{
			tag: 'Förstå',
			title: 'Läs om<br>SWAG',
			text: 'Läs om vad vi står för, se våra stadgar, vilken förening vi är och få en överblick över vad street workout är.',
			href: '/about',
			img: '/img/Gruppbild-min.webp',
			alt: 'Gruppbild'
		}
	];
</script>

<div class="sw">
	<div class="sw-grain" />

	<!-- ===================== HERO ===================== -->
	<section class="hero">
		<div class="hero-photo">
			<img src="/img/Backround-img-min.webp" alt="" />
		</div>

		<div class="hero-meta-bar sw-wrap">
			<span><span class="dot dot-live" />SWAG · GÖTEBORG · STREET WORKOUT</span>
			<span class="mono-hide">Calisthenics & träningsglädje</span>
		</div>

		<div class="hero-body sw-wrap">
			<div class="hero-grid">
				<h1 class="hero-title">Trött på<br />gravitationens<br />lagar?<span class="slash"></span></h1>
				<div class="hero-side">
					<p class="hero-lede">
						Välkommen till SWAG — Göteborgs hem för calisthenics och träningsglädje.
						Vi bygger styrka, balans och rörelse med kroppen som enda verktyg och
						varandra som lag.
					</p>
					<div class="hero-ctas">
						<a href="/kurser" class="sw-btn sw-btn-primary">Se kurser</a>
						<a href="/about" rel="external" class="sw-btn sw-btn-ghost-dark">Om SWAG</a>
					</div>
				</div>
			</div>
		</div>

		<img class="hero-badge" src="/img/SWAG_logo.png" alt="SWAG logga" />
	</section>

	<!-- ===================== MARQUEE ===================== -->
	<section aria-hidden="true">
		<div class="sw-marquee">
			<div class="sw-marquee-track">
				<span>MUSCLE-UP</span><span class="star">✦</span>
				<span>PLANCHE</span><span class="star">✦</span>
				<span>HUMAN FLAG</span><span class="star">✦</span>
				<span>FRONT LEVER</span><span class="star">✦</span>
				<span>HANDSTAND</span><span class="star">✦</span>
				<span>PULL-UP</span><span class="star">✦</span>
				<span>L-SIT</span><span class="star">✦</span>
			</div>
			<div class="sw-marquee-track" aria-hidden="true">
				<span>MUSCLE-UP</span><span class="star">✦</span>
				<span>PLANCHE</span><span class="star">✦</span>
				<span>HUMAN FLAG</span><span class="star">✦</span>
				<span>FRONT LEVER</span><span class="star">✦</span>
				<span>HANDSTAND</span><span class="star">✦</span>
				<span>PULL-UP</span><span class="star">✦</span>
				<span>L-SIT</span><span class="star">✦</span>
			</div>
		</div>
	</section>

	<!-- ===================== INTRO ===================== -->
	<section class="intro">
		<div class="sw-wrap">
			<div class="sw-section-head">
				<span class="num">[ 01 — INTRO ]</span>
				<span class="label">VAD ÄR CALISTHENICS?</span>
			</div>
			<div class="intro-grid">
				<div class="intro-copy">
					<h2 class="sw-display sw-h2">Kropps&shy;vikten<br />är ditt gym.</h2>
					<p>
						Street Workout, calisthenics eller kroppsviktsträning — tre namn med
						ungefär samma innebörd. Det handlar framför allt om att använda kroppen
						som ditt träningsverktyg. De vanligaste övningarna är muscle up, pull
						ups, armhävningar och squats. Mer avancerade övningar är L-sit och
						frontlever.
					</p>
					<p>
						Idrotten är väldigt lättillgänglig och enkel att anpassa efter olika
						individer. Det enda som behövs är din egen kropp, marken och ett räcke
						eller utomhusgym.
					</p>
				</div>
				<div class="intro-photo-stack">
					<div class="sw-photo">
						<img src="/img/jakob-frontlever-min.webp" alt="Jakob som gör en frontlever" />
						<span class="sw-photo-label">Front lever</span>
					</div>
					<div class="sw-photo">
						<img src="/img/L9.jpg" alt="Träning på SWAG" />
						<span class="sw-photo-label">Open gym</span>
					</div>
					<div class="sw-photo">
						<img src="/img/Jakob_pt_short.webp" alt="Muscle up" />
						<span class="sw-photo-label">Muscle-up</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ===================== PILLARS ===================== -->
	<section class="pillars">
		<div class="sw-wrap">
			<div class="sw-section-head sw-section-head-dark">
				<span class="num">[ 02 — VARFÖR SWAG ]</span>
				<span class="label label-dark">TRE SAKER VI BRYR OSS OM</span>
			</div>
			<div class="pillars-grid">
				{#each pillars as p}
					<div class="pillar">
						<div class="pillar-num">{p.n}</div>
						<h3>{@html p.title}</h3>
						<p>{p.text}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- =============== I RÖRELSE + UTFORSKA (merged) =============== -->
	<section class="explore">
		<div class="sw-wrap">
			<div class="merge-grid">
				<div class="merge-video">
					<div class="sw-section-head">
						<span class="num">[ 03 — I RÖRELSE ]</span>
						<span class="label">SWAG I AKTION</span>
					</div>
					<div class="video-frame sw-photo">
						<iframe
							title="SWAG video"
							{src}
							frameborder="0"
							allow="autoplay"
							referrerpolicy="no-referrer-when-downgrade"
						/>
					</div>
				</div>

				<div class="merge-explore">
					<div class="sw-section-head">
						<span class="num">[ 04 — UTFORSKA ]</span>
						<span class="label">DET HÄR ÄR SWAG</span>
					</div>
					<div class="explore-grid">
						{#each explore as e}
							<a class="ex-card" href={e.href} rel="external">
								<div class="ex-photo sw-photo">
									<img src={e.img} alt={e.alt} />
								</div>
								<div class="ex-body">
									<span class="sw-tag sw-tag-yellow">{e.tag}</span>
									<h3>{@html e.title}</h3>
									<p>{e.text}</p>
									<span class="ex-cta">Läs mer →</span>
								</div>
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ===================== GALLERY (carousel) ===================== -->
	{#if images.length}
		<section class="gallery">
			<div class="sw-wrap">
				<div class="sw-section-head">
					<span class="num">[ 05 — GALLERI ]</span>
					<span class="label">FRÅN TRÄNINGEN</span>
				</div>
				<Carusel2 {images} />
			</div>
		</section>
	{/if}

	<!-- ===================== COMMUNITY ===================== -->
	<section class="community">
		<div class="sw-wrap">
			<div class="sw-section-head sw-section-head-dark">
				<span class="num">[ 06 — GEMENSKAP ]</span>
				<span class="label label-dark">@SWAG_STREETWORKOUT</span>
			</div>
			<div class="community-grid">
				<div>
					<h2>Klubben.<br /><em>Inte gymmet.</em></h2>
					<p>
						SWAG är ett glatt och härligt gäng där alla är välkomna — oavsett ålder,
						träningsnivå, kön eller etnicitet. Vi tränar, motiverar och inspirerar
						varandra att träna, leka och framför allt ha kul ihop. Du får mer än
						träning — du får en hel grupp glada vänner.
					</p>
					<div class="community-ctas">
						<a href="/about" rel="external" class="sw-btn sw-btn-ghost-dark">Läs om SWAG</a>
						<a
							href="https://www.instagram.com/swag_streetworkout/"
							target="_blank"
							rel="noreferrer"
							class="sw-btn sw-btn-ghost-dark">Följ på Instagram →</a
						>
					</div>
				</div>
				<div class="community-photos">
					<div class="sw-photo">
						<img src="/img/L5.jpg" alt="SWAG-gemenskap" />
					</div>
					<div class="sw-photo">
						<img src="/img/L19.jpg" alt="Träning tillsammans" />
					</div>
					<div class="sw-photo">
						<img src="/img/Gruppbild-min.webp" alt="Gruppbild" />
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	/* ---------- Hero ---------- */
	.hero {
		background: var(--ink);
		color: var(--cream);
		position: relative;
		overflow: hidden;
		min-height: 92vh;
		display: flex;
		flex-direction: column;
	}
	.hero-photo {
		position: absolute;
		inset: 0;
		z-index: 0;
	}
	.hero-photo img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.hero-photo::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
				180deg,
				rgba(14, 14, 12, 0.45) 0%,
				rgba(14, 14, 12, 0.6) 55%,
				rgba(14, 14, 12, 0.92) 100%
			),
			linear-gradient(90deg, rgba(14, 14, 12, 0.7) 0%, rgba(14, 14, 12, 0.15) 55%, rgba(14, 14, 12, 0.4) 100%);
		z-index: 2;
	}
	.hero-photo::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
		background-image: repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.018) 0 1px, transparent 1px 4px);
	}
	.hero-meta-bar {
		position: relative;
		z-index: 5;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 24px;
		width: 100%;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--chalk-2);
	}
	.hero-meta-bar span {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}
	.dot {
		width: 6px;
		height: 6px;
		background: var(--yellow);
		display: inline-block;
	}
	.dot-live {
		animation: pulse 1.6s ease-in-out infinite;
	}
	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.35;
		}
	}
	.hero-body {
		position: relative;
		z-index: 5;
		flex: 1;
		display: flex;
		align-items: flex-end;
		padding-bottom: 56px;
		width: 100%;
	}
	.hero-grid {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 32px;
		width: 100%;
		align-items: end;
	}
	.hero-title {
		font-family: var(--f-display);
		font-weight: 800;
		font-size: clamp(56px, 9.5vw, 168px);
		line-height: 0.86;
		letter-spacing: -0.015em;
		text-transform: uppercase;
		text-align: left;
		color: var(--cream);
		margin: 0;
	}
	.hero-title .slash {
		color: var(--yellow);
		display: inline-block;
		transform: translateY(-0.08em);
	}
	.hero-side {
		text-align: left;
		display: flex;
		flex-direction: column;
		gap: 24px;
		align-items: flex-start;
		max-width: 340px;
	}
	.hero-lede {
		font-size: 17px;
		line-height: 1.45;
		color: var(--cream);
		opacity: 0.9;
		margin: 0;
	}
	.hero-ctas {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}
	.hero-badge {
		position: absolute;
		z-index: 3;
		right: -90px;
		bottom: -90px;
		width: clamp(220px, 28vw, 420px);
		opacity: 0.55;
		animation: spin 80s linear infinite;
		pointer-events: none;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* ---------- Intro ---------- */
	.intro {
		background: var(--paper);
		padding: 96px 0 64px;
	}
	.intro-grid {
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: 64px;
		align-items: start;
	}
	.intro-copy h2 {
		margin: 0 0 24px;
	}
	.intro-copy p {
		font-size: 18px;
		line-height: 1.55;
		margin: 0 0 16px;
		max-width: 52ch;
	}
	.intro-photo-stack {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 220px 280px;
		gap: 12px;
	}
	.intro-photo-stack .sw-photo:first-child {
		grid-row: 1 / 3;
	}

	/* ---------- Pillars ---------- */
	.pillars {
		background: var(--ink);
		color: var(--cream);
		padding: 96px 0 120px;
	}
	.pillars-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		border-top: 1px solid var(--line-dark);
	}
	.pillar {
		padding: 40px 32px 32px 0;
		border-right: 1px solid var(--line-dark);
	}
	.pillar:last-child {
		border-right: none;
		padding-right: 0;
	}
	.pillar:nth-child(n + 2) {
		padding-left: 32px;
	}
	.pillar-num {
		font-family: var(--f-mono);
		font-size: 12px;
		letter-spacing: 0.16em;
		color: var(--yellow);
		margin-bottom: 24px;
	}
	.pillar h3 {
		font-family: var(--f-display);
		font-weight: 800;
		font-size: clamp(36px, 3.4vw, 56px);
		text-transform: uppercase;
		line-height: 0.95;
		margin: 0 0 20px;
		color: var(--cream);
	}
	.pillar p {
		font-size: 16px;
		line-height: 1.55;
		color: var(--chalk-2);
		margin: 0;
	}

	/* ---------- Video ---------- */
	.video-frame {
		position: relative;
		width: 100%;
		max-width: 420px;
		margin: 0 auto;
		aspect-ratio: 9 / 16;
		background: var(--ink);
	}
	.video-frame iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}

	/* ---------- Explore (merged with video) ---------- */
	.explore {
		background: var(--cream);
		padding: 96px 0;
	}
	.merge-grid {
		display: grid;
		gap: 56px;
	}
	.merge-explore {
		min-width: 0;
	}
	.explore-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 24px;
		margin-top: 8px;
	}
	@media (min-width: 961px) {
		.merge-grid {
			grid-template-columns: clamp(280px, 25vw, 340px) 1fr;
			gap: 48px;
			align-items: stretch;
		}
		.merge-video {
			display: flex;
			flex-direction: column;
		}
		.merge-video .video-frame {
			flex: 1;
			max-width: none;
			margin: 0;
			aspect-ratio: auto;
		}
	}
	.ex-card {
		display: flex;
		flex-direction: column;
		background: var(--paper);
		border: 1px solid var(--line);
		transition: transform 0.15s, box-shadow 0.15s;
	}
	.ex-card:hover {
		transform: translate(-2px, -2px);
		box-shadow: 6px 6px 0 var(--ink);
	}
	.ex-photo {
		height: 240px;
	}
	.ex-body {
		padding: 24px 28px 28px;
		display: flex;
		flex-direction: column;
		gap: 14px;
		flex: 1;
	}
	.ex-body h3 {
		font-family: var(--f-display);
		font-weight: 800;
		font-size: clamp(28px, 2.6vw, 40px);
		line-height: 0.95;
		text-transform: uppercase;
		margin: 0;
	}
	.ex-body p {
		font-size: 14px;
		line-height: 1.55;
		color: var(--ink-3);
		margin: 0;
		flex: 1;
	}
	.ex-cta {
		font-family: var(--f-mono);
		font-size: 12px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		border-bottom: 1px solid currentColor;
		padding-bottom: 4px;
		align-self: flex-start;
	}
	.sw-tag {
		align-self: flex-start;
	}

	/* ---------- Gallery ---------- */
	.gallery {
		background: var(--paper);
		padding: 64px 0 96px;
	}

	/* ---------- Community ---------- */
	.community {
		background: var(--ink);
		color: var(--cream);
		padding: 120px 0;
	}
	.community-grid {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: 56px;
		align-items: center;
	}
	.community h2 {
		font-family: var(--f-display);
		font-weight: 800;
		font-size: clamp(56px, 8vw, 132px);
		line-height: 0.88;
		text-transform: uppercase;
		margin: 0 0 32px;
		letter-spacing: -0.015em;
	}
	.community h2 em {
		font-style: normal;
		color: var(--yellow);
	}
	.community p {
		font-size: 18px;
		line-height: 1.55;
		color: var(--chalk-2);
		margin: 0 0 32px;
		max-width: 46ch;
	}
	.community-ctas {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}
	.community-photos {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 8px;
		height: 480px;
	}
	.community-photos .sw-photo:first-child {
		grid-row: 1 / 3;
	}

	/* ---------- Responsive ---------- */
	@media (max-width: 960px) {
		.hero-grid {
			grid-template-columns: 1fr;
		}
		.hero-badge {
			right: -90px;
			bottom: -90px;
			opacity: 0.4;
		}
		.intro-grid,
		.pillars-grid,
		.explore-grid,
		.community-grid {
			grid-template-columns: 1fr;
		}
		.pillar {
			border-right: none;
			border-bottom: 1px solid var(--line-dark);
			padding: 28px 0;
		}
		.pillar:last-child {
			border-bottom: none;
		}
		.community-photos {
			height: 320px;
		}
		.mono-hide {
			display: none;
		}
	}
</style>
