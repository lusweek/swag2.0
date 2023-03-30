<script lang="ts">
	import Nav from '../lib/Nav.svelte';
    import Footer from '$lib/Footer.svelte';

    import {onMount} from 'svelte'
	import { auth } from '$lib/firebase/firebase.client';
    import {authStore} from '../stores/authStore'
    onMount(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            console.log(user)
            authStore.update((curr) => {
                return { ...curr, isLoading: false, currentUser: user}
            })
        })
    })
</script>

<Nav>
	<slot data-theme="business" style={{minHeight: '90vh'}} />
    <Footer />
</Nav>
<!-- </nav> -->
