<script lang="ts">
    export let title: string
    export let text: string
    export let img: string
    export let alt: string

</script>

<div class="card w-72 bg-base-100 shadow-xl" data-theme="cupcake">
    <figure><img src={img} alt={alt} /></figure>
    <div class="card-body items-center p-[1.3rem]">
      <h2 class="card-title">{title}</h2>
      <p class="mx-2 my-0">{text}</p>
    </div>
  </div>