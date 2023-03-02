<script>
	import IoLogoInstagram from 'svelte-icons/io/IoLogoInstagram.svelte';
	import isSummer from '$lib/isSummer';
	import Table from '../../lib/Table.svelte';
</script>

<section class="flex items-center w-screen flex-col">
	<article
		data-theme="cupcake"
		class="container flex flex-col items-center text-center m-6 rounded"
	>
		<h1>Open gym</h1>
		<p>Kom och träna vad du vill med oss!</p>
		<div class="flex flex-col w-10/12">
			<Table
				headers={['Plats', 'pris engångs', 'Pris termin']}
				data={[
					isSummer
						? [
								{
									text: 'Slottskogen, Plikta',
									link: 'https://www.google.se/maps/place/Tufteparken+Slottskogen/@57.6897492,11.9422693,17z/data=!3m1!4b1!4m6!3m5!1s0x464ff33e3b325e29:0x5f7eb65097bf802a!8m2!3d57.6897492!4d11.944458!16s%2Fg%2F11f00nrj1w'
								},
								'Gratis',
								'Gratis'
						  ]
						: ['Nodhemskolan', '60kr', '700kr'],
					[
						{
							text: 'Gymnastikens hus, Bergsjön',
							link: 'https://www.google.se/maps/place/Gymnastikens+Hus/@57.7557554,12.0680566,17z/data=!3m1!4b1!4m6!3m5!1s0x464ff5ce3af598cf:0xf8f589d8e52cf02f!8m2!3d57.7557554!4d12.0702453!16s%2Fg%2F11j2yz_fk9'
						},
						'80kr',
						'700kr (20 tillfällen)'
					]
				]}
			/>

			<iframe
				class="w-full h-72 md:h-[50vh]"
				src="https://www.google.com/maps/d/embed?mid=1bY9b3X9N090RybxJ2NztxyYOHDSAUIk&ehbc=2E312F"
			/>

			<div class="flex w-full items-center justify-end">
				<p class="text-end">Håll dig uppdaterad, bli inspirerad!<br />här på instagram:</p>
				<a target="_blank" href="https://www.instagram.com/swag.gbg/">
					<div class="h-8"><IoLogoInstagram /></div>
				</a>
			</div>
		</div>
	</article>

	<article
		data-theme="cupcake"
		class="container flex flex-col items-center text-center m-6 rounded"
	>
		<h1>Kurs i Muscle up & handstående</h1>

		<div class="flex flex-col w-10/12">
			<div class="container container-bg p-4 ">
				<h2>Beskrivning</h2>
				<p class="text-left rounded">
					I kursen kommer vi framför allt att fokusera på <br />
					• teknik- och styrkeövningar för handstående<br />
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
			</div>

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
	</article>

	<article
		data-theme="cupcake"
		class="container flex flex-col items-center text-center m-6 rounded"
	>
		<h1>PT med Jakob Fogelklou</h1>

		<div class="flex flex-col w-10/12">
			<div class="container container-bg p-4 ">
				<h2>Beskrivning</h2>
				<p class="text-left rounded">
					Vill du ta din träning till nästs nivå?
					Jakob har tränat calisthenics och street workouti 10 år och har stor erfarenhet inom sporten. Både som tävlingsatlet och som tränare.
					<br /><br />
					Du får även värdefull kunskap om kost för att må bra och optimera muskelbyggnad.
				</p>

				<h2><bold>Första pt-timmen gratis</bold></h2>

                <Table 
					headers={[
                        "Timmar", "Pris",
                    ]}
                    data={[
                        ["1", "700 kr"],
                        ["3", "1500 kr"],
						["5", "1990 kr"]
                    ]}
                />
			</div>
		</div>
	</article>

</section>

<style>
	.container-bg {
		background-color: #efeae6;
	}
</style>
