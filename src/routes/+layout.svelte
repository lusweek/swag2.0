<script lang="ts">
	import Nav from '../lib/Nav.svelte';
    import Footer from '$lib/Footer.svelte';

    import {onMount} from 'svelte'
	import { auth } from '$lib/firebase/firebase.client';
    import {authStore} from '../stores/authStore'
    import { browser } from '$app/environment';
	import Toast from '$lib/utilis/Toast.svelte';


    onMount(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            authStore.update((curr) => {
                return { ...curr, isLoading: false, currentUser: user}
            })

            if (browser) {
                if (
                    !$authStore.currentUser && 
                    !$authStore.isLoading &&
                    // Lägg till ytterligare endpoints om det är fler som man bara ska se som auth
                    window.location.pathname === '/members'
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

<Toast />