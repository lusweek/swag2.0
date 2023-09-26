<script lang="ts">
    export let title: string
    export let text: string
    export let img: string
    export let alt: string

</script>

<div class="card w-96 bg-base-100 shadow-xl" data-theme="cupcake">
    <figure><img src={img} alt={alt} /></figure>
    <div class="card-body">
      <h2 class="card-title">{title}</h2>
      <p>{text}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Läs mer</button>
      </div>
    </div>
  </div>