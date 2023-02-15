  <script>
    import Table from "$lib/Table.svelte";
    import { createForm } from "svelte-forms-lib";
    import isSummer from "../../Components/isSummer";''
    import kursInfo from "../kurser/kursInfo";

    const { form, handleChange, handleSubmit } = createForm({
      initialValues: {
        kurs: "",
        name: "",
        email: ""
      },
      onSubmit: values => {
        alert(JSON.stringify(values));
      }
    });
  </script>


<section class="flex flex-col items-center">

    <article
        data-theme="cupcake"
		class="container flex flex-col items-center text-center m-6 rounded py-8"
    >
        <h1>Anmälan</h1>
        <h2>Anmäl dig till kurs eller pt</h2>
    
      <form class="flex flex-col items-center" on:submit={handleSubmit}>
        <label for="title">Välj</label>
        <select
          id="title"
          name="title"
          on:change={handleChange}
          bind:value={$form.kurs}>
          {#if isSummer }
          <option>Open gym - Gymnastikens hus</option>
            {:else}
            <option>Open gym - Nodhemskolan</option>
            {/if}
          <option>Muscle up & handstående kurs</option>
          <!-- <option>PT med Jakob Fogelklou</option> -->
        </select>

        {#if $form.kurs}
            <!-- <Table 
                tr={[
                    kursInfo.

                    kurs
                    plats
                    link
                    prisEngångs
                    prisTermin
                    tillfällen

                ]}
            /> 
        
            hummmmmmm
        -->
        {/if}
    
        <label for="name">name</label>
        <input
          id="name"
          name="name"
          on:change={handleChange}
          bind:value={$form.name}
        />
    
        <label for="email">email</label>
        <input
          id="email"
          name="email"
          on:change={handleChange}
          bind:value={$form.email}
        />
    
        <button type="submit">Skicka</button>
      </form>
    </article>




</section>



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