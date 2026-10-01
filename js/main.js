const themeButton = document.querySelector('.theme');
const themeMeta = document.querySelector('meta[name="theme-color"]');

function setTheme(isLight) {
    document.body.classList.toggle('light', isLight);

    if (themeMeta) {
        themeMeta.content = isLight ? '#ffffff' : '#000000';
    }
}

const savedTheme = localStorage.getItem('harsh-portfolio-theme');

setTheme(savedTheme === 'light');

if (themeButton) {
    themeButton.addEventListener('click', () => {
        const isLight = !document.body.classList.contains('light');

        setTheme(isLight);

        localStorage.setItem(
            'harsh-portfolio-theme',
            isLight ? 'light' : 'dark'
        );
    });
}


/* =========================================
   GLOBAL WEBSITE ZOOM
   ========================================= */

(function () {

    const ZOOM_KEY = "harsh-portfolio-zoom";

    const MIN_ZOOM = 0.75; // 75%
    const MAX_ZOOM = 1.25; // 125%
    const STEP = 0.05;     // 5%

    let zoom = parseFloat(
        localStorage.getItem(ZOOM_KEY)
    ) || 1;


    function applyZoom() {

        document.documentElement.style.setProperty(
            "--site-zoom",
            zoom
        );

        localStorage.setItem(
            ZOOM_KEY,
            zoom.toFixed(2)
        );
    }


    document.addEventListener("keydown", function (event) {

        /* Ctrl + Plus */

        if (
            event.ctrlKey &&
            (event.key === "+" || event.key === "=")
        ) {

            event.preventDefault();

            zoom = Math.min(
                MAX_ZOOM,
                +(zoom + STEP).toFixed(2)
            );

            applyZoom();

            return;
        }


        /* Ctrl + Minus */

        if (
            event.ctrlKey &&
            event.key === "-"
        ) {

            event.preventDefault();

            zoom = Math.max(
                MIN_ZOOM,
                +(zoom - STEP).toFixed(2)
            );

            applyZoom();

            return;
        }


        /* Ctrl + 0 */

        if (
            event.ctrlKey &&
            event.key === "0"
        ) {

            zoom = 1;

            applyZoom();

            /*
             * IMPORTANT:
             * We intentionally DO NOT use
             * event.preventDefault() here.
             *
             * This allows the browser's own
             * native zoom to reset to 100%.
             */

            return;
        }

    });


    applyZoom();

})();