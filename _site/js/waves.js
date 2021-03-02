
function generateWave(posX, posY) {
    const wave = document.createElement("div");
    document.body.appendChild(wave);
    wave.style.backgroundImage = "url(images/Wave2.png)";
    wave.style.backgroundSize = "cover";
    wave.style.transform = "scale(1)";
    wave.style.width = "20px";
    wave.style.height = "20px";
    wave.style.position = "absolute";
    wave.style.top = `${posY-10}px`;
    wave.style.left = `${posX-10}px`;
    wave.classList.add("wave");
}

if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
    document.body.addEventListener("touchstart", (event) => {
        var posX = event.touches[0].clientX;
        var posY = event.touches[0].clientY;
        const waves = document.querySelectorAll(".wave");
        if (waves.length < 30) {
            generateWave(posX,posY);
        }
        return true;
    });
} else {
    document.body.addEventListener("mousedown", (event) => {
        var posX = event.clientX;
        var posY = event.clientY;
        const waves = document.querySelectorAll(".wave");
        if (waves.length < 30) {
            generateWave(posX,posY);
        }
        return true;
    });
}

tick();

function tick() {
    requestAnimationFrame(tick);
    const waves = document.querySelectorAll(".wave");
    for (const wave of waves) {
        console.log(wave.style.width);
        if (wave.style.width == "calc(1210px)") {
            wave.parentNode.removeChild(wave);
        } else {
            wave.style.width = "calc(" + wave.style.width + " + 12px)";
            wave.style.height = "calc(" + wave.style.height + " + 12px)";
            wave.style.top = "calc(" + wave.style.top + " - 6px)";
            wave.style.left = "calc(" + wave.style.left + " - 6px)";
        }
    }
}
