<script>
	import '../../app.css'
	import IoLogoInstagram from 'svelte-icons/io/IoLogoInstagram.svelte';
	import Table from '../../lib/Table.svelte';
	import CupcakeArticle from '$lib/CupcakeArticle.svelte';
	import TempAnmllan from '$lib/TempAnmällan.svelte';
	import isSummer from '$lib/utilis/isSummer';

    // document.body.scrollIntoView();

</script>

<section class="flex items-center w-screen flex-col">
	<CupcakeArticle>
		<h1>Open gym</h1>
		<h2>Kom på våra open gympass!</h2>
		
		<div class="flex flex-col w-full md:w-10/12">
			<p class="text-start">
				Det bästa sättet att utvecklas är att vara bland andra som är duktiga på det du vill bli bättre på!
				<br> <br>
				Open gym-passen är inte ledarledda, här har du möjlighet att köra din egen träning tillsammans med oss i förenngen.
				<br><br>
				Hos oss är alla välkomna, äldre som yngre, vi alla kan lära oss av varandra.
				<br><br>
				Open gym har vi i <a target="_blank" href="https://www.google.se/maps/place/Gymnastikens+Hus/@57.7557554,12.0680566,17z/data=!3m1!4b1!4m6!3m5!1s0x464ff5ce3af598cf:0xf8f589d8e52cf02f!8m2!3d57.7557554!4d12.0702453!16s%2Fg%2F11j2yz_fk9">
					Gymnastikens Hus i Bergsjön</a> på lördagar och i <a target="_blank" href="https://www.google.com/maps/place/Nordhemsskolan/@57.6945294,11.9499338,15z/data=!4m2!3m1!1s0x0:0x7228dd61a06b51ba?sa=X&ved=2ahUKEwjT996aksD9AhWxSPEDHWN_CFgQ_BJ6BAh3EAg">
					Nordhemskolan</a> på Onsdagar.
						<br><br>
				På sommaren brukar vi träna utomhus i utegymmet vid <a target="_blank" class="link" href="https://www.google.se/maps/place/Tufteparken+Slottskogen/@57.6897492,11.9422693,17z/data=!3m1!4b1!4m6!3m5!1s0x464ff33e3b325e29:0x5f7eb65097bf802a!8m2!3d57.6897492!4d11.944458!16s%2Fg%2F11f00nrj1w">
					Plikta i Slottsskogen.</a>
				
			</p>
			{#if isSummer()}
			<Table 
				headers={['Platser', 'Tid & dag']}
				data={[
						[{
							text: 'Slottskogen, Plikta - GRATIS',
							link: 'https://www.google.se/maps/place/Tufteparken+Slottskogen/@57.6897492,11.9422693,17z/data=!3m1!4b1!4m6!3m5!1s0x464ff33e3b325e29:0x5f7eb65097bf802a!8m2!3d57.6897492!4d11.944458!16s%2Fg%2F11f00nrj1w'
						}, 
							'Onsdagar, 18:00 - 21:00'
						],
						[{
							text: 'Gymnastikens Hus, Bergsjön',
							link: 'https://www.google.se/maps/place/Gymnastikens+Hus/@57.7557554,12.0680566,17z/data=!3m1!4b1!4m6!3m5!1s0x464ff5ce3af598cf:0xf8f589d8e52cf02f!8m2!3d57.7557554!4d12.0702453!16s%2Fg%2F11j2yz_fk9'
						},
						'Lördagar, 17:00 - 21:00'
					],
				]}


				/>

				{:else}
				<Table 
				headers={['Platser', 'Tid & dag']}
				data={[
						[{
								text: 'Nodhemskolan', 
								link: 'https://www.google.com/maps/place/Nordhemsskolan/@57.6945294,11.9499338,15z/data=!4m2!3m1!1s0x0:0x7228dd61a06b51ba?sa=X&ved=2ahUKEwjT996aksD9AhWxSPEDHWN_CFgQ_BJ6BAh3EAg'
						},
							'Onsdagar, 18:00 - 21:00'
						],
						[{
							text: 'Gymnastikens Hus, Bergsjön',
							link: 'https://www.google.se/maps/place/Gymnastikens+Hus/@57.7557554,12.0680566,17z/data=!3m1!4b1!4m6!3m5!1s0x464ff5ce3af598cf:0xf8f589d8e52cf02f!8m2!3d57.7557554!4d12.0702453!16s%2Fg%2F11j2yz_fk9'
						},
						'Lördagar, 17:00 - 21:00'
					],
				]}

				/>
				{/if}

			<Table
				headers={['Priser', '', '']}
				data={[
						['Termin', '800 kr', 'Inkluderar medlemsavgift'],
						['Per tillfälle', '60 kr', 'Medlem'],
						['Per tillfälle', '80 kr', 'Ej medlem'],
				]}
			/>

			<iframe
				class="w-full h-72 md:h-[50vh]"
				src="https://www.google.com/maps/d/embed?mid=1bY9b3X9N090RybxJ2NztxyYOHDSAUIk&ehbc=2E312F"
			/>

			<div class="flex w-full items-center justify-end">
				<p class="text-end">Håll dig uppdaterad, bli inspirerad!<br />här på instagram:</p>
				<a target="_blank" href="https://www.instagram.com/swag_streetworkout/">
					<div class="h-8"><IoLogoInstagram /></div>
				</a>
			</div>
		</div>
		<TempAnmllan />
	</CupcakeArticle>

	<CupcakeArticle>
		<h1>Muscleup kursen</h1>

		<div class="flex flex-col w-full md:w-11/12 ">
			<div class="container  p-4 ">
				<h2 class="mb-8">Beskrivning</h2>
				<p class="text-left rounded mb-8">
					I kursen kommer vi framför allt att fokusera på <br />
					• teknik- och styrkeövningar för muscle-up<br />
					Under kursen får du lära dig att utföra övningarna säkert och med rätt teknik. Du kommer även
					att få handfasta tips för att din utveckling ska gå framåt utifrån dina förutsättningar.
					<br /> <br />

					Under kursen kommer vi även att gå igenom<br />
					• grundläggande freestyle- och svingteknik<br />
					• övningar för att kunna bygga upp styrkan i statiska moment som L-sit, backlever, frontlever,<br
					/>
					• övningar för att kunna bygga upp styrkan i styrkedynamiska moment som one-arm pull-up, handstand
					push-up osv)<br />
					Kursens övriga innehåll kommer att anpassas lite efter kursdeltagarna.<br /><br />

					Som kursdeltagare får du också:<br />
					• tips på hur du kan lägga upp träningen under de dagar du inte kan träna med SWAG<br />
					• delta på alla open gym pass utan extra kostnad<br />
					• förtur vid restriktioner och liknande<br />
					Skriv till Jakob Fogelklou
				</p>
				
				<div>
					<Table
					headers={['Prakrisk information', '']}
					data={[
						['Tid', 'Onsdagar kl 18:10 - 19:30'],
						['Plats', { text: 'Nordhemsskolan', link: 'https://www.google.se/maps/place/Nordhemsgatan+51,+413+09+G%C3%B6teborg/@57.6939827,11.9479973,17z/data=!3m1!4b1!4m6!3m5!1s0x464ff3401b314933:0x4217b1c3bae9af2f!8m2!3d57.6939827!4d11.950186!16s%2Fg%2F11c2cywtmx' }],
						['Kursstart', '22 Feb 2023'],
						['Kursslut', '24 Maj 2023'],
						['Antal tillfällen', '13'],
						['Ingår', 'Alla open gym tillfällen'],
						['Pris termin', '1100kr'],
						['Pris student eller ungdom under 26 år', '850kr '],
						['Pris engångs', '120kr'],
						['OBS', 'Ingen träning under påsklovet - 12 April'],
					]}
				/>
			</div>
			</div>
		</div>
	<TempAnmllan />
	</CupcakeArticle>

	<CupcakeArticle>
		<h1>PT med Jakob Fogelklou</h1>

		<div class="flex flex-col w-full md:w-11/12">
			<div class="container p-4 ">
				<h2 class="mb-8">Vill du ta din träning till nästs nivå?</h2>
				<p class="text-left rounded mb-8">
					Jakob har tränat calisthenics och street workouti 10 år och har stor erfarenhet inom sporten. 
					Både som tävlingsatlet och som tränare.
					<br /><br />

					Han har varit tränare för både ungdomsgrupper och vuxengrupper i 7 år. Jakob kommer, på ett personligt plan, hjälpa dig att uppnå dina mål vare sig du vill bygga styrka, muskler, tappa i vikt eller lära dig avancerade trick och övningar.
					<br /><br />
					Du får även värdefull kunskap om kost för att må bra och optimera muskelbyggnad.
				</p>

				<h2><bold>Första pt-timmen gratis</bold></h2>

                <Table 
					headers={[
                        "Timmar", "Pris",
                    ]}
                    data={[
                        ["1", "590 kr"],
                        ["3", "1290 kr"],
						["5", "1690 kr"]
                    ]}
                />
			</div>
		</div>
	<TempAnmllan />
	</CupcakeArticle>

</section>

<style>
	.container-bg {
		background-color: #efeae6;
	}
</style>
