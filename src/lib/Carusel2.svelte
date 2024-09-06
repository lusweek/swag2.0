<script>
import FaRegArrowAltCircleRight from 'svelte-icons/fa/FaRegArrowAltCircleRight.svelte'
import FaRegArrowAltCircleLeft from 'svelte-icons/fa/FaRegArrowAltCircleLeft.svelte'

    let currentImageIndex = 0;
    export let images = [];

    const nextImage = () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
    };

    const nextDubbleImage = () => {
        currentImageIndex = (currentImageIndex + 2) % images.length;
    };

    const prevImage = () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    };

    const prevDubbleImage = () => {
        currentImageIndex = (currentImageIndex - 2 + images.length) % images.length;
    };

</script>


<div class="carousel-container">
        <!-- Main carousel image -->
        <img class="carousel-image" src={images[currentImageIndex]} alt="Carousel image" />

    <!-- Carousel navigation buttons -->
        <button class="carousel-buttons carousel-prev-button" on:click={prevImage}><FaRegArrowAltCircleLeft /></button>
        <button class="carousel-buttons carousel-next-button" on:click={nextImage}><FaRegArrowAltCircleRight /></button>

    <!-- Thumbnails container -->
    <div class="thumbnails-container">
        <!-- Previous two images -->
        <img class="thumbnail" src={images[(currentImageIndex - 2 + images.length) % images.length]} alt="Previous image 2" on:click={prevDubbleImage} />
        <img class="thumbnail" src={images[(currentImageIndex - 1 + images.length) % images.length]} alt="Previous image 1" on:click={prevImage} />

        <!-- Next two images -->
        <img class="thumbnail" src={images[(currentImageIndex + 1) % images.length]} alt="Next image 1" on:click={nextImage} />
        <img class="thumbnail" src={images[(currentImageIndex + 2) % images.length]} alt="Next image 2" on:click={nextDubbleImage} />
    </div>
</div>


<style>
    .carousel-container {
        position: relative;
        max-width: 600px;
        margin: 0 auto;
        overflow: hidden;
    }

    .carousel-image {
        width: 100%;
        height: auto;
    }

    .carousel-buttons {
        background-color: #00000080;
        color: yellow;
        border: none;
        padding: 10px;
        cursor: pointer;
        margin: 7px;
        position: absolute;
        width: 50px;
        top: 38%;
    }

    .carousel-next-button {
        right: 0;
    }

    .carousel-button:hover {
        background-color: rgba(0, 0, 0, 0.7);
    }

    .thumbnails-container {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        gap: 10px; /* Add some spacing between thumbnails */
    }

    .thumbnail {
        flex: 1; /* Each thumbnail will take up an equal portion of the available space */
        height: 80px;
        opacity: 0.7;
        cursor: pointer;
        object-fit: cover;
    }

    .thumbnail.active {
        border: 2px solid #000;
        opacity: 1;
    }

    .thumbnail:hover {
        opacity: 1;
    }
</style>