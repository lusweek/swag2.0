<script lang="ts">
    import { doc, updateDoc } from 'firebase/firestore';
    import { db } from '$lib/firebase/firebase.client';
    import { notifications } from '$lib/utilis/notifications';
    import { authStore } from '../../stores/authStore';

    export let FBData: any;
    export let FBDocument: string;
    export let tableIndexToUpdate: number | null;
    export let rowIndexToRemove: number | null;
    export let getData: (() => void);

    let currentUser: object | null = null;
    authStore.subscribe((curr) => {
      currentUser = curr?.currentUser;
    });

    function handleRemove() {
        if (confirm('Vill du ta bort denna rad?')) {
            removeColumn()
        }
    }

    async function removeColumn() {
        try {
            // Construct the updated data with the specified column removed
            const updatedData = {
                ...FBData,
                open_gym: {
                    ...FBData.open_gym,
                    tables: FBData.open_gym.tables.map((table, tableIndex) => {
                        if (tableIndex === tableIndexToUpdate) {
                            return {
                                ...table,
                                rows: table.rows.filter((_, rowIndex) => {
                                    return rowIndex !== rowIndexToRemove;
                                }),
                            };
                        } else {
                            return table; // Keep other tables unchanged
                        }
                    }),
                },
            };


            // Use the updated data to update Firebase
            const updateRef = doc(db, 'CMS', FBDocument);
            console.log('updatedRemoveData', updatedData);
            await updateDoc(updateRef, updatedData);

            notifications.success('Column removed successfully!');
            getData()
        } catch (error) {
            notifications.error('Error removing column. Please try again.');
            console.error('Error removing column:', error);
        }
    }
</script>
{#if (currentUser)}
<div>
    <button
        on:click={handleRemove}
        class="btn btn-sm btn-error m-2"
    >
        Ta bort rad
    </button>
</div>
{/if}