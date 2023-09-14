<script>
	import '../../app.css'
	import CupcakeArticle from '$lib/CupcakeArticle.svelte';
	import AboutArticle from './AboutArticle.svelte';
	import pdfUrl from './stadgar.pdf?url';

	const omSwagParafraf = [
		'Swag är ett glatt och härligt gäng där alla är välkomna att vara med - oavsett ålder, träningsnivå, kön eller etnicitet.',
		'Vi tränar, motiverar och inspirerar varandra att träna, leka och framför allt ha kul ihop! Vi rör oss och utvecklar våra kroppar tillsammans, glädjs och hjälper varandra framåt i träningen. Du får mer än träning, du får en hel grupp av glada vänner!'
	];

	const aktivUngdomParagraf = [
		'Vi är en Aktiv Ungdomsförening i Göteborg som framför allt sysslar med sporten Street Workout och Calisthenics.',
		'Vi brinner lite extra för att få ungdomar att röra på sig samt få dem att hitta meningsfulla och utvecklande fritidsaktiviteter.'
	];

	const stadgarParagraf = [
		'Här kan du även läsa om de stadgar vi på SWAG kommit överens om'
	]

	const screetWorkoutParagraf = [
		'Street Workout, calisthenics eller kroppsviktsträning. Tre namn med ungefär samma innebörd. Street Workout handlar framför allt om att använda kroppen som ditt träningsverktyg. De vanligaste övningarna är muscle up, pull ups, armhävningar och squats. Exempel på mer avancerade övningar är L-sit och frontlever.',
		'Att träna Calisthenics / Street Workout har flera fördelar. Idrotten är väldigt lättillgänglig och enkel att anpassa efter olika individer. Det enda som behövs är utövarens egen kropp, marken och ett räcke eller utomhusgym. Den vanligaste utrustningen är en pullupstång och parallellbars (dipsstänger).',
		'Se youtubevideon för mer information om Street Workout.'
	];

	// document.body.scrollIntoView();

</script>

<section class="w-screen flex flex-col items-center lg:flex lg:flex-col lg:items-center mx-auto">
	<AboutArticle
		title="Vilka är SWAG?"
		paragraf={omSwagParafraf}
		IMG="img/Gruppbild-min.webp"
		ALT="Gruppbild med Jakob oovanpå ställningen med glatt folk bakom honnom"
		imgLeft={false}
		imgYCenter={false}
		linkText={null}
		link={null}
	/>

	<AboutArticle
		title={null}
		IMG="/img/AktivUngdom_Logga-dark.webp"
		ALT="Aktiv ungdoms logga"
		paragraf={aktivUngdomParagraf}
		imgLeft={true}
		imgYCenter={true}
		linkText="Här kan du läsa mer om Aktiv Ungdom och deras vision"
		link="https://www.aktivungdom.se/om-oss"
		paragraf2={stadgarParagraf}
		linkText2={'Se våra stadgar'}
		link2={pdfUrl}
	/>

	<AboutArticle
		title="Vad är streetworkout?"
		paragraf={screetWorkoutParagraf}
		IMG="img/jakob-frontlever-min.webp"
		ALT="Jakob som gör en frontlever"
		imgLeft={false}
		imgYCenter={false}
		linkText={null}
		link={null}
	/>

</section>
