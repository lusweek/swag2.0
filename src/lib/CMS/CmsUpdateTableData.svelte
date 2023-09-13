<script lang="ts">
    import { authStore } from '../../stores/authStore';
    import { doc, updateDoc } from 'firebase/firestore';
    import { db } from '$lib/firebase/firebase.client';
    import { notifications } from '$lib/utilis/notifications';
  
    export let FBData: any;
    export let FBDocument: string;
    export let tableIndexToUpdate: number | null;
    export let columnIndexToUpdate: number | null;
    export let rowIndexToUpdate: number | null;
    export let initialValue: string;
    export let getData: (() => void);
  
    let currentUser: object | null = null;
    authStore.subscribe((curr) => {
      currentUser = curr?.currentUser;
    });
  
    let isEditable = false;
    let updatedValue = initialValue;
    let updateStatus: string | null = null;
    let updateMessage = '';
  
    function handleToggleEdit() {
      console.log('IndexToUpdate', columnIndexToUpdate, rowIndexToUpdate)
      isEditable = !isEditable;
      if (!isEditable) {
        // Reset the updated value when exiting edit mode
        updatedValue = initialValue;
      }
    }
  
    async function handleUpdate() {
      try {
        await updateColumnValue(updatedValue);
        updateStatus = 'success';
        updateMessage = 'Update successful!';
        notifications.success(updateMessage);
        getData();
      } catch (error) {
        updateStatus = 'error';
        updateMessage = 'Update failed. Please try again.';
        notifications.error(updateMessage);
        console.error('Error updating column value:', error);
      } finally {
        isEditable = false;
      }
    }
  
    async function updateColumnValue(updatedValue: string) {
      // Construct the updated data with the new column value
      const updatedData = {
        ...FBData,
        open_gym: {
          ...FBData.open_gym,
          tables: FBData.open_gym.tables.map((table, tableIndex) => {
            if (tableIndex === tableIndexToUpdate) {
              return {
                ...table,
                rows: table.rows.map((row, rowIndex) => {
                  return {
                    ...row,
                    columns: row.columns.map((column, columnIndex) => {
                      if (columnIndex === columnIndexToUpdate && rowIndexToUpdate === rowIndex) {
                        return { type: 'text', text: updatedValue };
                      } else {
                        return column; // Keep other columns unchanged
                      }
                    }),
                  };
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
      console.log('updatedData', updatedData)
      await updateDoc(updateRef, updatedData);
    }
  </script>
  
  {#if currentUser}
    <div class="">
      {#if isEditable}
        <input
          type="text"
          bind:value={updatedValue}
          class="w-9/12 m-1"
        />
        <div>
            <button
              on:click={handleUpdate}
              class="btn btn-sm btn-success m-2"
            >
              Uppdatera
            </button>
            <button
              on:click={handleToggleEdit}
              class="btn btn-sm btn-error m-2"
            >
              Avbryt
            </button>

        </div>
        
      {:else}
        <button
          class="btn btn-sm m-1 m-auto btn-warning"
          on:click={handleToggleEdit}
        >
          Ändra
        </button>
      {/if}
    </div>
  {/if}
  