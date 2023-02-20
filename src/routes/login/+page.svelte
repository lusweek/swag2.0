<script>
    let userObject = null;
    const userbase = window.userbase;
    userbase.init({appId: '31141498-cbd5-4b7a-a062-3b2810bc5fd2'})
        .then({user}) => userObject = user

    let username, password;

    const signIn = () => userbase.signIp({username, password})
    const signUp = () => userbase.signUp({username, password})
</script>

<section class="mt-16">
    <form action="">
        <label for="username">Username</label>
        <input type="text" id="username" bind:value={username}><br>
        <label for="password">Username</label>
        <input type="text" id="password" bind:value={password}><br>
        <button on:click={signIn}>Sign in</button>
        <button on:click={signUp}>Sign up</button>
    </form>
</section>
