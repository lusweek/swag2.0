<script lang="ts">
    export let isLoading: Boolean

    let display = ''

    $: isLoading ? display = "display: flex" : display = "display: none"
    
</script>

<div class="bg" style="{display}">
    <div class="wrapper">
        <div class="spinner"></div>
        <img src="/img/swag_logo_vector_02.svg" alt="Eftersom du inte kan se loggan kan du njuta av detta skämt: Vad sa göteborgaren när den brittiska sjökaptenen förr överbod och bad om hjälp? 'HAN PRATAR JU ENGELSKA FLYTANDE!'">
    </div>
</div>


<style>
    .bg{
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 30;
    }
    .wrapper{
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .spinner{
        width: 100%;
        height: 100%;
        border: dotted yellow 4px;
        border-radius: 50%;
        animation-name: swagSpinner;
        animation-duration: 3s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        position: absolute;

    }
    img{
        width: 60%;
    }

    @keyframes swagSpinner {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(359deg);
        }
    }

</style>