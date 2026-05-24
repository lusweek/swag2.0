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
            window.location.href = '/members'
        }
    }

</script>
<div class="sw sw-page login-page">
<section class="login-wrap">

<form on:submit={handleSubmit} class="form" >
    <div class="eyebrow">/ Admin</div>
    <div class="title">Logga in</div>
    <div class="input-container ic2">
      <input bind:value={email} id="email" class="input" type="text" placeholder=" " />
      <div class="cut cut-short"></div>
      <label  for="email" class="placeholder">Email</label>
    </div>
    <div class="input-container ic2">
      <input bind:value={password} id="password" class="input" type="password" placeholder=" " />
      <div class="cut"></div>
      <label for="lastname" class="placeholder">Lösenord</label>
    </div>
    <button type="submit" class="submit">Logga in</button>
</form>

</section>
</div>

<style>

.login-page {
  display: flex;
  justify-content: center;
}

.login-wrap {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 96px 24px;
  width: 100%;
}

.form {
  background-color: var(--ink);
  color: var(--cream);
  box-sizing: border-box;
  padding: 40px 32px;
  width: 360px;
  max-width: 100%;
  border: 1px solid var(--ink);
}

.eyebrow {
  font-family: var(--f-mono);
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--yellow);
}

.title {
  color: var(--cream);
  font-family: var(--f-display);
  font-weight: 800;
  font-size: 56px;
  line-height: 0.9;
  text-transform: uppercase;
  margin-top: 8px;
}

.input-container {
  height: 50px;
  position: relative;
  width: 100%;
}

.ic2 {
  margin-top: 34px;
}

.input {
  background-color: var(--ink-2);
  border: 1px solid var(--line-dark);
  box-sizing: border-box;
  color: var(--cream);
  font-family: var(--f-body);
  font-size: 16px;
  height: 100%;
  outline: 0;
  padding: 4px 16px 0;
  width: 100%;
}

.input:focus {
  border-color: var(--yellow);
}

.cut {
  background-color: var(--ink);
  height: 20px;
  left: 16px;
  position: absolute;
  top: -20px;
  transform: translateY(0);
  transition: transform 200ms;
  width: 76px;
}

.cut-short {
  width: 50px;
}

.input:focus ~ .cut,
.input:not(:placeholder-shown) ~ .cut {
  transform: translateY(8px);
}

.placeholder {
  color: var(--chalk);
  font-family: var(--f-mono);
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  left: 16px;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  transition: transform 200ms, color 200ms;
  top: 20px;
}

.input:focus ~ .placeholder,
.input:not(:placeholder-shown) ~ .placeholder {
  transform: translateY(-30px) translateX(6px) scale(0.8);
}

.input:focus ~ .placeholder {
  color: var(--yellow);
}

.submit {
  background-color: var(--yellow);
  border: 1px solid var(--yellow);
  box-sizing: border-box;
  color: var(--ink);
  cursor: pointer;
  font-family: var(--f-mono);
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 14px;
  height: 50px;
  margin-top: 38px;
  outline: 0;
  text-align: center;
  width: 100%;
  transition: all 0.15s;
}

.submit:hover {
  background-color: var(--cream);
  border-color: var(--cream);
}

</style>
