<script>
    export let IMG = "";
    export let ALT = "";
    export let paragraf = [];

    paragraf.map((text) => {
        document.getElementById('paragrafs')?.appendChild
    })

</script>

<article class="flex w-full mx-3 flex-wrap justify-center">
	<div class="basis-1/2 p-3">
		<img 
            class="object-contain w-full max-height-img" 
            src={IMG}
            alt={ALT}
        />
	</div>

    <div id="paragrafs">

    </div>
    
    
</article>
