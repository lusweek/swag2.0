<script lang="ts">
import { authStore } from '../../stores/authStore';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '$lib/firebase/firebase.client';
import { notifications } from '$lib/utilis/notifications';
import FaArrowUp from 'svelte-icons/fa/FaArrowUp.svelte'

// props
export let type: string
export let value: string | undefined
export let prevArray: Array<string> | null
export let prevObjectField: object | null
export let index: number | null
export let rows: number | undefined = 1
export let collection: string = 'CMS'
export let FBDocument: string 
export let FBField: string
export let FBObjectKey: string | null
export let getData: Function

let currentUser: null | Object;
	authStore.subscribe((curr) => {
		currentUser = curr?.currentUser
	});

let newValue = value
let updateStatus: null | String = null; // Possible values: null, 'success', 'error'
let updateMessage = '';
let isVisable = false

function handleIsVisable() {
    isVisable = !isVisable
}

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
        case 'evenemangText':   
        updateData[FBField] = newValue
            break;
        default:
            return;     
    }

    const updateRef = doc(db, collection, FBDocument);
    console.log('updateData', updateData)
    await updateDoc(updateRef, updateData);
}

function check() {
    if (index === null || prevArray === null) {
    console.log('index eller prevArray kan får ej vara null.')
    console.log('index:', index)
    console.log('prevArray: ', prevArray)
    return
}
}

function updateArray() {     // Tar den gamla arrayen. Uppdaterar den. Skapar en kopia av det gamla objektet arrayen ligger i. Ersätter den gamla arrayen med den nya i nya objekt kopian.
    check()
if ( index >= 0 && index <= prevArray.length) {  // if sats: kontrollerar att index inte är ett negativt nummer eller ett större nummer än prevArray.length. Behövs ej men skapar säkerhet.
    const newArray = [...prevArray]            
    newArray[index] = newValue          // uppdaterar array. index bestämmer vilken sträng som ska uppdateras. newValue är det som ersätter index strängen
    return {[FBField] : {...prevObjectField, [FBObjectKey]: newArray} }   // updateData blir nytt objekt (open_gym exempelvis) med uppdaterad array.
 }
}

async function handleRemove() { 
    if (!confirm('Ta bort rad?')) return
    try {
        await removeString();
        updateStatus = 'success';
        updateMessage = 'Tog bort rad';
        notifications.success(updateMessage)
        getData()
    } catch (error) {
        updateStatus = 'error';
        updateMessage = 'Prova igen...';
        notifications.error(updateMessage)
        console.error("Error updating document:", error);
    } finally {
        if (updateStatus) {
            isVisable = false
        }
    }
}

async function removeString() {
    check()

    if (index >= 0 && index < prevArray.length) {
        console.log('if sats körs')
        const newArray = [...prevArray];
        newArray.splice(index, 1); // Remove the element at the specified index.
        console.log('newArray after remove: ', newArray)
        let updateData = { [FBField]: { ...prevObjectField, [FBObjectKey]: newArray } };

        const updateRef = doc(db, collection, FBDocument);
        console.log('updateData after remove:', updateData)
        await updateDoc(updateRef, updateData);

    }
}

</script>

{#if currentUser}

    <button 
        class={`btn btn-sm m-4 ${isVisable ? 'hidden' : 'btn-info'} flex flex-nowrap ${type === 'text' ? 'm-auto' : null}`}    
        on:click={handleIsVisable}
    >Ändra <div class="h-3.5 ml-1"><FaArrowUp /></div> </button>

    <div class="m-auto w-11/12 flex flex-wrap">

        {#if isVisable}
            <textarea 
                cols="30" 
                rows={rows}
                class="w-full p-1"
                bind:value={newValue}
            ></textarea>

        <div class="flex justify-center">
            
            <button 
            on:click={handleUpdate}
            class="btn btn-sm btn-success m-4"    
            >Uppdatera</button>
            <button 
            class={`btn btn-sm m-4 ${isVisable ? 'btn-warning' : 'hidden'}`}    
            on:click={handleIsVisable}
            >Stäng</button>
            {#if type === 'array'}
                <button 
                class={`btn btn-sm m-4 mx-8 ${isVisable ? 'btn-error' : 'hidden'}`}    
                on:click={handleRemove}
                >Ta bort rad</button>
            {/if}
        </div>
        {/if}
    </div>
        
{/if}