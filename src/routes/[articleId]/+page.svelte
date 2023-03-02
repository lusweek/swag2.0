<script lang="ts">
    import type { PageData } from "./$types"

    export let data: PageData
    $: ({ article } = data)
</script>


<form action="?/updateArticle" method="POST">
    <h3>Edditing: {article.name}</h3>
    <label for="kurs"> Kurs </label>
    <input value={article.kurs} type="text" id="kurs" name="kurs" />
    <label for="name"> name </label>
    <input value={article.name} type="text" id="name" name="name" />
    <label for="email"> email </label>
    <input value={article.email} type="text" id="email" name="email" />
    <button type="submit">Update Article</button>
</form>

<style>
    
</style>