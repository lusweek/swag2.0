<script lang="ts">
    import '../../app.css'
    import { getDocs, collection } from 'firebase/firestore';
	import { db } from '$lib/firebase/firebase.client';
	import Loader from '$lib/Loader.svelte';

    // Gets data from firestore
    
    const evenumangRef = collection(db, 'evenumang');
    let evenumang: Array<object> = [];
    let isLoading = false

    const getEvenumang = async () => {
        isLoading = true
        const data = await getDocs(evenumangRef);
        evenumang = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        isLoading = false
    };
    getEvenumang();

</script>

<h1>Nästa evenumang</h1>

{#if evenumang}
    {#each evenumang as event }
    <section class="flex items-center w-screen flex-col" >
        <article data-theme="light" class="container flex flex-col items-center text-center m-6 rounded pb-6">
            <h1>{event.title}</h1>
            <h2>{event.date} </h2>
                <p>{event.text}</p>
                
                <!-- <div>
                    <h2>Galleri</h2>
                    <a href="/evenumang/1/">test</a>
                </div> -->
                <a href={`/evenumang/${event.id}`}>
                    <button class="btn btn-info">Läs mer</button>
                </a>
            </article>
        </section>
    {/each}
{/if}
<Loader isLoading={isLoading} />
