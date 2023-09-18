<script lang="ts">
    import { authStore } from '../../stores/authStore';
    import { doc, updateDoc } from 'firebase/firestore';
    import { db } from '$lib/firebase/firebase.client';
    import { notifications } from '$lib/utilis/notifications';
    import FaArrowUp from 'svelte-icons/fa/FaArrowUp.svelte'
  
    export let FBData: any;
    export let FBDocument: string;
    export let tableIndexToUpdate: number | null;
    export let columnIndexToUpdate: number | null;
    export let rowIndexToUpdate: number | null;
    export let initialValue: string;
    export let getData: (() => void);
    export let initialHrefValue: string
    export let type: string;
  
    let currentUser: object | null = null;
    authStore.subscribe((curr) => {
      currentUser = curr?.currentUser;
    });
  
    let isEditable = false;
    let updatedValue = initialValue;
    let updatedHrefValue = initialHrefValue
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
        await updateTextValue(updatedValue);
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
  
    async function updateTextValue(updatedValue: string) {
      // Construct the updated data with the new column value
      const updatedData = {
        ...FBData,
        open_gym: {
          ...FBData.open_gym,
          tables: FBData.open_gym.tables.map((table: any, tableIndex: number) => {
            if (tableIndex === tableIndexToUpdate) {
              return {
                ...table,
                rows: table.rows.map((row: any, rowIndex: number) => {
                  return {
                    ...row,
                    columns: row.columns.map((column: any, columnIndex: number) => {
                      if (columnIndex === columnIndexToUpdate && rowIndexToUpdate === rowIndex) {
                        if (type === 'text') {
                          return { type: 'text', text: updatedValue };
                        } else if (type === 'link'){
                          return { type: 'link', text: updatedValue, href: updatedHrefValue };
                        }
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
        {#if type === 'text'}
          <input
            type="text"
            bind:value={updatedValue}
            class="w-full m-1"
          >
        {:else if type === 'link'}
          <div class="flex flex-column">    
            <input
            type="text"
            bind:value={updatedValue}
            class="w-full m-1"
            />
            <input
            type="text"
            bind:value={updatedHrefValue}
            class="w-full m-1"
            />
          </div>
        {/if}
        <div>
            <button
              on:click={handleUpdate}
              class="btn btn-sm btn-success m-2"
            >
              Uppdatera
            </button>
            <button
              on:click={handleToggleEdit}
              class="btn btn-sm btn-warning m-2"
            >
              Avbryt
            </button>

        </div>
        
      {:else}
        <button
          class="btn btn-sm m-1 m-auto btn-info"
          on:click={handleToggleEdit}
        >
        <div class="h-3.5 mr-1"><FaArrowUp /></div> Ändra 
        </button>
      {/if}
    </div>
  {/if}
  