

<h1>Skapa evenemang</h1>

<script lang="ts">
    import { createForm } from 'svelte-forms-lib';
    import * as yup from 'yup';
    import { addDoc, collection } from 'firebase/firestore';
    import { db } from '$lib/firebase/firebase.client';
    import Loader from '$lib/Loader.svelte';
    import { notifications } from '$lib/utilis/notifications';
    import { fileUploader } from '$lib/FileUploader';
  
      let isLoading = false
  
      const { form, errors, state, handleChange, handleSubmit } = createForm({
          initialValues: {
              title: '',
              date: '',
              shortText: '',
              text: '',
      },
          validationSchema: yup.object().shape({
              title: yup.string().required('Måste anges'),
              date: yup.string().required('Måste anges'),
              shortText: yup.string().required('Måste anges'),
              text: yup.string().required('Måste anges'),
          }),
          onSubmit: (values) => {
              // handleSubmit gör att action inte körs i form.
        // submit fungerar inte alls
              alert(JSON.stringify(values));
          }
      });
  
    let values = {
        title: '',
        date: '',
        shortText: '',
        text: '',
    }
  
    function handleFormSubmit() {
      createEvenemang()
      if (selectedFile) handleUpload()
    }
  
      // Adds document to firestore
      const evenemangRef = collection(db, 'evenemang');
  
      async function createEvenemang() {
          isLoading = true
          await addDoc(evenemangRef, values).then(data => {
              notifications.success('Evenemanget har skapats');
          }).catch(err => {
              notifications.error('Något gick fel... Prova igen');
          }).finally(() => isLoading = false)
      values = {
              title: '',
              date: '',
              shortText: '',
              text: '',
      }
      };
      

	let selectedFile;
	let uploadURL;

	const handleFileChange = (event) => {
		selectedFile = event.target.files[0];
		previewImage();
	};

	const previewImage = () => {
		const reader = new FileReader();
		reader.onload = (e) => {
			uploadURL = e.target.result;
		};
		reader.readAsDataURL(selectedFile);
	};

	const handleUpload = () => {
		isLoading = true;
		if (!selectedFile) return;

        console.log('handleUpload Körs')
        console.log($form.title)

		fileUploader.uploadFile(selectedFile, $form.title, 'evenemang_bild');
	};

  </script>
  
  <section class="flex flex-col items-center">
      <article
          data-theme="dark"
          class="container flex flex-col items-center text-center m-6 rounded py-8"
      >
          <form
            id="application-form"
            class="flex flex-col items-center gap-4"
            action="?/createArticle"
          >
              <div>
                  <label for="title">Titel*</label>
                  <input
                      id="title"
                      name="title"
                      type="text"
                      placeholder="Titel"
                      on:change={handleChange}
                      on:blur={handleChange}
                      bind:value={values.title}
                  />
                  {#if $errors.title}
                      <small>{$errors.title}</small>
                  {/if}
              </div>
  
        <div>
                  <label for="date">Datum</label>
                  <input
                      id="date"
                      name="date"
                      type="text"
                      placeholder="01 Januari, 2020"
                      on:change={handleChange}
                      on:blur={handleChange}
                      bind:value={values.date}
                  />
                  {#if $errors.date}
                      <small>{$errors.date}</small>
                  {/if}
              </div>

              <div>
                <label for="shortText">Beskrivning kort</label>
                <textarea
                    name="shortText"
                    id="shortText"
                    rows="2"
                    placeholder="Skriv om evenemanget"
                    on:change={handleChange}
                    on:blur={handleChange}
                    bind:value={values.shortText}
                />
                {#if $errors.shortText}
                    <small>{$errors.shortText}</small>
                {/if}
            </div>
  
              <div>
                  <label for="text">Längre beskrivning</label>
                  <textarea
                      name="text"
                      id="text"
                      rows="5"
                      placeholder="Skriv om evenemanget"
                      on:change={handleChange}
                      on:blur={handleChange}
                      bind:value={values.text}
                  />
                  {#if $errors.text}
                      <small>{$errors.text}</small>
                  {/if}
              </div>
  
              
              <div class="w-screen flex justify-center flex-col items-center">
                  <div class="m-4">
                  <label for="text">Ladda upp bild</label>
                      <input type="file" on:change={handleFileChange} />
                    </div>
                    
                    {#if uploadURL}
                    <img class="w-1/2" src={uploadURL} alt="Uploaded Image" />
                    {/if}
                </div>
                <button
                    disabled={
                        $form.title == '' ||
                        $form.date == ''
                    }
                    class="btn my-8 martin-y40"
                    type="submit"
                    on:click={handleFormSubmit}
                    >Skapa evenemang</button
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
  