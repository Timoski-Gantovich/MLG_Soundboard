// Sound files per letter
const sounds = {
  A: "airhorn.mp3",
  B: "bruh.mp3",
  C: "creeper.mp3",
  D: ["do_it.mp3", "disney_mlg.mp3"],
  E: "e.mp3",
  F: "fbi.mp3",
  G: ["get.mp3", "grunt-birthday-party.mp3"],
  H: "hitmarker.mp3",
  I: "illuminati.mp3",
  J: "john-cena.mp3",
  K: ["killionaire.mp3", "kobe.mp3"],
  L: ["legolas.mp3", "look-at-this-dude.mp3"],
  M: "mlg.mp3",
  N: "nyan-cat_1.mp3",
  O: ["omgwow.mp3", "oh-my-god-meme.mp3"],
  P: "pizza-time-theme.mp3",
  Q: "quack_5.mp3",
  R: "reload.mp3",
  S: "skill.mp3",
  T: "tactical.mp3",
  U: ["un.mp3", "untouchable.mp3", "ultra-kill.mp3"],
  V: ["victory.mp3", "victory_hw.mp3", "vine-boom.mp3"],
  W: ["wow.mp3", "waagh.mp3", "wort_wort_wort.mp3"],
  X: "x.mp3",
  Y: "yee.mp3",
  Z: "zombie.mp3",
};

// Normalize all entries to arrays
for (const key in sounds) {
  if (typeof sounds[key] === "string") {
    sounds[key] = [sounds[key]];
  }
}

const container = document.querySelector(".grid-container");

// Create buttons A–Z dynamically
Object.keys(sounds).forEach((letter) => {
  const btn = document.createElement("button");
  btn.className = "sound-btn";
  btn.textContent = letter;
  btn.setAttribute("data-letter", letter);
  btn.addEventListener("click", () => playSound(letter));
  container.appendChild(btn);
});

// Keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();
  if (sounds[key]) {
    playSound(key);
    flashButton(key);
  }
});

// Play sound and trigger rain effect
function playSound(letter) {
  const options = sounds[letter];
  if (!options || options.length === 0) return;

  const randomIndex = Math.floor(Math.random() * options.length);
  const selectedFile = options[randomIndex];
  const soundPath = `sounds/${selectedFile}`;
  const audio = new Audio(soundPath);

  if (letter === "I" && selectedFile === "illuminati.mp3") {
    audio.addEventListener("loadedmetadata", () => {
      const duration = audio.duration * 1000 || 4000;
      startRainImage(duration);
      audio.play();
    });
  } else {
    audio.play();
  }
}

// Visual feedback
function flashButton(letter) {
  const btn = document.querySelector(`.sound-btn[data-letter="${letter}"]`);
  if (btn) {
    btn.classList.add("active");
    setTimeout(() => btn.classList.remove("active"), 100);
  }
}

// Rain image animation
function startRainImage(duration = 5000) {
  const container = document.getElementById("rain-container");

  const interval = setInterval(() => {
    const el = document.createElement("div");
    el.classList.add("rain-symbol");

    const size = Math.random() * 24 + 24; // 24–48px
    const rotation = Math.random() * 360;

    const img = document.createElement("img");
    img.src = "icons/il_2.png"; // Your resized PNG path
    img.style.width = `${size}px`;
    img.style.transform = `rotate(${rotation}deg)`;

    el.style.left = `${Math.random() * 100}vw`;
    el.style.animationDuration = `${Math.random() * 2 + 2}s`;
    el.appendChild(img);

    container.appendChild(el);
    setTimeout(() => container.removeChild(el), 4000);
  }, 100);

  setTimeout(() => clearInterval(interval), duration);
}
