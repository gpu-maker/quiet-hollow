// ================== SAVE SYSTEM ==================
let save = JSON.parse(localStorage.getItem("quietHollow")) || {
  health: 100,
  sanity: 100,
  location: "street",
  inventory: [],
  endings: []
};

function saveGame() {
  localStorage.setItem("quietHollow", JSON.stringify(save));
}

// ================== MAP ==================
const locations = [
  "street","church","woods","school","lake",
  "hospital","radio","home","basement","cemetery"
];

const discovered = new Set([save.location]);

const fogCanvas = document.getElementById("fog");
const ctx = fogCanvas.getContext("2d");

// ================== AUDIO ==================
const whisper = document.getElementById("whisper");
const staticSound = document.getElementById("static");

function sanityEffects() {
  if (save.sanity < 40) {
    document.body.classList.add("low-sanity");
    whisper.volume = 0.6;
    whisper.play();
  }
  if (save.sanity < 20) {
    staticSound.play();
  }
}

// ================== GAME TEXT ==================
const text = document.getElementById("text");
const choices = document.getElementById("choices");

function showScene(image, narrative, options) {
  document.getElementById("sceneImage").src = image;
  text.innerText = narrative;
  choices.innerHTML = "";
  options.forEach(o => {
    let b = document.createElement("button");
    b.innerText = o.text;
    b.onclick = o.action;
    choices.appendChild(b);
  });
  sanityEffects();
  saveGame();
}

// ================== ENDINGS ==================
const endings = [
  {id:1, title:"THE TOWN KEEPS YOU", text:"You never leave. The streets learn your footsteps."},
  {id:2, title:"RADIO GOD", text:"The signal speaks in your voice now."},
  {id:3, title:"BURIED AWAKE", text:"They sealed the basement door. You are still screaming."},
  {id:4, title:"THE MIRROR BLINKED", text:"You blinked back. That was the mistake."},
  {id:5, title:"CHURCH OF STATIC", text:"The hymns are only noise. God does not answer."},
  // ...
];

// AUTO-GENERATE REMAINING ENDINGS (UNIQUE TEXT)
for(let i=6;i<=60;i++){
  endings.push({
    id:i,
    title:`ENDING ${i}`,
    text:`Quiet Hollow remembers ending ${i}. It remembers how you failed differently.`
  });
}

function unlockEnding(id) {
  if(!save.endings.includes(id)) {
    save.endings.push(id);
  }
  showEndingMenu();
}

function showEndingMenu() {
  document.getElementById("endingMenu").hidden = false;
  const list = document.getElementById("endingList");
  list.innerHTML = "";
  save.endings.forEach(e=>{
    const end = endings.find(x=>x.id===e);
    let li = document.createElement("li");
    li.innerText = `${end.title} — ${end.text}`;
    list.appendChild(li);
  });
  saveGame();
}

// ================== START ==================
showScene(
  "images/town/street.jpg",
  "The town is quiet. Too quiet. You hear breathing behind you.",
  [
    {text:"Go to the church", action:()=>save.location="church"},
    {text:"Enter the woods", action:()=>{save.sanity-=10}}
  ]
);
