  <script lang="ts">
    import Table from "$lib/Table.svelte";
    import { createForm } from "svelte-forms-lib";
    import * as yup from "yup";
    import isSummer from "$lib/isSummer";''
    import kursInfo from "../kurser/kursInfo";
	// import type { PageData } from './$types'
  
	// export let data: PageData
	// $: ({ articles } = data)
    
    const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      course: "",
      name: "",
      birth: "",
      email: "",
      adress: "",
      postNr: "",
      phoneNr: "",
      message: "",
    },
    validationSchema: yup.object().shape({
      course: yup
        .string()
        .oneOf(["Open gym - Gymnastikens hus", "Open gym - Nodhemskolan", "Muscle up & handstående kurs"])
        .required(),
      name: yup.string().required('Namn måste anges'),
      birth: yup.string().required('Vi behöver ditt födelsedatum för att få bidrag'),
      email: yup.string().email().required('Du kommer inte bli spamad av oss'),
      adress: yup.string().required('Vi behöver din adress för att få bidrag'),
      postNr: yup.string().required('Vi behöver ditt postnummer för att få bidrag'),
      phoneNr: yup.string(),
      message: yup.string(),
    }),
    onSubmit: values => {
      // handleSubmit gör att action inte körs i form. 
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
        <h1>Anmälan till kurs eller open gym</h1>
        <h2 class="m-4">Vi behöver följande information för att få bidrag av akriv ungdom</h2>
    
        <form
          id="application-form"
          class="flex flex-col items-center gap-4" 
          action="?/createArticle" 
          method="POST" 
          >

        <div>
          <label for="course">Välj kurs eller open gym</label>
          <select
            id="course"
            name="course"
            on:change={handleChange}
            bind:value={$form.course}
          >
            {#if isSummer }
            <!-- OM DU SKA LÄGGA TILL EN TILL OPTION måste du lägga in det validationSchema -> oneOf -->
            <option>Open gym - Gymnastikens hus</option>
              {:else}
              <option>Open gym - Nodhemskolan</option>
              {/if}
            <option>Muscle up & handstående kurs</option>
          </select>
          {#if $errors.course}
            <small>{$errors.course}</small>
          {/if}
        </div>
    
        <div>
          <label for="namn">Namn</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Namn"
            on:change={handleChange}
            on:blur={handleChange}
            bind:value={$form.name}
          />
          {#if $errors.name}
          <small>{$errors.name}</small>
          {/if}
        </div>

        <div>
          <label for="birth">Födelsedagsdatum 8 siffror: ÅÅÅÅMMDD-XXXX</label>
          <input 
            type="text"
            name="birth"
            id="birth"
            placeholder="ÅÅÅÅMMDD-XXXX"
            on:change={handleChange}
            on:blur={handleChange}
            bind:value={$form.birth}
          >
          {#if $errors.birth}
          <small>{$errors.birth}</small>
          {/if}
        </div>

        <div>
          <label for="email">email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            on:change={handleChange}
            on:blur={handleChange}
            bind:value={$form.email}
          />
          {#if $errors.email}
          <small>{$errors.email}</small>
          {/if}
        </div>

        <div>
          <label for="adress">Adress</label>
          <input 
            type="text"
            name="adress"
            id="adress"
            placeholder="Adress"
            on:change={handleChange}
            on:blur={handleChange}
            bind:value={$form.adress}
          >
        </div>

        <div>
          <label for="postNr">Postnummer</label>
          <input 
            type="text"
            name="postNr"
            id="postNr"
            placeholder="Postnummer"
            on:change={handleChange}
            on:blur={handleChange}
            bind:value={$form.postNr}
          >
        </div>

        <div>
          <label for="phoneNr">Telefonnummer</label>
          <input 
            type="text"
            name="phoneNr"
            id="phoneNr"
            placeholder="Valfritt"
            on:change={handleChange}
            on:blur={handleChange}
            bind:value={$form.phoneNr}
          >
        </div>

        <div>
          <label for="message">Vad är du intessedad av?</label>
          <input 
            type="text"
            name="message"
            id="message"
            placeholder="Valfritt meddelande"
            on:change={handleChange}
            on:blur={handleChange}
            bind:value={$form.message}
          >
        </div>


        {#if $form.course && $form.name && $form.email}
            <Table 
                headers={["Din ansökan", ""]}
                data={[
                  [kursInfo[0].kurs + ' ' + kursInfo[0].plats, ''],
                  ['Pris',  kursInfo[0].prisTermin],
                  ["Swisha 'JAKOB FOGELKLOU' för att gå vidare", "0738546407"]
                ]}
            />        
            
            <div class="flex items-center m-8 ">
              <label for="radio-2" class="mx-4 margin-y0">Jag har swichat </label>
              <input type="checkbox" name="radio-2" class=" radio radio-sm radio-secondary" bind:checked={radioChecked} />
            </div>
            <label class="mx-4 margin-y0">Du kommer få ett bekräftelsemail med information om din ansökan</label>
            
          {/if}
        <button 
          disabled={
            !radioChecked || 
            $form.course == "" || 
            $form.name == "" || 
            $form.birth == "" || 
            $form.email == "" || 
            $form.adress == "" ||
            $form.postNr == ""
            ? true : false 
          } 
          class="btn my-8 martin-y40" 
          type="submit"
        >Skicka</button>
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

#application-form div {
  width: 340px;
  max-width: 70vw;
}

label {
  color: #a6adbb;
}
</style>