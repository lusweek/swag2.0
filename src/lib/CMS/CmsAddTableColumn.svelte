<script lang="ts">
    import { authStore } from '../../stores/authStore';
    import { doc, updateDoc } from 'firebase/firestore';
    import { db } from '$lib/firebase/firebase.client';
    import { notifications } from '$lib/utilis/notifications';
  
    export let prevTableData: any
    export let FBData: any
    export let FBDocument: string;
    export let FBField: string;
    export let FBObjectKey: string;
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
  
    let headers: Array<string> = [];
    let numRows = 1;
  
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
        
        const newColumn = [
            { type: 'text', text: 'Text nr 3' },
            { type: 'text', text: 'Text nr 3' }
        ];
        
        console.log('FBData', FBData)
        console.log('open_gym', FBData.open_gym)
        
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
    <button
      class={`btn btn-sm m-4 m-auto ${isVisable ? 'btn-warning' : 'btn-info'}`}
      on:click={handleIsVisable}
    >
      {isVisable ? 'Stäng' : 'Lägg till kolumn'}
    </button>
  
    {#if isVisable}
      <input
        type="text"
        placeholder="Header Text"
        bind:value={headers[headers.length - 1]}
        class="w-9/12"
      />
  
      <button
        on:click={handleUpdate}
        class="btn btn-sm btn-success m-4"
      >
        Lägg till
      </button>
    {/if}
  {/if}
  
