<script lang="ts">
  import '../../app.css'
	import Table from '$lib/tables/Table.svelte';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import kursInfo from '../kurser/kursInfo';
	import { getDocs, addDoc, collection } from 'firebase/firestore';
	import { db } from '$lib/firebase/firebase.client';
	import Loader from '$lib/Loader.svelte';
	import { notifications } from '$lib/utilis/notifications';
	import { sendEmail } from '$lib/sendEmail';
	import CupcakeArticle from '$lib/CupcakeArticle.svelte';

	let selectedMember: any;

		// Gets data from firestore
		const membersRef = collection(db, 'members');
  
  let members: Array<object> = [];
  const getMembers = async () => {
	const data = await getDocs(membersRef);
	members = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  };
  
  getMembers();

	let isLoading = false
    let radioChecked = false;
	let courseId = 0

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
			student: false,
			message: '',
    },
		validationSchema: yup.object().shape({
			course: yup
				.string()
				.oneOf([
					'Medlemsskap',
					'Open gym - Termin',
					'Calisthenics grundkurs',
					'Calisthenics - Muscle-up & Handstand',
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
			student: false,
			message: '',
  }

  function setcourseId(value) {
	switch (value) {
	case 'Medlemsskap':
		courseId = 0
		break;
	case 'Open gym - Termin':
		courseId = 1
	break;
	case 'Calisthenics grundkurs':
		courseId = 2
	break;
	case 'Calisthenics - Muscle-up & Handstand':
		courseId = 3
	default:
		break;
  }
  }


  
// Ser om födelsedatumet finns i någon av medlemmarna

  const handlebirth = (e) => {
	if (e.target.value.length >= 11) {
		findMember(e.target.value)
	}
	handleChange()
  }

  let isMember = false
  let showBtn = false

  const findMember = (value) => {
	if (value) {
		selectedMember = members.find(member => member.birth === value) 
	} 
	else selectedMember = members.find(member => member.birth === $form.birth) 
	if (selectedMember) {
		isMember = true
		showBtn = true
	}
}

function fillForm() {
	notifications.success('Information har fyllts i')
		values = {
			fName: selectedMember.fName,
			lName: selectedMember.lName,
			birth: selectedMember.birth,
			email: selectedMember.email,
			adress: selectedMember.adress,
			postNr: selectedMember.postNr,
			phoneNr: selectedMember.phoneNr,
			student: selectedMember.student,
			message: selectedMember.message,
    }
	showBtn = false
}

  // Sätter id för vilken kurs som ska visas längs ner
  const handleCourseChange = (e) => {
	  setcourseId(e.target.value)
	findMember()
	handleChange(e)
  }


  async function handleFormSubmit() {
	let isStudent = ''
	if (values.student === true) {
		isStudent = 'Ja'
	} else if (values.student === false) {
		isStudent = 'Nej'
	}
	isLoading = true
	try {
		if (isMember) {
			await sendEmail(
				`Kursansökan`,
				`Anmälan till kurs från ${values.fName} ${values.lName}`,
				`Kurs: ${kursInfo[courseId].kurs + ' ' + kursInfo[courseId].plats}`,
				`Pris för kurs: ${kursInfo[courseId].prisTermin}`,
				'Redan medlem: Ja',
				`Pris totalt: ${kursInfo[courseId].prisTermin} kr`,
				values.email, 
				values.message,
				isStudent
				
			)
			clearForm()
			notifications.success('När vi ser din swish är du anmäld!')
		} 
		else {
				await sendEmail(
					`Medlemsansökan & kursansökan`,
					`Medlemsansökan samt anmälan till kurs från ${values.fName} ${values.lName}, ${values.email}`,
					`Kurs: ${kursInfo[courseId].kurs + ' ' + kursInfo[courseId].plats}`,
				    `Pris för kurs: ${kursInfo[courseId].prisTermin}`,
					`Medlemsavgift: 100 kr`,
					`Pris totalt: ${kursInfo[courseId].prisTermin + 100} kr`,
					values.email, 
					values.message,
					isStudent
					)
				createMember()
		} 
		
	} catch (error) {
		notifications.error('Något gick fel')
	} finally {
			isLoading = false
		}
  }

	// Adds document to firestore

	async function createMember() {
		isLoading = true
		await addDoc(membersRef, values).then(data => {
			notifications.success('Din ansökan har skickats!');
		}).catch(err => {
			notifications.error('Något gick fel... Prova igen');
		}).finally(() => isLoading = false)
		clearForm()
	};

	function clearForm() {
		$form.course = ''
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
	showBtn = false
	}

	// Lägger till byta rad

	function insertLineBreaks(text, wordsPerLine = 3) {
		return text
			.split(' ')
			.map((word, i) => (i > 0 && i % wordsPerLine === 0 ? '<br>' + word : word))
			.join(' ');
	}

</script>

<h1>Medlemsskap och anmälan</h1>

<CupcakeArticle>
<h2 class="m-4">Bli medlem, anmäl dig till kurs eller köp open gym terminspaket.</h2>
<p class="text-left p-4 w-full lg:w-10/12">Medlemsskapet kostar 100 kr och betalas i samband med anmälan till kurs eller open gym terminspaket. 
	Du kan även köpa bara medlemsskapet om du vill ha bättre pris på att gå på open gym (60 kr med medlemsskap, annars 80 kr). Medlemsskapet gäller fram tills nyår oavsätt när på året det köps.</p>
<p class="text-left p-4 w-full lg:w-10/12">'Open gym - termin' innebär att du får gå på alla open gym passen under en termin. </p>

<a href="/anmälan/redanMedlem" class="link p-4 my-4">Redan medlem och vill skriva upp dig? Klicka här</a>

</CupcakeArticle>

<CupcakeArticle>

	<section id="top" class="flex flex-col items-center">
		<article class="container flex flex-col items-center text-center m-6 rounded py-8">
			<h1>Anmälan till kurs eller medlemsskap </h1>
		<!-- 
		Ingen av dessa fungerar. Känns som att jag får gå tillbaks till videon för att lösa detta...
		-->
		<!-- method="post" -->
		<!-- on:submit={handleSubmit} -->
			<form
				id="application-form"
				class="flex flex-col items-center gap-4"
				action="?/createArticle"
			>
		<!-- OM DU SKA LÄGGA TILL EN TILL OPTION måste du lägga in det validationSchema -> oneOf -->
				<div>
					<label for="course">Välj kurs eller open gym</label>
					<select 
						class="custom-fields custom-focus"
						id="course" 
						name="course" 
						on:change={(e) => handleCourseChange(e)} 
						bind:value={$form.course}
						>
							<option>Medlemsskap</option>
							<option>Open gym - Termin</option>
							<option>Calisthenics grundkurs</option>
							<option>Calisthenics - Muscle-up & Handstand</option>
					</select>
					{#if $errors.course}
						<small>{$errors.course}</small>
					{/if}
				</div>

				<div>
					<label for="birth">Födelsedagsdatum 12 siffror: ÅÅÅÅMMDDXXXX*</label>
					<input
						class="custom-fields custom-focus"
						type="tel"
						name="birth"
						id="birth"
						placeholder="ÅÅÅÅMMDDXXXX"
						on:change={(e) => handlebirth(e)}
						on:blur={handleChange}
						bind:value={values.birth}
					/>
					{#if $errors.birth}
						<small>{$errors.birth}</small>
					{/if}
				</div>

				{#if showBtn}

				<label>Du är redan medlem, autofyll formulär?</label>
					<button
					class="btn"
					type="submit"
					on:click={fillForm}
					>Ja</button
					>
				{/if}

				<div>
					<label for="fName">Namn*</label>
					<input
						class="custom-fields custom-focus"
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
						class="custom-fields custom-focus"
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
					<label for="email">Email*</label>
					<input
						class="custom-fields custom-focus"
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
						class="custom-fields custom-focus"
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
						class="custom-fields custom-focus"
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
						class="custom-fields custom-focus"
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
						class="custom-fields custom-focus"
						type="text"
						name="message"
						id="message"
						placeholder="Valfritt meddelande"
						on:change={handleChange}
						on:blur={handleChange}
						bind:value={values.message}
					/>
				</div>

				<div class="flex items-center m-8 ">
					<label for="student" class="mx-4 margin-y0">Student eller under 26 år</label>
					<input
						type="checkbox"
						id="student"
						name="student"
						class="radio-sm checkbox checkbox"
						bind:checked={values.student}
					/>
				</div>


				<!-- Table, 3 stycken tyvärr... -->

				{#if $form.course}
					{#if kursInfo[courseId].kurs === 'Medlemsskap' && isMember} <!-- Redan medlem & köper medlemsskap -->
						<Table
							headers={['Din ansökan', '']}
							rows = {[
								['Du är redan medlem. Ditt medlemsskap går ut i årsskiftet', '']
							]}
						/>
					{:else if kursInfo[courseId].kurs === 'Medlemsskap'} <!-- Enbart medlemsavgift -->
					<Table
						headers={['Din ansökan', '']}
						rows = {[
							[kursInfo[courseId].kurs, ''],
							['Pris', kursInfo[courseId].prisTermin + 'kr'],
							[insertLineBreaks(kursInfo[4].SwichaJakobText), '1235485859']
						]}
					/>
					{:else if isMember} <!-- Utan medlemsavgift  -->
						<Table
							headers={['Din ansökan', '']}
							rows = {[
								[kursInfo[courseId].kurs + '. ' + `${kursInfo[courseId].plats !== null ?  kursInfo[courseId].plats : ''}`, ''],
								[`${values.student ? 'Student / ungdomspris' : "Pris"}`, `${values.student ? kursInfo[courseId].prisStudent : kursInfo[courseId].prisTermin } kr`],
								[insertLineBreaks(kursInfo[4].SwichaJakobText), '1235485859']
							]}
						/>
					{:else} <!-- Med medlemsavgift  -->
						<Table
							headers={['Din ansökan', '']}
							rows = {[
								[kursInfo[courseId].kurs, ''],
								[insertLineBreaks(kursInfo[courseId].plats) !== null ? insertLineBreaks(kursInfo[courseId].plats) : '', ''],
								['Medlemsskap', '100kr'],
								[`${values.student ? 'Student / ungdomspris' : "Pris"}`, `${values.student ? kursInfo[courseId].prisStudent : kursInfo[courseId].prisTermin } kr`],
								['Totalt', `${values.student ? kursInfo[courseId].prisStudent + 100 : kursInfo[courseId].prisTermin + 100} kr`],
								[insertLineBreaks(kursInfo[4].SwichaJakobText), '1235485859']
							]}
							/>
					{/if}
					
					<!-- Kontroll om alla fält fyllts i -->

					{#if kursInfo[courseId].kurs === 'Medlemsskap' && isMember}
					{:else}
					<div class="flex items-center m-8 ">
						<label for="radio-2" class="mx-4 margin-y0">Jag har swichat </label>
						<input
							type="checkbox"
							name="radio-1"
							class="radio-sm checkbox checkbox-success"
							bind:checked={radioChecked}
						/>
					</div>
					{/if}
					{#if values.birth === '' || 
						values.fName === '' ||
						values.lName === '' ||
						values.email === '' ||
						values.adress === '' ||
						$errors.email ||
						values.postNr === ''}
						<h2 class="error-Color">Alla fält med * måste fyllas i</h2>
					{:else if radioChecked}
						<h2>Du kommer få svar på mail inom 24 h från oss.</h2>
					
					{/if}
				{/if}
				<button
					disabled={
						!radioChecked ||
						values.birth === '' || 
						values.fName === '' ||
						values.lName === '' ||
						values.email === '' ||
						values.adress === '' ||
						$errors.email ||
						values.postNr === ''
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

</CupcakeArticle>


<style>

	/*  */
	:root {
		--primary-light: #a6f9d6;
		--primary: #5be2a9;
		--primary-dark: #3c3c3c;
		--secondary: #212121;
		--white: #fff;
		--grey: #e6e6ff;
		--grey-dark: #6d7098;
		--red: #c60000;
	}

	.error-Color{
		color: var(--red);
	}

	select {
		height: 45px;
	}

	.custom-fields{
		font-family: inherit;
		font-size: inherit;
		max-width: 400px;
		width: 100%;
		padding: 12px;
		box-sizing: border-box;
		border: 1px solid var(--grey-dark);
		border-radius: 4px;
		transition: all 150ms ease;
		background: var(--white);
	}

	.custom-focus:focus{
		outline: none;
		box-shadow: 0 0 0 4px rgb(143, 143, 143);
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
		color: var(--primary-dark); 
		font-weight: bold;
		margin-top: 20px;
		margin-bottom: 4px;
		text-transform: uppercase;
		font-size: 12px;
		letter-spacing: 1.9px;
		line-height: 2;
	}

	.custom-checkbox{
		background-color: #212121;
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
</style>
