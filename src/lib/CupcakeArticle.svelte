
<article
		data-theme="cupcake"
		id="cupcake-id"
		class="container container-bg flex flex-col items-center text-center m-auto py-6 my-6 rounded w-screen"
	>
<slot></slot>
</article>

<style>
/* På telefon (små skärmar) */
  #cupcake-id {
    width: 100vw;
  }

/* På stora skärmar */
@media (min-width: 1200px) {
  #cupcake-id {
    width: 70vw;
  }
}
</style>
