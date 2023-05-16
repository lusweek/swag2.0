<script>
	import '../../../app.css';
	import Loader from '$lib/Loader.svelte';

	export let data;
	let event = {};
	if (data) event = data.event;

	// ================================== //

	import { createFileUploader } from '$lib/FileUploader';
    import { fileUploader } from '$lib/FileUploader';
    import { onMount } from 'svelte';

	let selectedFile;
	let imageURL;
	let isLoading = false;

	const handleFileChange = (event) => {
		selectedFile = event.target.files[0];
		previewImage();
	};

	const previewImage = () => {
		const reader = new FileReader();
		reader.onload = (e) => {
			imageURL = e.target.result;
		};
		reader.readAsDataURL(selectedFile);
	};

	const handleUpload = () => {
		isLoading = true;
		if (!selectedFile) return;

		fileUploader.uploadFile(selectedFile, event.title);

        console.log('handleUpload körs')
	};


	onMount(() => {
    fileUploader.subscribe((response) => {
        isLoading = false
      if (response) {
        if (response.success) {
          imageURL = response.downloadURL;
          // Handle successful upload and use the downloadURL as needed
        } else {
          const error = response.error;
          // Handle error during upload
        }
      }
    });
  });

</script>

<section class="flex items-center w-screen flex-col">
	<article
		data-theme="cupcake"
		class="container flex flex-col items-center text-center m-6 rounded border-orange-400 border-solid border-8 pb-8"
	>
		<h1>{event.title}</h1>
		<h2>{event.date}</h2>
		<p>{event.text}</p>
	</article>

	<!-- Med chat gbt -->
	<div class="w-screen flex justify-center flex-col items-center">
		<div class="m-4">
			<input type="file" on:change={handleFileChange} />
			<button class="btn btn-primary" disabled={!imageURL} on:click={handleUpload}
				>Upload Image</button
			>
		</div>

		{#if imageURL}
			<img class="w-1/2" src={imageURL} alt="Uploaded Image" />
		{/if}
	</div>
</section>

<Loader {isLoading} />
