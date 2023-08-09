<script lang="ts">
import { authStore } from '../../stores/authStore';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '$lib/firebase/firebase.client';
import { notifications } from '$lib/utilis/notifications';
	import { updated } from '$app/stores';

// props
export let type: string
export let value: string | undefined
export let rows: number
export let firebaseDocument: string
export let firebaseField: string
export let firebaseObjectKey: string
export let getData: Function

let newValue = value

let currentUser: null | Object;
	authStore.subscribe((curr) => {
		currentUser = curr?.currentUser
	});


let isVisable = false
function handleIsVisable() {
    isVisable = !isVisable

}

let updateStatus: null | String = null; // Possible values: null, 'success', 'error'
let updateMessage = '';

async function handleUpdate() {

    try {
        await handleFormSubmit();
        updateStatus = 'success';
        updateMessage = 'Update successful!';
        notifications.success(updateMessage)
        getData()
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
    const updateData: object = {}

    // uppdaterar datan, exempel: open_gym.titel
    updateData[`${firebaseField}.${firebaseObjectKey}`] = newValue // firebaseObjectKey === texts.${index}

    console.log('updateData: ', updateData)

    const updateRef = doc(db, 'CMS', firebaseDocument);
    await updateDoc(updateRef, updateData);
}

</script>

{#if currentUser}

<button 
    class={`btn btn-sm m-4 m-auto ${isVisable ? 'btn-warning' : 'btn-info'}`}    
    on:click={handleIsVisable}
>{isVisable ? 'Stäng' : 'Ändra'}</button>

    {#if isVisable}

        {#if type === 'text'}

            <textarea 
                cols="30" 
                rows={rows}
                class="w-9/12"
                bind:value={newValue}
            ></textarea>
        {/if}

        <button 
            on:click={handleUpdate}
            class="btn btn-sm btn-success m-4"    
        >Uppdatera</button>
    {/if}

{/if}

