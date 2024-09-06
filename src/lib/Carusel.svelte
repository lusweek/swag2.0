<script lang="ts">
	import { getImagesFromFolder } from '$lib/imageFetcher'

    let images:Array<string> = []
        
        async function getImages() {
            images = await getImagesFromFolder('startsida_carusel');
            console.log('images: ', images)
        }
        getImages()
        
</script>


{#if images.length !== 0}
<article data-theme="cupcake"
	class="container container-bg m-auto p-6 rounded w-screen w-full">
    
        <div class="carousel w-full lg:w-2/3 m-auto">
        
        {#each images as image, index }
        <div id={`slide${index}`} class="carousel-item relative w-full">
            <img src={image} alt="Bild i galleri" class="w-full" />
            <div class="absolute flex justify-between transform -translate-y-1/2 w-full left-0 right-5 top-1/2">
                {#if index === 0}
                <a href={`#slide${images.length - 1}`} class="btn btn-circle w-6">❮</a> 
                <a href={`#slide${index + 1}`} class="btn btn-circle w-6">❯</a>
                {:else if index === images.length - 1}
                <a href={`#slide${index - 1}`} class="btn btn-circle w-6">❮</a> 
                <a href={`#slide0`} class="btn btn-circle w-6">❯</a>
                {:else}
                <a href={`#slide${index - 1}`} class="btn btn-circle w-6">❮</a> 
                <a href={`#slide${index + 1}`} class="btn btn-circle w-6">❯</a>
                {/if}
            </div>
        </div> 
        {/each}

    </div>
</article>
{/if}