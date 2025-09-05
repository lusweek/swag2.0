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

<h1>Open Gym</h1>


{#if !isLoading}

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
        <h2 class="link my-6"><a href="/anmälan" rel="external">Anmälan</a></h2>
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


