const state = JSON.parse(localStorage.getItem("qh_save")) || {
  health:100,
  sanity:100,
  inventory:[],
  location:"Town Square",
  visited:{},
  endings:[]
};

const locations = [
  "Town Square","Abandoned School","Radio Tower","Forest Road",
  "Motel","Hospital","Church","Library","Police Station","Underground"
];

const endings = [
  {id:1,title:"You Were Always Alone",text:"The town empties instantly. Every footprint is yours. The radio repeats your name until it forgets it."},
  {id:2,title:"Missing Poster",text:"You find yourself stapled to corkboards. The poster says 'HAVE YOU SEEN THIS PERSON?' The face is wrong."},
  {id:3,title:"Buried Broadcast",text:"You shut down the tower. Years later, static still hums beneath your skin."},
  {id:4,title:"The Town Sleeps",text:"Everyone lies down at once. You wake up decades later. Nothing decayed except you."},
  {id:5,title:"Sanity Zero",text:"Reality peels like paint. You realize sanity was the hallucination."},
  {id:6,title:"Inventory Full",text:"Every item screams at once. You understand they were people."},
  {id:7,title:"Hospital Lights",text:"Monitors beep long after hearts are gone. Yours joins the rhythm."},
  {id:8,title:"The Priest Knows",text:"He calls you by a name never spoken aloud."},
  {id:9,title:"Library Index",text:"You are cataloged between local myths and building permits."},
  {id:10,title:"Radio Host",text:"You take the mic. The voices finally listen."},
  {id:11,title:"The Map Is Wrong",text:"Every road leads to where you started. The town apologizes."},
  {id:12,title:"Fog Accepted You",text:"You dissolve quietly. No one notices the difference."},
  {id:13,title:"False Ending",text:"The credits roll early. Something laughs."},
  {id:14,title:"Police Report",text:"The file closes. Case status: Never Existed."},
  {id:15,title:"Locked Room",text:"You were inside before the door was built."},
  {id:16,title:"School Bell",text:"It rings once. Everyone stands. No one leaves."},
  {id:17,title:"Forest Listens",text:"Trees repeat your memories better than you do."},
  {id:18,title:"Motel Checkout",text:"Your room is gone. The key still fits your hand."},
  {id:19,title:"Hospital Basement",text:"Something breathes using your lungs."},
  {id:20,title:"Church Choir",text:"They sing your future in past tense."},
  {id:21,title:"Static Marriage",text:"You vow yourself to the signal."},
  {id:22,title:"Underground Exit",text:"The ladder goes up forever."},
  {id:23,title:"Town Census",text:"Population: 1. It updates when you blink."},
  {id:24,title:"Library Burn",text:"The books scream facts you never learned."},
  {id:25,title:"Radio Silence",text:"No voices. Worse."},
  {id:26,title:"Map Completion",text:"Fog retreats. Something underneath moves."},
  {id:27,title:"Inventory Empty",text:"You realize what was taken."},
  {id:28,title:"Motel TV",text:"You wave. The screen waves back late."},
  {id:29,title:"Church Confession",text:"The booth answers first."},
  {id:30,title:"School Locker",text:"Your childhood knocks from inside."},
  {id:31,title:"Hospital Discharge",text:"You are cured of being alive."},
  {id:32,title:"Forest Exit",text:"The trees keep you."},
  {id:33,title:"Police Sirens",text:"They chase something wearing you."},
  {id:34,title:"Underground Choir",text:"Below the town, everyone remembers."},
  {id:35,title:"Static Skin",text:"Your reflection flickers."},
  {id:36,title:"Map Erased",text:"You cannot leave what was never drawn."},
  {id:37,title:"Radio Numbers",text:"They spell your death slowly."},
  {id:38,title:"Inventory Voice",text:"One item whispers forgiveness."},
  {id:39,title:"Hospital Birth",text:"You are born backwards."},
  {id:40,title:"Church Lock-In",text:"The doors open inward."},
  {id:41,title:"Library Basement",text:"The index leads to you."},
  {id:42,title:"Town Reset",text:"Morning. Again."},
  {id:43,title:"Forest Mirror",text:"The trees blink."},
  {id:44,title:"Motel Guestbook",text:"You signed every page."},
  {id:45,title:"Police Radio",text:"Your thoughts dispatch themselves."},
  {id:46,title:"Underground Door",text:"It opens when you forget why."},
  {id:47,title:"Static Heaven",text:"No pain. No signal."},
  {id:48,title:"Map Lies",text:"North points to you."},
  {id:49,title:"Final Broadcast",text:"You warn no one."},
  {id:50,title:"Inventory God",text:"Objects pray to you."},
  {id:51,title:"Hospital Loop",text:"You wake up already discharged."},
  {id:52,title:"Church Silence",text:"God left a note."},
  {id:53,title:"Library Rewrite",text:"History corrects itself."},
  {id:54,title:"Forest Burial",text:"Roots knit you in."},
  {id:55,title:"Motel Vacancy",text:"The sign flickers YOUR NAME."},
  {id:56,title:"Police Closure",text:"Everything resolved."},
  {id:57,title:"Underground Sun",text:"It rises below."},
  {id:58,title:"Static Smile",text:"The signal thanks you."},
  {id:59,title:"True Ending",text:"You remember. Quiet Hollow fades."},
  {id:60,title:"Developer Ending",text:"You were always the player."}
];

function save() {
  localStorage.setItem("qh_save",JSON.stringify(state));
}

function unlockEnding(id){
  if(!state.endings.includes(id)){
    state.endings.push(id);
    save();
    alert("ENDING UNLOCKED");
  }
}

function updateSanity(n){
  state.sanity+=n;
  if(state.sanity<30){
    document.body.classList.add("low-sanity");
    document.getElementById("overlay").style.opacity=0.2;
    playVoice();
  }
  save();
}

function playVoice(){
  const v=document.getElementById("voice");
  v.src="assets/audio/whisper.mp3";
  v.playbackRate=0.7+Math.random()*0.3;
  v.play();
}

// Simple example trigger
if(state.sanity<=0){
  unlockEnding(5);
}
