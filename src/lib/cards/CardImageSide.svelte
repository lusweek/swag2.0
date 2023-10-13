<script lang="ts">

    export let title :string
    export let text :string
    export let img :string
    export let alt :string
    export let href :string

</script>

<div class="card lg:card-side lg:w-110 w-72 bg-base-100 shadow-xl" data-theme="cupcake">
    <figure class="lg:max-w-[216px] max-h-[300px]"><img class="h-full" src={img} alt={alt}/></figure>
    <div class="card-body p-[1rem] gap-[1rem]">
      <h2 class="card-title self-center lg:self-start">{title}</h2>
      <p class="mx-2 my-0">{text}</p>
      <div class="card-actions justify-center lg:justify-end">
        <a href={href}>
            <button class="btn btn-primary">Läs mer</button>
        </a>
      </div>
    </div>
  </div>