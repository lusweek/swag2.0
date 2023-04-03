<script>
    import '../../app.css'
    import { authHandlers } from '../../stores/authStore';
    import { authStore } from '../../stores/authStore';

    let email = ''
    let password = ''

    async function handleSubmit() {
        if (!email || !password) {
            return;
        } 

        try {
            await authHandlers.login(email, password)
        } catch(err) {
            console.log(err)
        }

        if ($authStore.currentUser) {
            window.location.href = '/privateDashboard'
        }
    }

</script>

<section class="mt-16 flex flex-col justify-center">
    <h1>Logga in</h1>

    <form class="container">
        <label for="">
            <input bind:value={email} type="email" placeholder="Email">
        </label>
        <label for="">
            <input bind:value={password} type="password" placeholder="Lösenord">
        </label>
        <button on:click={handleSubmit}>
            Logga in
        </button>
    </form>


    <!-- <a href="/admin" class="btn">
        <button>Logga in</button>
    </a> -->
</section>


<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;

    }

    .container form {
        display: flex;
        flex-direction: column;
    }
</style>