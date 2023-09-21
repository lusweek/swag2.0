<script>
    export let text1;
    export let text2;
    export let marginTop;
    export let img;
    export let btnText;
    export let imgAlt;
    export let endpoint

</script>

<article class="card w-96 bg-base-100 shadow-xl image-full">
    <figure><img src={img} alt="{imgAlt}" /></figure>
    <div class="py-2 card-body items-center text-center justify-between">
        <h2 style="margin-top: {marginTop};" class="card-title leading-10 text-xl md:text-2xl">{text1}<br>{text2}</h2>
        <div class="card-actions justify-center">
            <a href="/{endpoint}"><button class="btn btn-primary">{btnText}</button></a>
      </div>
    </div>
</article>