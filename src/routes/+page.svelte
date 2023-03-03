<script>
    import '../app.css'
	import CallToActionCard from '../lib/CallToActionCard.svelte';

    const navigateToKurser = () => window.location.href = "/kurser";
</script>

<section class="flex flex-col items-center pb-8">


    <article class=" mb-8 w-screen flex flex-col items-center" >
        <div class="index">
            <h1 class="text-3xl mt-0 font-bold">SWAG</h1>
            <h2 class="font-bold">Street workout & calisthenics Göteborg</h2>
        </div>
        
        <div style="background-image: 
                linear-gradient(143deg, rgba(91,42,125,1), rgba(133,17,17,0.57), rgba(252,176,69,0.3)),
                url('img/Backround-img-min-thin.webp');" 
            id="first-call-action" 
            class="card w-11/12 xl:w-9/12 bg-neutral text-neutral-content py-6 "
        >
            <div class="px-0 card-body text-white items-center text-center justify-between">
              <h2 class="card-title leading-10 m-5 slogan">Trött på gravitationens lagar? <br> Träna calisthenics med oss!</h2>
              <div class="card-actions justify-end m-5 flex-col items-center">
                <button on:click={navigateToKurser} class="btn btn-primary">Se open gym och kurser</button>
              </div>
            </div>
          </div>
    </article>

    <article class="flex justify-evenly flex-wrap gap-9 w-11/12 ">
        <CallToActionCard 
          text1="Lär dig träna kroppsviktsträning!" 
          text2="Pullups, muscle up, handstående och mycket mer"
          marginTop="45%"
          img="/img/Jakob_pt_short.webp"
          btnText="se kurser"
          imgAlt="Bild på Jakob som hjälper elev göra en muscle up"
          endpoint="kurser"
        />
        
        <!-- <CallToActionCard 
        text1="Ta din träning på yttersta allvar!" 
        text2="Få anpassad kvaliteträning med Jakob som PT"
        marginTop="60%"
        img="/img/Jakob.webp"
        btnText="Anmälan"
        imgAlt="Bil på Jakob"
        endpoint="anmälan"
        /> -->
        
        <CallToActionCard 
          text1="Lär dig något nytt!" 
          text2="Läs om oss och calisthenics"
          marginTop="10%"
          img="/img/Gruppbild-min.webp"
          btnText="om oss"
          imgAlt="Bild på Jakob med ett gäng bakom honnom"
          endpoint="about"
        />
    </article>
        

</section>



<style>
    .index{ 
        text-align: center;
        display: block;
        margin: 20px auto;
    }

    #first-call-action{
    background-size: cover;
    height: 450px;
    }

    .slogan{
      font-size: 40px;
      font-weight: bold;
      font-family: serif;
      font-style: italic;
      line-height: 50px;
    }

</style>