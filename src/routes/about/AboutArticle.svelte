<script lang="ts">
	import CupcakeArticle from "$lib/CupcakeArticle.svelte";

    export let title : string | null;
    export let paragraf : Array<string> ;
    export let IMG : string;
    export let ALT : string | null;
    export let imgLeft : Boolean | null; 
    export let imgYCenter : Boolean | null;
    export let link : string | null;
    export let linkText : string | null;
</script> 

<CupcakeArticle>
    {#if title}
	<h1>{title}</h1>
    {/if}
    <div class=" flex flex-wrap justify-center {imgLeft ? "flex-row-reverse" : "flex-row"}">
        <div class="basis-4/5 md:basis-1/2 p-3 {imgYCenter && "my-auto"}">
            <img 
                class="object-contain w-full max-height-img" 
                src={IMG}
                alt={ALT}
            />
        </div>
    
        <div id="paragrafs" class="md:basis-1/2 p-3 md:pr-8" >
            {#each paragraf as text }
                <p class="m-4">{text}</p>
            {/each}
            {#if (link && link)}
                <p>{linkText} 
                    <br><br>
                    <a class="link" href={link}>{link}</a>
                </p>
            {/if}
        </div>
        
    </div>
        
</CupcakeArticle>
