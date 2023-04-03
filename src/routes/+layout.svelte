<script lang="ts">
	import Nav from '../lib/Nav.svelte';
    import Footer from '$lib/Footer.svelte';

    import {onMount} from 'svelte'
	import { auth } from '$lib/firebase/firebase.client';
    import {authStore} from '../stores/authStore'
    import { browser } from '$app/environment';

    onMount(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            console.log(user)
            authStore.update((curr) => {
                return { ...curr, isLoading: false, currentUser: user}
            })

            console.log(authStore.currentUser, authStore.isLoading )

            if (browser) {
                if (
                    !$authStore.currentUser && 
                    !$authStore.isLoading &&
                    window.location.pathname !== '/'
                    ) {
                    window.location.href = '/'
                }
            }
        })
        return unsubscribe
    })
</script>

<Nav>
	<slot data-theme="business" style={{minHeight: '90vh'}} />
    <Footer />
</Nav>
