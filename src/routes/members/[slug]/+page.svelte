<script lang="ts">

    import '../../../app.css'
    import { createForm } from 'svelte-forms-lib';
    import * as yup from 'yup';
    import { doc, updateDoc } from "firebase/firestore";
    import { db } from '$lib/firebase/firebase.client';
    import Loader from '$lib/Loader.svelte';

    // Hämtar data från +page.server.ts
    export let data

    type Member = {
		fName: '',
		lName: '',
		birth: '',
		email: '',
		adress: '',
		postNr: '',
		phoneNr: '',
		message: '',
        id: ''
	}

    let member: Member
    if (data) member = data.member 
    else member = {}
    
    member = data.member
  

      let isLoading = false
  
  // Formulär
      const { form, errors, state, handleChange, handleSubmit } = createForm({
          initialValues: {
              fName: member.fName ?? '',
              lName: member.lName ?? '',
              birth: member.birth ?? '',
              email: member.email ?? '',
              adress: member.adress ?? '',
              postNr: member.postNr ?? '',
              phoneNr: member.phoneNr ?? '',
              message: member.message ?? ''
      },
          validationSchema: yup.object().shape({
              fName: yup.string(),
              lName: yup.string(),
              birth: yup.string(),
              email: yup.string().email(),
              adress: yup.string(),
              postNr: yup.string(),
              phoneNr: yup.string(),
              message: yup.string(),
          }),
          onSubmit: (values) => {
        alert(JSON.stringify(values));
          }
      });
  
    let values = {
        fName: member.fName ?? '',
        lName: member.lName ?? '',
        birth: member.birth ?? '',
        email: member.email ?? '',
        adress: member.adress ?? '',
        postNr: member.postNr ?? '',
        phoneNr: member.phoneNr ?? '',
        message: member.message ?? ''
    }

    // Uppdaterar data till Firebase
    const membersRef = doc(db, 'members', member.id);
  
    async function handleFormSubmit() {
        await updateDoc(membersRef, {
            fName: values.fName,
            lName: values.lName,
            birth: values.birth,
            email: values.email,
            adress: values.adress,
            postNr: values.postNr,
            phoneNr: values.phoneNr,
            message: values.message
        });
        location.href='/members'
    }
      
  </script>

{#if data !== undefined}
  
  <section class="flex flex-col items-center">
      <article
          data-theme="dark"
          class="container flex flex-col items-center text-center m-6 rounded py-8"
      >
      <h1>Uppdatera användare: {member.fName}</h1>

          <form
      id="application-form"
      class="flex flex-col items-center gap-4"
      action="?/createArticle"
          >

              <div>
                  <label for="fName">Namn</label>
                  <input
                      id="fName"
                      name="fName"
                      type="text"
                      placeholder="Namn"
                      on:change={handleChange}
                      on:blur={handleChange}
            bind:value={values.fName}
                  />
                  {#if $errors.fName}
                      <small>{$errors.fName}</small>
                  {/if}
              </div>
  
        <div>
                  <label for="lName">Efternamn</label>
                  <input
                      id="lName"
                      name="lName"
                      type="text"
                      placeholder="Efternamn"
                      on:change={handleChange}
                      on:blur={handleChange}
                      bind:value={values.lName}
                  />
                  {#if $errors.lName}
                      <small>{$errors.lName}</small>
                  {/if}
              </div>
  
              <div>
                  <label for="birth">Födelsedagsdatum 12 siffror: ÅÅÅÅMMDDXXXX</label>
                  <input
                      type="tel"
                      name="birth"
                      id="birth"
                      placeholder="ÅÅÅÅMMDDXXXX"
                      on:change={handleChange}
                      on:blur={handleChange}
                      bind:value={values.birth}
                  />
                  {#if $errors.birth}
                      <small>{$errors.birth}</small>
                  {/if}
              </div>
  
              <div>
                  <label for="email">email</label>
                  <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      on:change={handleChange}
                      on:blur={handleChange}
                      bind:value={values.email}
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
                      bind:value={values.adress}
                  />
              </div>
  
              <div>
                  <label for="postNr">Postnummer</label>
                  <input
                      type="tel"
                      name="postNr"
                      id="postNr"
                      placeholder="Postnummer"
                      on:change={handleChange}
                      on:blur={handleChange}
                      bind:value={values.postNr}
                  />
              </div>
  
              <div>
                  <label for="phoneNr">Telefonnummer</label>
                  <input
                      type="tel"
                      name="phoneNr"
                      id="phoneNr"
                      placeholder="Valfritt"
                      on:change={handleChange}
                      on:blur={handleChange}
                      bind:value={values.phoneNr}
                  />
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
                      bind:value={values.message}
                  />
              </div>
                <div class="flex justify-between">
                    <button
                        class="btn btn-error my-8 martin-y40"
                        type="button"
                        on:click={() => history.back()}
                    >Avbryt</button>
                    <button
                        class="btn custom-button my-8 martin-y40"
                        type="submit"
                        on:click={handleFormSubmit}
                    >Uppdatera</button
                    >
                </div>
          </form>
      </article>
      <Loader isLoading={isLoading} />
  
  </section>

  {:else}
<Loader isLoading={true} />
{/if}
  
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
  
      .custom-button {
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
  
      .custom-button:hover:not(:disabled) {
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
  
      #application-form div {
          width: 340px;
          max-width: 70vw;
      }
  
      label {
          color: #a6adbb;
      }
  </style>
  