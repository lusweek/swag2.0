<script>
	import Loader from '$lib/Loader.svelte';

	export let data;
	let event = {};
	if (data) event = data.event;

	// ================================== //
	import { onMount } from 'svelte';

	import { fileUploader } from '$lib/FileUploader';
	import { writable } from 'svelte/store';
	import firebase from 'firebase/compat/app';

	let selectedFile;
	let uploadURL;
	let isLoading = false;

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

		fileUploader.uploadFile(selectedFile, event.title, 'evenemang_bild');
	};

	let imageFromStorage = writable(null);

	const loadLatestImage = async () => {
		const storageRef = firebase.storage().ref();
		const folderRef = storageRef.child(event.title);
		const files = await folderRef.listAll();

		console.log(files);

		if (files.items.length > 0) {
			const latestFile = files.items[files.items.length - 1];
			const downloadURL = await latestFile.getDownloadURL();
			// uploadURL = downloadURL;
			imageFromStorage.set(downloadURL);
		} else {
			uploadURL = null;
			imageFromStorage.set(null);
		}
	};

	onMount(() => {
		loadLatestImage();

		fileUploader.subscribe(({ success, downloadURL, error }) => {
			isLoading = false;
			if (success) {
				uploadURL = null;
				imageFromStorage.set(downloadURL);
				// Handle successful upload and use the downloadURL as needed
			} else {
				// Handle error
			}
		});
	});

	let imgFromStorage;
	imageFromStorage.subscribe((value) => {
		imgFromStorage = value;
	});

	console.log('uploadURL', uploadURL);
</script>

<section class="flex items-center w-screen flex-col">
	<article
		data-theme="cupcake"
		class="container flex flex-col items-center text-center m-6 rounded border-orange-400 border-solid border-8 pb-8"
	>
		<h1>{event.title}</h1>
		<h2>{event.date}</h2>
		{#if imgFromStorage}
			<img class="w-1/3" src={imgFromStorage} alt="Bild på event" />
		{/if}
		<p>{event.text}</p>
	</article>

	<!-- Uppdatera bild -->
	<!-- <div class="w-screen flex justify-center flex-col items-center">
		<div class="m-4">
			<input type="file" on:change={handleFileChange} />
			<button class="btn btn-primary" disabled={!uploadURL} on:click={handleUpload}
				>Upload Image</button
			>
		</div>

		{#if uploadURL}
			<img class="w-1/2" src={uploadURL} alt="Uploaded Image" />
		{/if}
	</div> -->
</section>

<Loader {isLoading} />
