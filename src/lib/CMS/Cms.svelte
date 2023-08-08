<script>
import { authStore } from '../../stores/authStore';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '$lib/firebase/firebase.client';
import { notifications } from '$lib/utilis/notifications';
	import { updated } from '$app/stores';

// props
export let type
export let value
export let rows
export let firebaseFolder
export let firebaseDocument
export let firebaseData

let newValue = value

let currentUser;
	authStore.subscribe((curr) => {
		currentUser = curr?.currentUser
	});


let isVisable = false
function handleIsVisable() {
    isVisable = !isVisable
}

let updateStatus = null; // Possible values: null, 'success', 'error'
let updateMessage = '';

async function handleUpdate() {

    try {
        await handleFormSubmit();
        updateStatus = 'success';
        updateMessage = 'Update successful!';
        notifications.success(updateMessage)
    } catch (error) {
        updateStatus = 'error';
        updateMessage = 'Update failed. Please try again.';
        notifications.error(updateMessage)
        console.error("Error updating document:", error);
    } finally {
        if (updateStatus) {
            isVisable = false
        }
    }
}

async function handleFormSubmit() {
    const updateData = {}
    updateData[firebaseData] = newValue

    console.log('updateData: ', updateData)

    const updateRef = doc(db, firebaseFolder, firebaseDocument);
    await updateDoc(updateRef, updateData);
}

</script>

{#if currentUser}

<button on:click={handleIsVisable}>{isVisable ? 'Avbryt' : 'Ändra'}</button>

    {#if isVisable}

        {#if type === 'text'}
            <textarea 
                cols="30" 
                rows={rows}
                class="w-9/12"
                bind:value={newValue}
            ></textarea>
        {/if}

        <button on:click={handleUpdate}>Uppdatera</button>
    {/if}

{/if}

