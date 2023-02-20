<script>
    export let IMG;
    export let ALT;
    export let paragraf;
    export let imgLeft; 
    export let title;
    export let link;
    export let linkText;
</script> 

<article class="flex w-full mx-3 mb-8 lg:w-3/5 2xl:w-2/5 flex-wrap justify-center ">
    {#if title}
	<h1>{title}</h1>
    {/if}
    <div class=" flex flex-wrap justify-center {imgLeft ? "flex-row-reverse" : "flex-row"}">
        <div class="basis-4/5 md:basis-1/2 p-3">
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
            {#if (link)}
                <p>{linkText} 
                    <br>
                    <a class="link" href={link}>{link}</a>
                </p>
            {/if}
        </div>
        
    </div>
        
</article>
