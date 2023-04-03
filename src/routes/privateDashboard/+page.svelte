<script>
    import '../../app.css'
	import { authHandlers, authStore } from '../../stores/authStore';

    let email;
    authStore.subscribe(curr => {
        console.log('curr', curr)
        email = curr?.currentUser?.email
    })
</script>

{#if $authStore?.currentUser}
<div>
    <h1>Välkommen Jakob!</h1>
    <h2>Här kan du se alla medlemmar</h2>
</div>

<section>
    
</section>

{:else}
<div>Laddar...</div>
{/if}




<style>
    div {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>