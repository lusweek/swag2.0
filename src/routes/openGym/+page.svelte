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


        let isLoading = false

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

<div class="sw sw-page">
<section class="sw-subhero">
	<div class="sw-wrap">
		<span class="sw-eyebrow">/ Fri träning</span>
		<h1>Open Gym</h1>
		<p>
			Ta din träning i egna händer tillsammans med oss. Stänger, ringar och mattor —
			träna i din egen takt med stöd från klubben.
		</p>
	</div>
</section>

{#if FBData}

<section class="flex items-center w-screen flex-col">
    <CupcakeArticle>
        <div class="flex flex-col w-full md:w-10/12">
            <div class="container p-4 ">
    
                <h1>{FBData.open_gym.title}</h1>
                <Cms 
                    type={'text'} 
                    rows={1}
                    value={FBData.open_gym.title}
                    FBDocument={'kurser'}
                    FBField={'open_gym'}
                    FBObjectKey={'title'}
                    getData={getFBData}
                    prevArray={null}
                    prevObjectField={null}
                    index={null}
                />
                <h2 class="mb-4">{FBData.open_gym.title2}</h2>
                <Cms 
                    type={'text'} 
                    rows={2}
                    value={FBData.open_gym.title2}
                    FBDocument={'kurser'}
                    FBField={'open_gym'}
                    FBObjectKey={'title2'}
                    getData={getFBData}
                    prevArray={null}
                    prevObjectField={null}
                    index={null}
                />
                
    
                {#each FBData.open_gym.texts as text, index}
    
                    <p class="text-start m-2">
                        {text}
                    </p>
                    <Cms 
                        type={'array'} 
                        value={text}
                        prevArray={FBData.open_gym.texts}
                        prevObjectField={FBData.open_gym}
                        rows={3}
                        FBDocument={'kurser'}
                        FBField={'open_gym'}
                        FBObjectKey={'texts'}
                        index={index}
                        getData={getFBData}
                    />
    
                {/each}
    
                <CmsAddToArray 
                    FBData={FBData}
                    prevArray={FBData.open_gym.texts}
                    prevObjectField={FBData.open_gym}
                    FBDocument={'kurser'}
                    FBField={'open_gym'}
                    FBObjectKey={'texts'}
                    getData={getFBData}
                />
            </div>
            <FirebaseTable 
                tableContent={FBData.open_gym.tables[0]}
                FBData={FBData}
                tableIndexToUpdate={0}
                getData={getFBData}
            />

            <div class="sw-map">
                <div class="sw-map-head">
                    <span class="sw-map-eyebrow">/ Plats</span>
                    <a
                        href="https://www.google.com/maps/dir/?api=1&destination=Gymnastikens+Hus%2C+Rymdtorget+8A%2C+415+66+G%C3%B6teborg"
                        target="_blank"
                        rel="noopener noreferrer">Vägbeskrivning →</a>
                </div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2189.659591918173!2d12.067499077078253!3d57.75582807389086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464ff5ce3af598cf%3A0xf8f589d8e52cf02f!2sGymnastikens%20Hus!5e0!3m2!1ssv!2sse!4v1757109966201!5m2!1ssv!2sse"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    title="Karta till Gymnastikens Hus"
                    />
                <div class="sw-map-foot">
                    <span class="dot"></span>
                    <span>Rymdtorget 8A · 415 66 Göteborg</span>
                </div>
            </div>
    
            <div class="flex w-full items-center justify-end">
                <p class="text-end">Håll dig uppdaterad, bli inspirerad!<br />här på instagram:</p>
                <a target="_blank" href="https://www.instagram.com/swag_streetworkout/">
                    <div class="h-8"><IoLogoInstagram /></div>
                </a>
            </div>
        </div>
        <a class="sw-cta-link" href="/anmälan" rel="external">Anmälan →</a>
    </CupcakeArticle>
</section>

    {:else}

{#if !isLoading}
	<section class="sw-wrap sw-empty">
		<p>Kunde inte ladda open gym just nu. Ladda om sidan eller försök igen senare.</p>
	</section>
{/if}
<Loader isLoading={isLoading} />

{/if}
</div>


