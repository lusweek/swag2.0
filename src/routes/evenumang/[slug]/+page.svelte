<script>
    import '../../../app.css'

    export let data
    let event = {}
    if (data) event = data.event

</script>

<section class="flex items-center w-screen flex-col" >
    <article data-theme="cupcake" class="container flex flex-col items-center text-center m-6 rounded border-orange-400 border-solid border-8 pb-8">
        <h1>{event.title}</h1>
        <h2>{event.date} </h2>
        <p>{event.text}</p>
     </article>
</section>