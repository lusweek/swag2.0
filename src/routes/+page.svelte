<script>
    import '../app.css'
</script>

<!-- såhär lägger man in theme:
    data-theme="cyberpunk" -->

    <section class="flex flex-col items-center w-screen" >
        <div class="index">
            <h1 class="text-3xl font-bold">GÖTEBORGS</h1>
            <h2 class="font-bold">STREETWORKOUT &
                CALISTHENICSFÖRENING</h2>
        </div>
        
        <div id="first-call-action" class="card  w-11/12 xl:w-9/12 bg-neutral text-neutral-content py-6 ">
            <div class="card-body text-white items-center text-center justify-between">
              <h2 class="card-title leading-10 m-5">Trött på gravitationens lagar? <br> träna calisthenics med oss!</h2>
              <div class="card-actions justify-end m-5 flex-col items-center">
                  <!-- <p>Se våra open-gym pass och kurser</p> -->
                <button class="btn btn-primary">Se open gym och kurser</button>
              </div>
            </div>
          </div>

    </section>

<style>
    .index{ 
        text-align: center;
        display: block;
        margin: 20px auto;
    }

    #first-call-action{
    background-image: 
    linear-gradient(143deg, rgba(91,42,125, 1), rgba(133,17,17, 0.57), rgba(252,176,69,0.3)),
    url('img/Backround-img-min-thin.png');
    background-size: cover;
    height: 450px;
    }

</style>