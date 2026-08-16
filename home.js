document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       OPENING
    ===================================================== */

    const startButton =
        document.getElementById("startButton");

    const opening =
        document.getElementById("opening");

    const mainContent =
        document.getElementById("main-content");



    /* =====================================================
       MUSIC
    ===================================================== */

    const ourSong =
        document.getElementById("ourSong");

    const musicButton =
        document.getElementById("musicButton");

    const musicControl =
        document.getElementById("musicControl");


    let musicPlaying = false;



    function updateMusicControls() {

        if (musicButton) {

            musicButton.textContent =
                musicPlaying
                    ? "❚❚"
                    : "▶";

            musicButton.title =
                musicPlaying
                    ? "Pause music"
                    : "Play music";

        }


        if (musicControl) {

            musicControl.textContent =
                musicPlaying
                    ? "❚❚"
                    : "♪";

            musicControl.title =
                musicPlaying
                    ? "Pause music"
                    : "Play music";

        }

    }



    function playMusic() {

        if (!ourSong) {

            console.log(
                "Audio element not found."
            );

            return;

        }


        ourSong.volume = 0.45;


        /*
            IMPORTANT:

            We DO NOT await this.

            This means the website will continue
            opening even if the music file is missing.
        */

        const playPromise =
            ourSong.play();


        if (playPromise !== undefined) {

            playPromise
                .then(function () {

                    musicPlaying = true;

                    updateMusicControls();

                })
                .catch(function (error) {

                    console.log(
                        "Music could not start.",
                        error
                    );

                    musicPlaying = false;

                    updateMusicControls();

                });

        }

    }



    function pauseMusic() {

        if (!ourSong) {
            return;
        }


        ourSong.pause();

        musicPlaying = false;

        updateMusicControls();

    }



    /* =====================================================
       BEGIN OUR STORY
    ===================================================== */

    if (startButton) {

        startButton.addEventListener(
            "click",
            function () {


                /*
                    Start music.

                    This happens directly from the
                    user's click, so browsers allow it.
                */

                playMusic();


                /*
                    MOST IMPORTANT FIX:

                    Reveal the main website FIRST.

                    The old version waited for the
                    music before revealing the page.
                */

                if (mainContent) {

                    mainContent.classList.remove(
                        "hidden"
                    );

                }


                /*
                    Fade the opening away.
                */

                if (opening) {

                    opening.style.transition =
                        "opacity 1.2s ease";

                    opening.style.opacity =
                        "0";

                }


                /*
                    Remove opening after animation.
                */

                setTimeout(
                    function () {

                        if (opening) {

                            opening.classList.add(
                                "hidden"
                            );

                        }

                    },
                    1200
                );


                /*
                    Make sure page starts
                    at the top.
                */

                window.scrollTo({
                    top: 0,
                    behavior: "auto"
                });

            }
        );

    }



    /* =====================================================
       MUSIC BUTTON
    ===================================================== */

    if (musicButton) {

        musicButton.addEventListener(
            "click",
            function () {

                if (musicPlaying) {

                    pauseMusic();

                } else {

                    playMusic();

                }

            }
        );

    }



    /* =====================================================
       NAV MUSIC BUTTON
    ===================================================== */

    if (musicControl) {

        musicControl.addEventListener(
            "click",
            function () {

                if (musicPlaying) {

                    pauseMusic();

                } else {

                    playMusic();

                }

            }
        );

    }



    /* =====================================================
       AUDIO EVENTS
    ===================================================== */

    if (ourSong) {

        ourSong.addEventListener(
            "play",
            function () {

                musicPlaying = true;

                updateMusicControls();

            }
        );


        ourSong.addEventListener(
            "pause",
            function () {

                musicPlaying = false;

                updateMusicControls();

            }
        );


        ourSong.addEventListener(
            "error",
            function () {

                console.log(
                    "Could not load pictures/our-song.mp3"
                );

                musicPlaying = false;

                updateMusicControls();

            }
        );

    }



    updateMusicControls();



    /* =====================================================
       LIVE TIMER
    ===================================================== */

    /*
        Started:

        July 10, 2026
        00:00:00

        Change the time here if you know
        the exact time you first started
        talking.
    */

    const startDate =
        new Date(
            "2026-07-10T00:00:00"
        );



    function updateTimer() {

        const now =
            new Date();


        const difference =
            now.getTime()
            -
            startDate.getTime();


        /*
            Don't show negative numbers.
        */

        if (difference < 0) {

            return;

        }


        const totalSeconds =
            Math.floor(
                difference / 1000
            );


        const days =
            Math.floor(
                totalSeconds / 86400
            );


        const hours =
            Math.floor(
                (totalSeconds % 86400)
                / 3600
            );


        const minutes =
            Math.floor(
                (totalSeconds % 3600)
                / 60
            );


        const seconds =
            totalSeconds % 60;



        const daysElement =
            document.getElementById(
                "days"
            );


        const hoursElement =
            document.getElementById(
                "hours"
            );


        const minutesElement =
            document.getElementById(
                "minutes"
            );


        const secondsElement =
            document.getElementById(
                "seconds"
            );



        if (daysElement) {

            daysElement.textContent =
                days;

        }


        if (hoursElement) {

            hoursElement.textContent =
                String(hours)
                    .padStart(2, "0");

        }


        if (minutesElement) {

            minutesElement.textContent =
                String(minutes)
                    .padStart(2, "0");

        }


        if (secondsElement) {

            secondsElement.textContent =
                String(seconds)
                    .padStart(2, "0");

        }

    }



    updateTimer();


    setInterval(
        updateTimer,
        1000
    );



    /* =====================================================
       SLIDESHOW
    ===================================================== */

    const slides =
        document.querySelectorAll(
            ".slide"
        );


    const dots =
        document.querySelectorAll(
            ".dot"
        );


    const previousButton =
        document.getElementById(
            "previousButton"
        );


    const nextButton =
        document.getElementById(
            "nextButton"
        );


    let slideIndex = 0;

    let slideshowTimer;



    function showSlide(index) {

        if (slides.length === 0) {

            return;

        }


        if (index >= slides.length) {

            slideIndex = 0;

        }


        if (index < 0) {

            slideIndex =
                slides.length - 1;

        }


        slides.forEach(
            function (slide) {

                slide.classList.remove(
                    "active"
                );

            }
        );


        dots.forEach(
            function (dot) {

                dot.classList.remove(
                    "active-dot"
                );

            }
        );


        slides[slideIndex]
            .classList.add("active");


        if (dots[slideIndex]) {

            dots[slideIndex]
                .classList.add(
                    "active-dot"
                );

        }

    }



    function resetSlideshowTimer() {

        clearInterval(
            slideshowTimer
        );


        if (slides.length > 1) {

            slideshowTimer =
                setInterval(
                    function () {

                        slideIndex++;

                        showSlide(
                            slideIndex
                        );

                    },
                    5000
                );

        }

    }



    if (previousButton) {

        previousButton.addEventListener(
            "click",
            function () {

                slideIndex--;

                showSlide(
                    slideIndex
                );

                resetSlideshowTimer();

            }
        );

    }



    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                slideIndex++;

                showSlide(
                    slideIndex
                );

                resetSlideshowTimer();

            }
        );

    }



    dots.forEach(
        function (dot, index) {

            dot.addEventListener(
                "click",
                function () {

                    slideIndex =
                        index;

                    showSlide(
                        slideIndex
                    );

                    resetSlideshowTimer();

                }
            );

        }
    );



    showSlide(
        slideIndex
    );


    resetSlideshowTimer();



    /* =====================================================
       YES BUTTONS
    ===================================================== */

    const yesButton =
        document.getElementById(
            "yesButton"
        );


    const absolutelyButton =
        document.getElementById(
            "absolutelyButton"
        );


    const questionContent =
        document.getElementById(
            "question-content"
        );


    const successMessage =
        document.getElementById(
            "success-message"
        );



    function sayYes() {


        if (questionContent) {

            questionContent.classList.add(
                "hidden"
            );

        }


        if (successMessage) {

            successMessage.classList.remove(
                "hidden"
            );

        }


        createHearts();

    }



    if (yesButton) {

        yesButton.addEventListener(
            "click",
            sayYes
        );

    }



    if (absolutelyButton) {

        absolutelyButton.addEventListener(
            "click",
            sayYes
        );

    }



    /* =====================================================
       FLOATING HEARTS
    ===================================================== */

    function createHearts() {

        const numberOfHearts =
            45;


        for (
            let i = 0;
            i < numberOfHearts;
            i++
        ) {


            const heart =
                document.createElement(
                    "div"
                );


            heart.innerHTML =
                "♥";


            heart.style.position =
                "fixed";


            heart.style.left =
                Math.random() * 100
                + "vw";


            heart.style.top =
                "100vh";


            heart.style.fontSize =
                (
                    Math.random() * 20
                    + 10
                )
                + "px";


            heart.style.color =
                Math.random() > 0.5
                    ? "#A8C3A0"
                    : "#D8B56A";


            heart.style.pointerEvents =
                "none";


            heart.style.zIndex =
                "9999";


            heart.style.transition =
                "transform 4s ease, opacity 4s ease";


            document.body.appendChild(
                heart
            );


            setTimeout(
                function () {

                    heart.style.transform =
                        `translateY(-${
                            window.innerHeight + 200
                        }px)
                        rotate(${
                            Math.random() * 360
                        }deg)`;


                    heart.style.opacity =
                        "0";

                },
                100
            );


            setTimeout(
                function () {

                    heart.remove();

                },
                4500
            );

        }

    }

});