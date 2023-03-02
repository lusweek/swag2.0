  <script lang="ts">
    import '../../app.css'
    import Table from "$lib/Table.svelte";
    import { createForm } from "svelte-forms-lib";
    import * as yup from "yup";
    import isSummer from "$lib/isSummer";''
    import kursInfo from "../kurser/kursInfo";
	import type { PageData } from './$types'

	export let data: PageData
	$: ({ articles } = data)
    
    const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      name: "",
      email: "",
      kurs: ""
    },
    validationSchema: yup.object().shape({
      kurs: yup
        .string()
        .oneOf(["Open gym - Gymnastikens hus", "Open gym - Nodhemskolan", "Muscle up & handstående kurs"])
        .required(),
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required()
    }),
    onSubmit: values => {
      alert(JSON.stringify(values));
    }
  });

    let radioChecked = false

  </script>


<section class="flex flex-col items-center">

    <article
        data-theme="dark"
		class="container flex flex-col items-center text-center m-6 rounded py-8"
    >
        <h1>Anmälan</h1>
        <h2>Anmälan till kurs, open gym eller pt</h2>
    
		<!-- on:submit={handleSubmit} -->
      <form 
		action="?/createArticle" 
		method="POST" 
		class="flex flex-col items-center" 
		>
        <label for="kurs">Välj</label>
        <select
          id="kurs"
          name="kurs"
          on:change={handleChange}
          bind:value={$form.kurs}>
          {#if isSummer }
          <!-- OM DU SKA LÄGGA TILL EN TILL OPTION måste du lägga in det validationSchema -> oneOf -->
          <option>Open gym - Gymnastikens hus</option>
            {:else}
            <option>Open gym - Nodhemskolan</option>
            {/if}
          <option>Muscle up & handstående kurs</option>
        </select>
        {#if $errors.kurs}
          <small>{$errors.kurs}</small>
        {/if}
    
        <label for="namn">name</label>
        <input
          id="name"
          name="name"
		  type="text"
          on:change={handleChange}
          on:blur={handleChange}
          bind:value={$form.name}
        />
        {#if $errors.name}
        <small>{$errors.name}</small>
        {/if}
    
        <label for="email">email</label>
        <input
          id="email"
          name="email"
		  type="text"
          on:change={handleChange}
          on:blur={handleChange}
          bind:value={$form.email}
        />
        {#if $errors.email}
        <small>{$errors.email}</small>
        {/if}

        {#if $form.kurs && $form.name && $form.email}
            <Table 
                headers={["Din ansökan", ""]}
                data={[
                  [kursInfo[0].kurs + ' ' + kursInfo[0].plats, ''],
                  ['Pris',  kursInfo[0].prisTermin],
                  ["Swisha 'JAKOB FOGELKLOU' för att gå vidare", "0738546407"]
                ]}
            />        
            
            <div class="flex items-center m-8 ">
              <label class="mx-4 margin-y0">Jag har swichat </label>
              <input type="checkbox" name="radio-2" class=" radio radio-sm radio-secondary" bind:checked={radioChecked} />
            </div>
            <label class="mx-4 margin-y0">Du kommer få ett bekräftelsemail med information om din ansökan</label>
            
          {/if}
        <button disabled={!radioChecked || $form.name == "" || $form.email == "" || $form.kurs == "" ? true : false } class="btn my-8 martin-y40" type="submit">Skicka</button>
      </form>
    </article>

	<!--  -->

	<div>
		<h1>Articles</h1>
		{#each articles as article }
		  <h2>{article.kurs}</h2>
		  <p>{article.email}</p>
		  <p>{article.name}</p>
		  <form action="?/deleteArticle&id={article.id}" method="POST">
			<button type="submit">Ta bort</button>
		  </form>  
		  <a href="/{article.id}" role="button">Eddit article</a>
		{/each}
	  </div>
	
		<form action="?/createArticle" method="POST">
			<h3>New Article</h3>
			<label for="title"> Title </label>
			<input type="text" id="title" name="title" />
			<label for="title"> Title </label>
			<textarea id="content" name="content" rows={5} />
			<button type="submit">Add Article</button>
		</form>
	</section>
	
	<!--  -->

<style>

    :root {
  --primary-light: #a6f9d6;
  --primary: #5be2a9;
  --primary-dark: #53ce9a;
  --secondary: #1e2145;
  --white: #fff;
  --grey: #e6e6ff;
  --grey-dark: #6d7098;
  --red: #ff6b6b;
}

input,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  max-width: 400px;
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid var(--grey);
  border-radius: 4px;
  transition: all 150ms ease;
  background: var(--white);
}

select {
  height: 45px;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgb(227, 227, 245);
  border-color: var(--grey);
}

input:disabled,
select:disabled,
textarea:disabled {
  color: #ccc;
}

button {
  color: #fff;
  background-color: var(--primary);
  border: none;
  text-transform: uppercase;
  letter-spacing: 1.8px;
  outline: none;
  border-radius: 4px;
  display: block;
  margin-top: 12px;
  line-height: 1.8;
  font-size: 12px;
  padding: 10px 18px;
  min-width: 120px;
  transition: all 150ms ease;
  cursor: pointer;
}

button:disabled {
  background-color: var(--grey);
}

button:focus:not(:disabled) {
  box-shadow: 0 0 0 4px var(--primary-light);
}

button:hover:not(:disabled) {
  background-color: var(--primary-dark);
}

label {
  display: block;
  color: var(--grey-dark);
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 4px;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1.9px;
  line-height: 2;
}

/* used for errors */
small {
  display: block;
  font-size: 12px;
  color: var(--red);
  margin-top: 10px;
}
</style>