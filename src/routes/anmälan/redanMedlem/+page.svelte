<script lang="ts">
    import '../../../app.css'
      import FirebaseTable from '$lib/tables/FirebaseTable.svelte';
      import { createForm } from 'svelte-forms-lib';
      import * as yup from 'yup';
      import kursInfo from '../../kurser/kursInfo';
      import { getDocs, addDoc, collection } from 'firebase/firestore';
      import { db } from '$lib/firebase/firebase.client';
      import Loader from '$lib/Loader.svelte';
      import { notifications } from '$lib/utilis/notifications';
  
  
      let isLoading = false
      let radioChecked = false;
  
  
      const { form, errors, state, handleChange, handleSubmit } = createForm({
          initialValues: {
        course: '',
              fName: '',
              lName: '',
              birth: '',
              email: '',
              adress: '',
              postNr: '',
              phoneNr: '',
              message: ''
      },
          validationSchema: yup.object().shape({
              course: yup
                  .string()
                  .oneOf([
                      'Open gym - Gymnastikens hus',
                      'Open gym - Nordhemsskolan',
                      'Muscle up kursen'
                  ])
                  .required(),
              fName: yup.string().required('Namn måste anges'),
              lName: yup.string().required('Efternamn måste anges'),
              birth: yup.string().required('Vi behöver ditt födelsedatum för att få bidrag'),
              email: yup.string().email().required('Du kommer inte bli spamad av oss'),
              adress: yup.string().required('Vi behöver din adress för att få bidrag'),
              postNr: yup.string().required('Vi behöver ditt postnummer för att få bidrag'),
              phoneNr: yup.string(),
              message: yup.string()
          }),
          onSubmit: (values) => {
              // handleSubmit gör att action inte körs i form.
        // submit fungerar inte alls
              alert(JSON.stringify(values));
          }
      });
  
    let values = {
              fName: '',
              lName: '',
              birth: '',
              email: '',
              adress: '',
              postNr: '',
              phoneNr: '',
              message: ''
    }
  
    function handleFormSubmit() {
      createMember()
    }
  
      // Adds document to firestore
  
      async function createMember() {
          isLoading = true
          await addDoc(membersRef, values).then(data => {
              notifications.success('Tack! Nu blir det lättare för Jakob!');
          }).catch(err => {
              notifications.error('Något gick fel... Prova igen');
          }).finally(() => isLoading = false)
      values = {
              fName: '',
              lName: '',
              birth: '',
              email: '',
              adress: '',
              postNr: '',
              phoneNr: '',
              message: ''
      }
      };
  
    
      // Gets data from firestore
      const membersRef = collection(db, 'members');
    
      let members: Array<object> = [];
      const getMembers = async () => {
        const data = await getDocs(membersRef);
        members = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      };
      
      getMembers();
      
  </script>
  
  <section class="flex flex-col items-center">
      <article
          data-theme="dark"
          class="container flex flex-col items-center text-center m-6 rounded py-8"
      >
          <h1>Redan medlem? <br /> Fyll i din information här så blir det lättare för Jakob att hålla ordning och reda på alla medlemmar!</h1>
    
          <form
      id="application-form"
      class="flex flex-col items-center gap-4"
      action="?/createArticle"
          >
              <div>
                  <label for="fName">Namn*</label>
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
                  <label for="lName">Efternamn*</label>
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
                  <label for="birth">Födelsedagsdatum 12 siffror: ÅÅÅÅMMDDXXXX*</label>
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
                  <label for="email">Email*</label>
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
                  <label for="adress">Adress*</label>
                  <input
                      type="text"
                      name="adress"
                      id="adress"
                      placeholder="Adress"
                      on:change={handleChange}
                      on:blur={handleChange}
                      bind:value={values.adress}
                  />
                  {#if $errors.adress}
                      <small>{$errors.adress}</small>
                  {/if}
              </div>
  
              <div>
                  <label for="postNr">Postnummer*</label>
                  <input
                      type="tel"
                      name="postNr"
                      id="postNr"
                      placeholder="Postnummer"
                      on:change={handleChange}
                      on:blur={handleChange}
                      bind:value={values.postNr}
                  />
                  {#if $errors.postNr}
                      <small>{$errors.postNr}</small>
                  {/if}
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
  
              {#if $form.course && $form.fName && $form.email}
                  <Table
                      headers={['Din ansökan', '']}
                      data={[
                          [kursInfo[0].kurs + ' ' + kursInfo[0].plats, ''],
                          ['Pris', kursInfo[0].prisTermin],
                          ["Swisha 'SWAG - Street Workout Athlete Gothenburg' för att gå vidare", '0738546407']
                      ]}
                  />
  
                  <div class="flex items-center m-8 ">
                      <label for="radio-2" class="mx-4 margin-y0">Jag har swichat </label>
                      <input
                          type="checkbox"
                          name="radio-2"
                          class=" radio radio-sm radio-secondary"
                          bind:checked={radioChecked}
                      />
                  </div>
                  <label class="mx-4 margin-y0"
                      >Du kommer få ett bekräftelsemail med information om din ansökan</label
                  >
              {/if}
              <button
                  disabled={
                      $form.fName == '' ||
                      $form.lName == '' ||
                      $form.birth == '' ||
                      $form.email == '' ||
                      $form.adress == '' ||
                      $form.postNr == ''
                  }
                  class="btn my-8 martin-y40"
                  type="submit"
                  on:click={handleFormSubmit}
                  >Skicka</button
                  >
          </form>
      </article>
      <Loader isLoading={isLoading} />
  
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
  