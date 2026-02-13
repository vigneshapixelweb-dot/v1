const heartsLayer = document.getElementById("hearts");
const balloonsLayer = document.getElementById("balloons");
const loveBtn = document.getElementById("loveBtn");
const secret = document.getElementById("secret");
const gameZone = document.getElementById("gameZone");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const answerText = document.getElementById("answerText");

function spawnHeart(x = Math.random() * window.innerWidth) {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = ["❤", "💗", "💕", "💘"][Math.floor(Math.random() * 4)];
  heart.style.left = `${x}px`;
  heart.style.animationDuration = `${4 + Math.random() * 4}s`;
  heart.style.fontSize = `${0.9 + Math.random() * 1.4}rem`;
  heartsLayer.appendChild(heart);

  heart.addEventListener("animationend", () => heart.remove());
}

function spawnBalloon(x = Math.random() * window.innerWidth, front = false) {
  if (!balloonsLayer) return;
  const balloon = document.createElement("span");
  const colors = ["#ff6f91", "#ff8fab", "#ffa8c2", "#f973a9", "#ff5d8f"];
  balloon.className = "balloon";
  if (front) {
    balloon.classList.add("front");
  }
  balloon.style.left = `${x}px`;
  balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
  balloon.style.animationDuration = front ? `${5 + Math.random() * 2}s` : `${5 + Math.random() * 4}s`;
  balloon.style.transform = `scale(${front ? 1 + Math.random() * 0.45 : 0.85 + Math.random() * 0.5})`;
  balloonsLayer.appendChild(balloon);

  balloon.addEventListener("animationend", () => balloon.remove());
}

setInterval(() => spawnHeart(), 520);

loveBtn.addEventListener("click", () => {
  secret.classList.add("show");
  for (let i = 0; i < 22; i += 1) {
    setTimeout(() => spawnHeart(window.innerWidth * 0.5 + (Math.random() * 240 - 120)), i * 90);
  }
  for (let i = 0; i < 22; i += 1) {
    setTimeout(() => {
      const centerBurstX = window.innerWidth * 0.5 + (Math.random() * 340 - 170);
      spawnBalloon(centerBurstX, true);
    }, i * 80);
  }
  for (let i = 0; i < 10; i += 1) {
    setTimeout(() => spawnBalloon(window.innerWidth * (0.1 + Math.random() * 0.8), false), i * 130);
  }
});

function moveNoButton() {
  if (!gameZone || !yesBtn) return;
  const zoneRect = gameZone.getBoundingClientRect();
  const btnRect = yesBtn.getBoundingClientRect();
  const padding = 8;
  const maxX = zoneRect.width - btnRect.width - padding;
  const maxY = zoneRect.height - btnRect.height - padding;
  const x = Math.max(padding, Math.random() * maxX);
  const y = Math.max(padding, Math.random() * maxY);
  yesBtn.style.left = `${x}px`;
  yesBtn.style.top = `${y}px`;
}

if (yesBtn) {
  yesBtn.addEventListener("mouseenter", moveNoButton);
  yesBtn.addEventListener("touchstart", (event) => {
    event.preventDefault();
    moveNoButton();
  });
}

if (gameZone && yesBtn) {
  gameZone.addEventListener("mousemove", (event) => {
    const rect = yesBtn.getBoundingClientRect();
    const distX = Math.abs(event.clientX - (rect.left + rect.width / 2));
    const distY = Math.abs(event.clientY - (rect.top + rect.height / 2));
    if (distX < 85 && distY < 55) {
      moveNoButton();
    }
  });
}

if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    answerText.textContent = "YES";
    for (let i = 0; i < 28; i += 1) {
      setTimeout(() => spawnHeart(window.innerWidth * (0.25 + Math.random() * 0.5)), i * 70);
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.25 }
);

document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
