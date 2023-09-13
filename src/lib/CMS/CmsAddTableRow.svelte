<script lang="ts">
    import { authStore } from '../../stores/authStore';
    import { doc, updateDoc } from 'firebase/firestore';
    import { db } from '$lib/firebase/firebase.client';
    import { notifications } from '$lib/utilis/notifications';
  
    export let prevTableData: any
    export let FBData: any
    export let FBDocument: string;
    export let getData: (() => void);
    export let tableIndexToUpdate: number | null
  
    let currentUser: object | null = null;
    authStore.subscribe((curr) => {
      currentUser = curr?.currentUser;
    });
  
    let isVisable = false;
    function handleIsVisable() {
      isVisable = !isVisable;
    }
  
    let newRows: Array<string> = [];
  
    let updateStatus: string | null = null; // Possible values: null, 'success', 'error'
    let updateMessage = '';
  
    async function handleUpdate() {
      try {
        await handleFormSubmit();
        updateStatus = 'success';
        updateMessage = 'Update successful!';
        notifications.success(updateMessage);
        getData();
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
        // Construct the new column data

        const newColumn = newRows.map((header) => {
          return {type: 'text', text: header}
        })
        
       // Clone the intire document in firebase and adds the new column to it. 
       const updatedData = {
        ...FBData,
        open_gym: {
          ...FBData.open_gym, 
          tables: FBData.open_gym.tables.map((table, index) => {
              if (index === tableIndexToUpdate) {
                return {
                  ...table, 
                  rows: [
                    ...table.rows, { columns: newColumn } // adds the new row with column data
                  ]
                };
              } else {
                return table; // keep other tables unchanged 
              }
          })
        }
      };

    //Use the updated data to update firebase
    const updateRef = doc(db, 'CMS', FBDocument);
    console.log('updatedData', updatedData)
    await updateDoc(updateRef, updatedData);

}
</script>
  
  {#if currentUser}
    <div class="flex flex-col items-center	">

      <button
        class={`btn btn-sm m-1 m-auto ${isVisable ? 'hidden' : 'btn-info'}`}
        on:click={handleIsVisable} >
        {'Lägg till rad'}
      </button>
    
      {#if isVisable}
      <h2>Lägg till rad</h2>
        {#each prevTableData.headers as header, index }
            <label for={header}>{header}</label>
            <input
              type="text"
              id={header}
              placeholder={header}
              bind:value={newRows[index]}
              class="w-9/12 m-1"
            />
        {/each}
        <div>

          <button
            on:click={handleUpdate}
            class="btn btn-sm btn-success m-2" >
            Lägg till
          </button>
          <button
            class='btn btn-sm m-1 m-auto btn-warning'
            on:click={handleIsVisable} >
            Avbryt
          </button>
        </div>

      {/if}
    </div>
  {/if}
      
