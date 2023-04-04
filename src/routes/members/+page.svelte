<script>
    import '../../app.css'
	import { authHandlers, authStore } from '../../stores/authStore';
    import firebase from "firebase/app";
    import "firebase/firestore";

    let email;
    authStore.subscribe(curr => {
        console.log('curr', curr)
        email = curr?.currentUser?.email
    })

    let members = [
        {
            fName: 'Lukas',
            lName: 'Hagberg',
            birth: 980426,
            email: 'lukash@live.se',
            postNr: 44837,
            adress: 'Hjortronvägen 4',
            tel: '',
            intrests: ''
        }
    ]

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