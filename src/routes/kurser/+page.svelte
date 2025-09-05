<script lang="ts">
	import '../../app.css'
	import IoLogoInstagram from 'svelte-icons/io/IoLogoInstagram.svelte';
	import FirebaseTable from '../../lib/tables/FirebaseTable.svelte';
	import CupcakeArticle from '$lib/CupcakeArticle.svelte';
	import TempAnmllan from '$lib/TempAnmällan.svelte';
	import Cms from '$lib/CMS/Cms.svelte';
	import { getDoc, doc } from 'firebase/firestore';
	import { db } from '$lib/firebase/firebase.client';
	import Loader from '$lib/Loader.svelte';
	import CmsAddToArray from '$lib/CMS/CmsAddToArray.svelte';

    // document.body.scrollIntoView();

	let isLoading = false

	// typescript
	
	interface firebaseData {
		id?: string
		title?: string;
	}

	// get data firebase: CMS, kurser med ett try, catch block. 
	const kurserRef = doc(db, 'CMS', 'kurser');
	let FBData: any

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
		}

	};
	getFBData();	


</script>

<h1>Kurser</h1>


{#if !isLoading}

<section class="flex items-center w-screen flex-col">

	<div 		
		class="container flex flex-col m-auto my-6 p-6 lg:w-10/12 xl:w-3/3"
	>
		<a class="title-link" href="#muscle-up-id">Muscle up kursen</a>
		<a class="title-link" href="#grundkurs-id">Calisthenics grundkurs</a>
	</div>

	<article id="muscle-up-id">
		<CupcakeArticle>
			<h1>{FBData.muscle_up.title}</h1>
			<Cms 
				type={'text'} 
				rows={1}
				value={FBData.muscle_up.title}
				FBDocument={'kurser'}
				FBField={'muscle_up'}
				FBObjectKey={'title'}
				getData={getFBData}
				prevArray={null}
				prevObjectField={null}
				index={null}
			/>
			<div class="flex flex-col w-full md:w-11/12 ">
				<div class="container p-4 ">
					<h2 class="mb-8">{FBData.muscle_up.title2}</h2>
					<Cms 
						type={'text'} 
						rows={1}
						value={FBData.muscle_up.title2}
						FBDocument={'kurser'}
						FBField={'muscle_up'}
						FBObjectKey={'title2'}
						getData={getFBData}
						prevArray={null}
						prevObjectField={null}
						index={null}
					/>
	
					<section class="flex flex-col items-start">
						<article class="flex flex-col flex-start items-start mb-8">
							<h4 class="m-3 font-medium text-lg">{FBData.muscle_up.content_title}</h4> 
							<Cms 
								type={'text'} 
								rows={1}
								value={FBData.muscle_up.content_title}
								FBDocument={'kurser'}
								FBField={'muscle_up'}
								FBObjectKey={'content_title'}
								getData={getFBData}
								prevArray={null}
								prevObjectField={null}
								index={null}
							/>
							<ul style="list-style-type:disc" >
								{#each FBData.muscle_up.content_list as text, index}
									<li class="ml-8 text-left">{text}</li>
									<Cms 
										type={'array'} 
										value={text}
										prevArray={FBData.muscle_up.content_list}
										prevObjectField={FBData.muscle_up}
										rows={1}
										FBDocument={'kurser'}
										FBField={'muscle_up'}
										FBObjectKey={'content_list'}
										index={index}
										getData={getFBData}
									/>
								{/each}
							</ul>
							<CmsAddToArray 
								FBData={FBData}
								prevObjectField={FBData.muscle_up}
								prevArray={FBData.muscle_up.content_list}
								FBDocument={'kurser'}
								FBField={'muscle_up'}
								FBObjectKey={'content_list'}
								getData={getFBData}
							/>
							<p class="text-left rounded m-3">{FBData.muscle_up.content_text}</p>
							<Cms 
								type={'text'} 
								rows={4}
								value={FBData.muscle_up.content_text}
								FBDocument={'kurser'}
								FBField={'muscle_up'}
								FBObjectKey={'content_text'}
								getData={getFBData}
								prevArray={null}
								prevObjectField={null}
								index={null}
							/>
						</article>
	
						<article class="flex flex-col flex-start items-start mb-8">
							<h4 class="m-3 font-medium text-lg">{FBData.muscle_up.content_title2}</h4> 
							<Cms 
								type={'text'} 
								rows={1}
								value={FBData.muscle_up.content_title2}
								FBDocument={'kurser'}
								FBField={'muscle_up'}
								FBObjectKey={'content_title2'}
								getData={getFBData}
								prevArray={null}
								prevObjectField={null}
								index={null}
							/>
							<ul style="list-style-type:disc" >
								{#each FBData.muscle_up.content_list2 as text, index}
									<li class="ml-8 text-left">{text}</li>
									<Cms 
										type={'array'} 
										value={text}
										prevArray={FBData.muscle_up.content_list2}
										prevObjectField={FBData.muscle_up}
										rows={2}
										FBDocument={'kurser'}
										FBField={'muscle_up'}
										FBObjectKey={'content_list2'}
										index={index}
										getData={getFBData}
									/>
								{/each}
							</ul>
	
							<CmsAddToArray 
								FBData={FBData}
								prevArray={FBData.muscle_up.content_list2}
								prevObjectField={FBData.muscle_up}
								FBDocument={'kurser'}
								FBField={'muscle_up'}
								FBObjectKey={'content_list2'}
								getData={getFBData}
							/>
	
							<p class="text-left rounded m-3">{FBData.muscle_up.content_text2}</p>
							<Cms 
								type={'text'} 
								rows={3}
								value={FBData.muscle_up.content_text2}
								FBDocument={'kurser'}
								FBField={'muscle_up'}
								FBObjectKey={'content_text2'}
								getData={getFBData}
								prevArray={null}
								prevObjectField={null}
								index={null}
							/>
						</article>
	
						<article class="flex flex-col flex-start items-start mb-8">
							<h4 class="m-3 font-medium text-lg">{FBData.muscle_up.content_title3}</h4> 
							<Cms 
								type={'text'} 
								rows={1}
								value={FBData.muscle_up.content_title3}
								FBDocument={'kurser'}
								FBField={'muscle_up'}
								FBObjectKey={'content_title3'}
								getData={getFBData}
								prevArray={null}
								prevObjectField={null}
								index={null}
							/>
							<ul style="list-style-type:disc" >
								{#each FBData.muscle_up.content_list3 as text, index}
									<li class="ml-8 text-left">{text}</li>
									<Cms 
										type={'array'} 
										value={text}
										prevArray={FBData.muscle_up.content_list3}
										prevObjectField={FBData.muscle_up}
										rows={1}
										FBDocument={'kurser'}
										FBField={'muscle_up'}
										FBObjectKey={'content_list3'}
										index={index}
										getData={getFBData}
									/>
								{/each}
							</ul>
							<CmsAddToArray 
								FBData={FBData}
								prevArray={FBData.muscle_up.content_list3}
								prevObjectField={FBData.muscle_up}
								FBDocument={'kurser'}
								FBField={'muscle_up'}
								FBObjectKey={'content_list3'}
								getData={getFBData}
							/>
	
							<p class="text-left rounded m-3">{FBData.muscle_up.content_text3}</p>
							<Cms 
								type={'text'} 
								rows={3}
								value={FBData.muscle_up.content_text3}
								FBDocument={'kurser'}
								FBField={'muscle_up'}
								FBObjectKey={'content_text3'}
								getData={getFBData}
								prevArray={null}
								prevObjectField={null}
								index={null}
							/>
						</article>
					</section>
					
					<div>
	
						<FirebaseTable 
							tableContent={FBData.open_gym.tables[1]}
							FBData={FBData}
							tableIndexToUpdate={1}
							getData={getFBData}
						/>
				</div>
				</div>
			</div>
			<h2 class="link my-6"	><a href="/anmälan" rel="external">Anmälan TEST</a></h2>
		</CupcakeArticle>
	</article>

	<article id="grundkurs-id">
		<CupcakeArticle>
			<h1>{FBData.grund_kurs.title}</h1>
			<Cms 
				type={'text'} 
				rows={1}
				value={FBData.grund_kurs.title}
				FBDocument={'kurser'}
				FBField={'grund_kurs'}
				FBObjectKey={'title'}
				getData={getFBData}
				prevArray={null}
				prevObjectField={null}
				index={null}
			/>
			<div class="flex flex-col w-full md:w-11/12 ">
				<div class="container p-4 ">
					<h2 class="mb-8">{FBData.grund_kurs.title2}</h2>
					<Cms 
						type={'text'} 
						rows={1}
						value={FBData.grund_kurs.title2}
						FBDocument={'kurser'}
						FBField={'grund_kurs'}
						FBObjectKey={'title2'}
						getData={getFBData}
						prevArray={null}
						prevObjectField={null}
						index={null}
					/>
	
					<section class="flex flex-col items-start">
						<article class="flex flex-col flex-start items-start mb-8">
							<h4 class="m-3 font-medium text-lg">{FBData.grund_kurs.content_title}</h4> 
							<Cms 
								type={'text'} 
								rows={1}
								value={FBData.grund_kurs.content_title}
								FBDocument={'kurser'}
								FBField={'grund_kurs'}
								FBObjectKey={'content_title'}
								getData={getFBData}
								prevArray={null}
								prevObjectField={null}
								index={null}
							/>
							<ul style="list-style-type:disc" >
								{#each FBData.grund_kurs.content_list as text, index}
									<li class="ml-8 text-left">{text}</li>
									<Cms 
										type={'array'} 
										value={text}
										prevArray={FBData.grund_kurs.content_list}
										prevObjectField={FBData.grund_kurs}
										rows={1}
										FBDocument={'kurser'}
										FBField={'grund_kurs'}
										FBObjectKey={'content_list'}
										index={index}
										getData={getFBData}
									/>
								{/each}
							</ul>
							<CmsAddToArray 
								FBData={FBData}
								prevObjectField={FBData.grund_kurs}
								prevArray={FBData.grund_kurs.content_list}
								FBDocument={'kurser'}
								FBField={'grund_kurs'}
								FBObjectKey={'content_list'}
								getData={getFBData}
							/>
							<p class="text-left rounded m-3">{FBData.grund_kurs.content_text}</p>
							<Cms 
								type={'text'} 
								rows={4}
								value={FBData.grund_kurs.content_text}
								FBDocument={'kurser'}
								FBField={'grund_kurs'}
								FBObjectKey={'content_text'}
								getData={getFBData}
								prevArray={null}
								prevObjectField={null}
								index={null}
							/>
						</article>
	
						<article class="flex flex-col flex-start items-start mb-8">
							<h4 class="m-3 font-medium text-lg">{FBData.grund_kurs.content_title2}</h4> 
							<Cms 
								type={'text'} 
								rows={1}
								value={FBData.grund_kurs.content_title2}
								FBDocument={'kurser'}
								FBField={'grund_kurs'}
								FBObjectKey={'content_title2'}
								getData={getFBData}
								prevArray={null}
								prevObjectField={null}
								index={null}
							/>
							<ul style="list-style-type:disc" >
								{#each FBData.grund_kurs.content_list2 as text, index}
									<li class="ml-8 text-left">{text}</li>
									<Cms 
										type={'array'} 
										value={text}
										prevArray={FBData.grund_kurs.content_list2}
										prevObjectField={FBData.grund_kurs}
										rows={2}
										FBDocument={'kurser'}
										FBField={'grund_kurs'}
										FBObjectKey={'content_list2'}
										index={index}
										getData={getFBData}
									/>
								{/each}
							</ul>
	
							<CmsAddToArray 
								FBData={FBData}
								prevArray={FBData.grund_kurs.content_list2}
								prevObjectField={FBData.grund_kurs}
								FBDocument={'kurser'}
								FBField={'grund_kurs'}
								FBObjectKey={'content_list2'}
								getData={getFBData}
							/>
	
							<p class="text-left rounded m-3">{FBData.grund_kurs.content_text2}</p>
							<Cms 
								type={'text'} 
								rows={3}
								value={FBData.grund_kurs.content_text2}
								FBDocument={'kurser'}
								FBField={'grund_kurs'}
								FBObjectKey={'content_text2'}
								getData={getFBData}
								prevArray={null}
								prevObjectField={null}
								index={null}
							/>
						</article>
	
						<article class="flex flex-col flex-start items-start mb-8">
							<h4 class="m-3 font-medium text-lg">{FBData.grund_kurs.content_title3}</h4> 
							<Cms 
								type={'text'} 
								rows={1}
								value={FBData.grund_kurs.content_title3}
								FBDocument={'kurser'}
								FBField={'grund_kurs'}
								FBObjectKey={'content_title3'}
								getData={getFBData}
								prevArray={null}
								prevObjectField={null}
								index={null}
							/>
							<ul style="list-style-type:disc" >
								{#each FBData.grund_kurs.content_list3 as text, index}
									<li class="ml-8 text-left">{text}</li>
									<Cms 
										type={'array'} 
										value={text}
										prevArray={FBData.grund_kurs.content_list3}
										prevObjectField={FBData.grund_kurs}
										rows={1}
										FBDocument={'kurser'}
										FBField={'grund_kurs'}
										FBObjectKey={'content_list3'}
										index={index}
										getData={getFBData}
									/>
								{/each}
							</ul>
							<CmsAddToArray 
								FBData={FBData}
								prevArray={FBData.grund_kurs.content_list3}
								prevObjectField={FBData.grund_kurs}
								FBDocument={'kurser'}
								FBField={'grund_kurs'}
								FBObjectKey={'content_list3'}
								getData={getFBData}
							/>
	
							<p class="text-left rounded m-3">{FBData.grund_kurs.content_text3}</p>
							<Cms 
								type={'text'} 
								rows={3}
								value={FBData.grund_kurs.content_text3}
								FBDocument={'kurser'}
								FBField={'grund_kurs'}
								FBObjectKey={'content_text3'}
								getData={getFBData}
								prevArray={null}
								prevObjectField={null}
								index={null}
							/>
						</article>
					</section>
					
					<div>
	
						<FirebaseTable 
							tableContent={FBData.open_gym.tables[3]}
							FBData={FBData}
							tableIndexToUpdate={3}
							getData={getFBData}
						/>
				</div>
				</div>
			</div>
			<h2 class="link my-6"><a href="/anmälan" rel="external">Anmälan</a></h2>
		</CupcakeArticle>
	</article>


	<!-- Ska Jakob få ha PT på SWAG sidan? -->
	<!-- <CupcakeArticle>
		<h1>{FBData.pt_jakob.title}</h1>
		<Cms 
			type={'text'} 
			value={FBData.pt_jakob.title}
			prevArray={null}
			prevObjectField={null}
			index={null}
			rows={1}
			FBDocument={'kurser'}
			FBField={'pt_jakob'}
			FBObjectKey={'title'}
			getData={getFBData}
		/>
		<div class="flex flex-col w-full md:w-11/12">
			<div class="container p-4 ">
				<h2 class="mb-8">{FBData.pt_jakob.title2}</h2>
				<Cms 
					type={'text'} 
					value={FBData.pt_jakob.title2}
					prevArray={null}
					prevObjectField={null}
					index={null}
					rows={1}
					FBDocument={'kurser'}
					FBField={'pt_jakob'}
					FBObjectKey={'title2'}
					getData={getFBData}
				/>

				{#each FBData.pt_jakob.texts as text, index}

				<p class="text-start m-2">
					{text}
				</p>
				<Cms 
					type={'array'} 
					value={text}
					prevArray={FBData.pt_jakob.texts}
					prevObjectField={FBData.pt_jakob}
					rows={3}
					FBDocument={'kurser'}
					FBField={'pt_jakob'}
					FBObjectKey={'texts'}
					index={index}
					getData={getFBData}
				/>

				{/each}

				<CmsAddToArray 
					FBData={FBData}
					prevArray={FBData.pt_jakob.texts}
					prevObjectField={FBData.pt_jakob}
					FBDocument={'kurser'}
					FBField={'pt_jakob'}
					FBObjectKey={'texts'}
					getData={getFBData}
				/>

				<h2><bold>{FBData.pt_jakob.title3}</bold></h2>
				<Cms 
					type={'text'} 
					value={FBData.pt_jakob.title3}
					prevArray={null}
					prevObjectField={null}
					index={null}
					rows={1}
					FBDocument={'kurser'}
					FBField={'pt_jakob'}
					FBObjectKey={'title3'}
					getData={getFBData}
				/>

                <FirebaseTable 
					tableContent={FBData.open_gym.tables[3]}
					FBData={FBData}
					tableIndexToUpdate={3}
					getData={getFBData}
				/>
			</div>
		</div>
		<h2 class="link my-6"><a href="/anmälan">Anmälan</a></h2>
	</CupcakeArticle> -->

</section>

{:else}

<Loader isLoading={isLoading} />

{/if}

<style>
	.container-bg {
		background-color: #efeae6;
	}

	.title-link {
		text-decoration: underline;
		margin: 10px 0;
	}

</style>
