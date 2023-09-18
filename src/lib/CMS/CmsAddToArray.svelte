<script lang="ts">
    import { authStore } from '../../stores/authStore';
    import { doc, updateDoc } from 'firebase/firestore';
    import { db } from '$lib/firebase/firebase.client';
    import { notifications } from '$lib/utilis/notifications';

    export let FBData: any
    export let prevObjectField: any
    export let prevArray: Array<string> | null;
    export let FBDocument: string;
    export let FBField: string;
    export let FBObjectKey: string
    export let getData: () => void;

    console.log('FBData', FBData)

    let currentUser: object | null = null;
    authStore.subscribe((curr) => {
        currentUser = curr?.currentUser;
    });

    let isVisable = false;
    function handleIsVisable() {
        isVisable = !isVisable;
    }

    let newValue = '';

    let updateStatus: string | null = null; // Possible values: null, 'success', 'error'
    let updateMessage = '';

    async function handleUpdate() {
        try {
            if (newValue.trim() !== '') {
                await handleFormSubmit();
                updateStatus = 'success';
                updateMessage = 'Update successful!';
                notifications.success(updateMessage);
                // getData();
            } else {
                updateStatus = 'error';
                updateMessage = 'New value cannot be empty.';
                notifications.error(updateMessage);
            }
        } catch (error) {
            updateStatus = 'error';
            updateMessage = 'Update failed. Please try again.';
            notifications.error(updateMessage);
            console.error('Error updating document:', error);
        } finally {
            if (updateStatus) {
                isVisable = false;
            }
        }
    }

    async function handleFormSubmit() {
        const updatedArray = {
            ...prevObjectField, 
            FBObjectKey: {
                ...prevArray, newValue
            }
        };

        // Update the Firebase data with the new array
        const updateRef = doc(db, 'CMS', FBDocument);
        console.log('updatedArray', updatedArray)
        // await updateDoc(updateRef, { [FBField]: updatedArray });
    }
</script>

{#if currentUser}
    <div class="flex flex-col items-center">
        <button
            class={`btn btn-sm m-1 m-auto ${isVisable ? 'hidden' : 'btn-info'}`}
            on:click={handleIsVisable}>
            Add New Value
        </button>

        {#if isVisable}
            <h2>Add New Value</h2>
            <input
                type="text"
                placeholder="New Value"
                bind:value={newValue}
                class="w-9/12 m-1"
            />
            <div>
                <button
                    on:click={handleUpdate}
                    class="btn btn-sm btn-success m-2">
                    Add
                </button>
                <button
                    class="btn btn-sm m-1 m-auto btn-warning"
                    on:click={handleIsVisable}>
                    Cancel
                </button>
            </div>
        {/if}
    </div>
{/if}
