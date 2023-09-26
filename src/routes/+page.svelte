<script>
  import Section from '$lib/Section.svelte';
	import CallToActionCard from '../lib/CallToActionCard.svelte';
  import BasicCard from '$lib/BasicCard.svelte';

  // document.body.scrollIntoView();

</script>

<Section>


    <article>

      <div class="min-h-screen py-8 bg-base-200">
        <div class="hero-content flex-col lg:px-10 lg:flex-row xl:px-32">
          <div class="mx-x flex flex-col">
            <h1 class="text-5xl p-4 font-bold leading-tight">Trött på gravitationens lagar?</h1>
            <p class="pb-6 px-4 mt-0 w-6/8 md:max-w-xl self-center lg:self-start">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button class="btn btn-primary w-fit self-center	">Get Started</button>
          </div>
          <img src="/img/SWAG_logo.png" class="max-w-sm my-32 lg:my-2 mx-4 rounded-lg shadow-2xl" />
        </div>
      </div>

    </article>
<!-- 
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
              <h2 class="card-title leading-10 m-5 slogan text-2xl md:text-3xl lg:text-5xl">Trött på gravitationens lagar? <br> Träna calisthenics med oss!</h2>
              <div class="card-actions justify-end m-5 flex-col items-center">
                  <a href="/kurser"><button class="btn btn-primary">Se open gym och kurser</button></a>
              </div>
            </div>
          </div>
    </article> -->

    <article class="flex justify-evenly flex-wrap gap-9 w-11/12 ">
      <!-- 
        <CallToActionCard 
          text1="Lär dig träna kroppsviktsträning!" 
          text2="Pullups, muscle up och mycket mer"
          marginTop="45%"
          img="/img/Jakob_pt_short.webp"
          btnText="se kurser"
          imgAlt="Bild på Jakob som hjälper elev göra en muscle up"
          endpoint="kurser"
        /> -->
        
        <!-- <CallToActionCard 
        text1="Ta din träning på yttersta allvar!" 
        text2="Få anpassad kvaliteträning med Jakob som PT"
        marginTop="60%"
        img="/img/Jakob.webp"
        btnText="Anmälan"
        imgAlt="Bil på Jakob"
        endpoint="anmälan"
        /> -->
        
        <!-- <CallToActionCard 
          text1="Lär dig något nytt!" 
          text2="Läs om oss och calisthenics"
          marginTop="10%"
          img="/img/Gruppbild-min.webp"
          btnText="om oss"
          imgAlt="Bild på Jakob med ett gäng bakom honnom"
          endpoint="about"
        /> -->

        <BasicCard 
          title="Umgänge"
          text="Att vara med i SWAG handlar inte bara om att förbättra sin fysik. SWAG är en gemenskap som välkomnar alla! Oavsett ålder, kön eller etnicitet."
          img="/img/Gruppbild-min.webp"
          alt="Gruppbild"
        />

        <BasicCard 
          title="Individbaserad "
          text="Få individbaserad hjälp för att få den fysik du alltid drömt om"
          img="/img/Jakob_pt_short.webp"
          alt="Gruppbild"
        />

    </article>
        

</Section>



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
      /* font-size: 40px; */
      font-weight: bold;
      font-family: serif;
      font-style: italic;
      line-height: 50px;
    }

</style>