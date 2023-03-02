<script>
    export let text1;
    export let text2;
    export let marginTop;
    export let img;
    export let btnText;
    export let imgAlt;
    export let endpoint

    const navigate = () => window.location.href = `/${endpoint}`;

</script>

<article class="card w-96 bg-base-100 shadow-xl image-full">
    <figure><img src={img} alt="{imgAlt}" /></figure>
    <div class="py-2 card-body items-center text-center justify-between">
        <h2 style="margin-top: {marginTop};" class="card-title leading-10">{text1}<br>{text2}</h2>
        <div class="card-actions justify-center">
        <button on:click={navigate} class="btn btn-primary">{btnText}</button>
      </div>
    </div>
</article>