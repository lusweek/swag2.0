<script lang="ts">
    import type { PageData } from "./$types"

    export let data: PageData
    $: ({ article } = data)
</script>


<form action="?/updateArticle" method="POST">
    <h3>Edditing: {article.title}</h3>
    <label for="title"> Title </label>
    <input value={article.title} type="text" id="title" name="title" />
    <label for="title"> Title </label>
    <textarea value={article.content} id="content" name="content" rows={5} />
    <button type="submit">Update Article</button>
</form>