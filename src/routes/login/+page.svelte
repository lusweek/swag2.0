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
<section class="mt-16 flex flex-col items-center">

<form on:submit={handleSubmit} class="form" >
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

<style>

    body {
  align-items: center;
  background-color: #000;
  display: flex;
  justify-content: center;
  height: 100vh;
}

.form {
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  height: 500px;
  padding: 20px;
  width: 320px;
}

.title {
  color: #eee;
  font-family: sans-serif;
  font-size: 36px;
  font-weight: 600;
  margin-top: 30px;
}

.subtitle {
  color: #eee;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
}

.input-container {
  height: 50px;
  position: relative;
  width: 100%;
}

.ic1 {
  margin-top: 40px;
}

.ic2 {
  margin-top: 30px;
}

.input {
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 18px;
  height: 100%;
  outline: 0;
  padding: 4px 20px 0;
  width: 100%;
}

.cut {
  background-color: #15172b;
  border-radius: 10px;
  height: 20px;
  left: 20px;
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
  color: #65657b;
  font-family: sans-serif;
  left: 20px;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  transition: transform 200ms, color 200ms;
  top: 20px;
}

.input:focus ~ .placeholder,
.input:not(:placeholder-shown) ~ .placeholder {
  transform: translateY(-30px) translateX(10px) scale(0.75);
}

.input:not(:placeholder-shown) ~ .placeholder {
  color: #808097;
}

.input:focus ~ .placeholder {
  color: #dc2f55;
}

.submit {
  background-color: #08d;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 38px;
    outline: 0;
  text-align: center;
  width: 100%;
}

.submit:active {
  background-color: #06b;
}


</style>