<script lang="ts">
import { authStore } from '../../stores/authStore';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '$lib/firebase/firebase.client';
import { notifications } from '$lib/utilis/notifications';

// props
export let type: string
export let value: string | undefined
export let prevArray: Array<string> 
export let prevObjectField: object 
export let index: number
export let rows: number | undefined = 1
export let FBDocument: string
export let FBField: string
export let FBObjectKey: string
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
    let updateData: object | Array<string> = {}

    switch (type) {
        case 'text':
            updateData[`${FBField}.${FBObjectKey}`] = newValue // uppdaterar spesifik sträng. ex title. 
            break;
    case 'array':   
            updateData = updateArray()
            break;
        default:
            return;     
    }

    const updateRef = doc(db, 'CMS', FBDocument);
    await updateDoc(updateRef, updateData);
}

function updateArray() {                // Tar den gamla arrayen. Uppdaterar den. Skapar en kopia av det gamla objektet arrayen ligger i. Ersätter den gamla arrayen med den nya i nya objekt kopian.
 if (index >= 0 && index <= prevArray.length) {  // if sats: kontrollerar att index inte är ett negativt nummer eller ett större nummer än prevArray.length. Behövs ej men skapar säkerhet.
    const newArray = [...prevArray]            
    newArray[index] = newValue          // uppdaterar array. index bestämmer vilken sträng som ska uppdateras. newValue är det som ersätter index strängen
    return {[FBField] : {...prevObjectField, [FBObjectKey]: newArray} }   // updateData blir nytt objekt med uppdaterad array
 }
}

</script>

{#if currentUser}

<button 
    class={`btn btn-sm m-4 m-auto ${isVisable ? 'btn-warning' : 'btn-info'}`}    
    on:click={handleIsVisable}
>{isVisable ? 'Stäng' : 'Ändra'}</button>

    {#if isVisable}

        {#if type === 'text' || type === 'array'}

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

