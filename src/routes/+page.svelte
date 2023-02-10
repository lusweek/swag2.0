<script>
    import '../app.css'
    let title = 'SWAG'
</script>

<!-- såhär lägger man in theme:
    data-theme="cyberpunk" -->
<div class="index">
    <h1 class="text-3xl font-bold underline">
        {title}</h1>
        <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae ducimus debitis ab modi corporis nulla enim, impedit laboriosam quibusdam vero mollitia deleniti ea quaerat, quisquam aliquam? Maxime aliquam ea in!
        </p>
</div>

<label for="change">ändra titel</label>
<input id="change" type="text" bind:value={title} />

<style>
    .index{ 
        text-align: center;
        display: block;
        margin: 20px auto;
    }
</style>