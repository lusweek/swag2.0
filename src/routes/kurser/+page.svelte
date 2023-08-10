<script lang="ts">
	import '../../app.css'
	import IoLogoInstagram from 'svelte-icons/io/IoLogoInstagram.svelte';
	import Table from '../../lib/Table.svelte';
	import CupcakeArticle from '$lib/CupcakeArticle.svelte';
	import TempAnmllan from '$lib/TempAnmällan.svelte';
	import isSummer from '$lib/utilis/isSummer';
	import Cms from '$lib/CMS/Cms.svelte';
	import { getDoc, doc } from 'firebase/firestore';
	import { db } from '$lib/firebase/firebase.client';
	import Loader from '$lib/Loader.svelte';

    // document.body.scrollIntoView();

	let isLoading = false

	// typescript
	
	interface firebaseData {
		id?: string
		title?: string;
	}

	// get data firebase: CMS, kurser med ett try, catch block. 
	const kurserRef = doc(db, 'CMS', 'kurser');
	let FBData: FBData = {}

	const getFBData = async () => {
		isLoading = true;
		try {
    		const data = await getDoc(kurserRef);
			if (data.exists()) {
      		FBData = { ...data.data(), id: data.id };
    		} else {
      		console.log('The "kurser" document does not exist.');
    		}
		} catch (error) {
			console.error('Error retrieving FB data:', error);
		} finally {
			isLoading = false;
			console.log('FBData', FBData)
		}

	};
	getFBData();	

</script>

{#if !isLoading}

<section class="flex items-center w-screen flex-col">
	<CupcakeArticle>
		<h1>Open gym</h1>
		<h2>{FBData.open_gym.title}</h2>
		<Cms 
			type={'text'} 
			value={FBData.open_gym.title}
			rows={2}
			FBDocument={'kurser'}
			FBField={'open_gym'}
			FBObjectKey={'title'}
			getData={getFBData}
		/>
		
		<div class="flex flex-col w-full md:w-10/12">

			{#each FBData.open_gym.texts as text, index}

				<p class="text-start">
					{text}
				</p>
				<Cms 
					type={'array'} 
					value={text}
					prevArray={FBData.open_gym.texts}
					prevObjectField={FBData.open_gym}
					rows={2}
					FBDocument={'kurser'}
					FBField={'open_gym'}
					FBObjectKey={'texts'}
					index={index}
					getData={getFBData}
				/>

			{/each}

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
		<h1>Calisthenics - Muscle-up & Handstand 
			(hösttermin)
		</h1>

		<div class="flex flex-col w-full md:w-11/12 ">
			<div class="container  p-4 ">
				<h2 class="mb-8">Beskrivning</h2>
				<p class="text-left rounded mb-8">
					I kursen kommer vi framför allt att fokusera på: <br />
					• teknik- och styrkeövningar för muscle-up<br />
					• teknik- och styrkeövningar för handstående<br />
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
					• förtur vid restriktioner och liknande<br /><br />
					Du kan givitvis testa på en gång gratis.
					
				</p>
				
				<div>
					<Table
					headers={['Prakrisk information', '']}
					data={[
						['Tid', 'Onsdagar kl 18:10 - 19:30'],
						['Plats', { text: 'Nordhemsskolan', link: 'https://www.google.se/maps/place/Nordhemsgatan+51,+413+09+G%C3%B6teborg/@57.6939827,11.9479973,17z/data=!3m1!4b1!4m6!3m5!1s0x464ff3401b314933:0x4217b1c3bae9af2f!8m2!3d57.6939827!4d11.950186!16s%2Fg%2F11c2cywtmx' }],
						['Kursstart', '13 September 2023'],
						['Kursslut', '20 December 2023'],
						['Antal tillfällen', '14'],
						['Ingår', 'Alla open gym tillfällen'],
						['Pris termin', '1250 kr (1350 kr ink medlemsavgift)'],
						['Pris student eller ungdom under 26 år', '950 kr (1050 kr ink medlemsavgift)'],
						['Pris engångs', '120 kr (Första gången gratis)'],
						['OBS', 'Under höstlovet (hela vecka 44) kommer SWAG att vara i Nordstan på eventet Nordstan Takeover.'],
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

{:else}

<Loader isLoading={isLoading} />

{/if}

<style>
	.container-bg {
		background-color: #efeae6;
	}
</style>
