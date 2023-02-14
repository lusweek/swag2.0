<script>
	import AboutArticle from "./AboutArticle.svelte";


    let firstParafraf = [
        "Swag är ett glatt och härligt gäng där alla är välkomna att vara med - oavsett ålder,träningsnivå, kön eller etnicitet. Vi är en Aktiv Ungdomsförening i Göteborg som framför alltsysslar med sporten Street Workout och Calisthenics.",
        "Vi brinner lite extra för att få barn och ungdomar att röra på sig samt att hitta meningsfulla och utvecklande fritidsaktiviteter.",
        "Här kan du läsa mer om Aktiv Ungdom och deras vision https://www.aktivungdom.se/om-oss Vi tränar, motiverar och inspirerar varandra att träna, leka och framför allt ha kul ihop! Vi rör oss och utvecklar våra kroppar tillsammans, glädjs och hjälper varandra framåt i träningen. Du får mer än träning, du får en hel grupp av glada vänner!"
    ]

	let secondParagraf = [
		"Street Workout, calisthenics eller kroppsviktsträning. Tre namn med ungefär samma innebörd. Street Workout handlar framför allt om att använda kroppen som ditt träningsverktyg. De vanligaste övningarna är muscle up, pull ups, armhävningar och squats. Exempel på mer avancerade övningar är L-sit, frontlever och handstående.",
		"Att träna Calisthenics / Street Workout har flera fördelar. Idrotten är väldigt lättillgänglig och enkel att anpassa efter olika individer. Det enda som behövs är utövarens egen kropp, marken och ett räcke eller utomhusgym. Den vanligaste utrustningen är en pullupstång och parallellbars (dipsstänger).",
		"Se youtubevideon för mer information om Street Workout.",
	]
</script>

<section class="w-screen mx-auto" >
    <AboutArticle 
		title="Vilka är SWAG?"
        IMG="img/Gruppbild-min.webp"
        ALT="Gruppbild med Jakob oovanpå ställningen med glatt folk bakom honnom"
        paragraf={firstParafraf}
		imgLeft={false}
    />

	<AboutArticle 
		title="Vad är streetworkout?"
		IMG="img/jakob-frontlever-min.webp"
		ALT="Jakob som gör en frontlever"
		paragraf={secondParagraf}
		imgLeft={true}
	/>

</section>
