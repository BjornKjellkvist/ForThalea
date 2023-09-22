var tb;
var btNext;
var lbText;
var port;
var imgPort;
var lbPort;
var background;
var startScreen;
var inv;
var currentAct;
var currentLine;
var b1;
var b2;
var b3;
var buttons;

//#region classes
class conversation {
  constructor(array) {
    this.actions = array;
  }
  actions;
}

class dialog {
  constructor(person, text, portrait) {
    this.person = person;
    this.text = text;
    this.portrait = portrait;
  }
  person;
  text;
  portrait;
}

class nextAct {
  constructor(act) {
    this.act = act;
  }
  act;
}

class changeBackground {
  constructor(img) {
    this.img = img
  }
  img;
}

class audio {
  constructor(audio) {
    this.audio = audio;
  }
  audio;
}

class choices {
  constructor(options, text) {
    this.text = text;
    this.options = options;
  }
  options;
  text;
}

class choice {
  constructor(action, label) {
    this.action = action;
    this.label = label;
  }
  action;
  label;
}

class person {
  constructor(name, audio, portrait) {
    this.name = name;
    this.audio = audio;
    this.portrait = portrait;
  }
  name;
  audio;
  portrait;
}
//#endregion

var worm1 = new choice(e => { next(); hideButtons(); }, "Yes! Worm good!");
var worm2 = new choice(e => { startAct(act1Loss); hideButtons(); }, "No! (obviously wrong choice)");

var gameOver = new choice(e => { restart(); hideButtons(); }, "Restart");

var empanada1 = new choice(e => { startAct(act1Emp1); hideButtons(); }, 'Eat The empanada!');
var empanada2 = new choice(e => { startAct(act1Emp2); addToInventory("Empanada"); hideButtons(); }, 'Save The empanada for later');

var petDino1 = new choice(e => { startAct(act2Dino1); hideButtons(); }, 'Pet it');
var petDino2 = new choice(e => { next(); }, 'Dont pet it');

var bjorn = new person('Björn', [new Audio(getAudioURL('Bdialog1'))], [getImagesURL("Bport1"), getImagesURL("Bport2")]);
var thalea = new person('Thaléa', [new Audio(getAudioURL('Tdialog1'))], [getImagesURL("Tport1"), getImagesURL("Tport2")]);
var narator = new person('nar');
var coati = new person('Coati', [new Audio(getAudioURL('Cdialog1')), new Audio(getAudioURL('Cdialog2'))], [getImagesURL("Cport1"), getImagesURL("Cport2")]);

var act1 = new conversation([
  // new dialog(narator, "You find yourself at a bustling street"),
  // new dialog(narator, "You spot a familiar face in the crowd"),
  // new dialog(thalea, 'Hi my dude! how are you doing?', '0'),
  // new dialog(bjorn, "Sup, I'm good! Are you ready for the sick concert we are about to watch here at La Chispa wich we are at during our current trip to South America?", '0'),
  // new dialog(thalea, "I am super ready for this concert we are about to witness in my favorite street, La Chispa, located in my favorite country, Paraguay", '0'),
  // new dialog(narator, "You enjoy your time togheter at the open air concert"),
  // new dialog(narator, "Punk exudes from the speakers and your body is moving with the bass drum"),
  // new dialog(narator, "As the concerts comes to and you turn your head to ask he want to get a drink"),
  // new dialog(narator, "But before you can ask he interupts you"),
  // new dialog(narator, "..."),
  // new dialog(bjorn, "Hey, would you still want to be friends with me if I was turned into a worm?", '1'),
  // new dialog(thalea, "...You what? Turn into a worm? Like if you transformed right now?", '1'),
  // new dialog(bjorn, "Yea, if I turned into a work would you still be friends with me?", '0'),
  // new dialog(narator, "The question caughts you off guard, you have a very important choice to make"),
  // new choices([worm1, worm2], "How do you respond?"),
  // new dialog(thalea, "Of course, I would still like you! Whether you're a person or a worm, you'd still be the same wonderful friend to me.", '0'),
  // new dialog(thalea, "Our friendship isn't based on appearances or forms; it's about the connection we share and the bond we've built over time. So don't worry, I'd always like you just the way you are", 0),
  // new dialog(bjorn, "Thank you, you always know the right thing to say!", '1'),
  // new dialog(bjorn, "Say do you want to grab some food? I'll go get some Empanadas, you wait right here", '0'),
  // new dialog(narator, "Before you can say anything he storms off on his way to the empanada store, to buy empanadas"),
  // new dialog(thalea, "I wonder if he'll figure out the effectivo...", 0),
  // new dialog(bjorn, "Hey I got some empanadas for you! I hope you're hungry!", '1'),
  new choices([empanada1, empanada2], "Are you hungry?"),
]);

var act2 = new conversation([
  new dialog(narator, "A few days pass"),
  new changeBackground('bg2'),
  new dialog(narator, "After taking the night bus you arrive in Argentina"),
  new dialog(bjorn, "My legs! I'm so sore!", '0'),
  new dialog(thalea, "I have no idea what you are talking about and I cannot relate at all to your struggles", 0),
  new dialog(bjorn, "Sigh...", '1'),
  new dialog(thalea, "Hey let's go watch the falls!", 0),
  new dialog(narator, "You walk around the park watching the splendor of nature"),
  new dialog(narator, "You see beatiful birds and strange animals"),
  new dialog(thalea, "What are those? They are super cute!", 0),
  new dialog(narator, "You see a small cute mammal that reminds you of a small dinosour"),
  new dialog(narator, "It runs up to you looking at you with beady eyes"),
  new choices([petDino1, petDino2], "Try and pet the small animal"),
  new dialog(narator, "You decide to not pet it"),
  new dialog(narator, "The small animal scurries away looking for scraps"),
  new dialog(narator, "The rest of the trip is filled with scienic vistas of nature and water, you enjoy a great time watching the waterfalls"),
]);

var act2Dino1 = new conversation([
  new dialog(narator, "as you reach for the animal the empanada you carried in your pocket falls out"),
  new dialog(narator, "the mammal hurriedly picks up the fallen empanda and begins devouering it with great speed, you are flabbergasted at it's ability to consume food"),
  new dialog(narator, "It once again looks you in the eyes"),
  new dialog(coati, "Thank you stranger, My name is Coati, I am in your debt", '0'),
  new dialog(coati, "I can sense a strong power dwelling within you, and I am in need of a champion, what say you traveler? Will you accept my quest?", '0'),
  new dialog(bjorn, "Umm I'm not sure they're supposed to...", '0'),
  new dialog(thalea, "YES! we accept the quest!", 0),
  new dialog(bjorn, "talk..", '0'),
  new dialog(bjorn, "Oki, I guess this is what we're doing now", '0'),
  new dialog(thalea, "What must me do good sir?", 0),
  new dialog(narator, "You look at the animal named Coati as he pulls out a monical and a top hat, he gets ready to speak"),
  new dialog(coati, "*In a British accent* I must ask of you to find the three pieces of the scepter of dreams, it has been broken and scattered, we must recover it", '1'),
  new dialog(coati, "It is the only thing that can save us from the evil Baron von Chucklesnatch", '1'),
]);

var act2Dino2 = new conversation([
  new dialog(narator, "as you reach for the animal it runs away with it's tail in the air"),
]);

var act1Emp1 = new conversation([
  new audio(getAudioURL('eating1')),
  new dialog(narator, "You eat the empanada, it's of course very delicious"),
  new nextAct(act2),
]);

var act1Emp2 = new conversation([
  new dialog(narator, "You stuff the empanada in your pocket and save it for later"),
  new nextAct(act2),
]);

var act1Loss = new conversation([
  new dialog(thalea, "No, I don't really like worms...", '0'),
  new dialog(bjorn, ".... oh ok", '0'),
  new choices([gameOver], "GAME OVER"),
]);

//#region onload
window.onload = (event) => {
  tb = document.getElementById('tbContainer');
  btNext = document.getElementById('btNext');
  lbText = document.getElementById('lbText');
  imgPort = document.getElementById('imgPort');
  background = document.getElementById("bg");
  port = document.getElementById("port");
  lbPort = document.getElementById("lbPort");
  startScreen = document.getElementById("startScreen");

  b1 = document.getElementById("b1");
  b2 = document.getElementById("b2");
  b3 = document.getElementById("b3");
  buttons = [b1, b2, b3];
  inv = [];
}
//#endregion

function coatiQuest() {
  if (inv.includes("Empanada")) {
    removeFromInventory("Empanada");
    startAct(act2Dino1);
  }
  else {
    startAct(act2Dino2);
  }
}

function startGame() {
  startScreen.hidden = true;
  gameScreen.hidden = false;
  renderBackground('bg1');
  renderTextbox();
  startAct(act2Dino1);
}

function hideButtons() {
  buttons.forEach(element => {
    element.hidden = true;
  });
}

function restart() {
  startScreen.hidden = false;
  gameScreen.hidden = true;
}

function startAct(act) {
  btNext.disabled = false;
  currentAct = act;
  currentLine = 0;
  next();
}

function next() {
  if (currentAct.actions.length <= currentLine)
    return;
  var action = currentAct.actions[currentLine];
  currentLine++;

  if (action instanceof audio) {
    new Audio(action.audio).play();
    next();
  }
  if (action instanceof changeBackground) {
    renderBackground(action.img);
    next();
  }
  if (action instanceof nextAct) {
    startAct(action.act);
  }
  if (action instanceof dialog) {
    showText(action);
  }
  if (action instanceof choices) {
    showChoices(action);
  }
}

function showChoices(choices) {
  renderText(choices.text);
  btNext.disabled = true;
  for (const [i, choice] of choices.options.entries()) {
    var btn = buttons[i];
    btn.hidden = false;
    btn.innerHTML = choice.label;
    btn.onclick = choice.action;
  }
}

function showPortrait(dialog) {
  if (isNarrator(dialog)) {
    port.hidden = true;
    return;
  }
  img = dialog.person.portrait[dialog.portrait];
  imgPort.src = img
  lbPort.innerHTML = dialog.person.name;
  port.hidden = false;
}

function addToInventory(item) {
  inv.push(item);
}

function removeFromInventory(item) {
  if (inv.indexOf(item) !== -1)
    inv.splice(inv.indexOf(item), 1);
}

function getImagesURL(path) {
  return (new URL("images/" + path + ".jpg", document.location)).href;
}

function getAudioURL(path) {
  return (new URL("audio/" + path + ".mp3", document.location)).href;
}

function isNarrator(dialog) {
  return dialog.person.name === 'nar';
}

function getAudio(person) {
  var val = Math.floor(Math.random() * 100);
  if (person.audio.length === 1)
    return person.audio[0];
  if (val < 95) {
    console.log(1); return person.audio[0];
  }
  else {
    console.log(2); return person.audio[1];
  }
  // return person.audio[Math.floor(Math.random() * person.audio.length)];
}

function renderTextbox() {
  tb.hidden = false;
}

const timer = ms => new Promise(res => setTimeout(res, ms));

async function showText(dialog) {
  showPortrait(dialog);
  var textSpeed = 15;
  var resultat = "";
  lbText.text = "";
  var arr = dialog.text.split("");
  btNext.disabled = true;
  for (var i = 0; i < arr.length; i++) {
    e = arr[i];
    resultat = resultat + e;
    lbText.innerHTML = resultat;
    if (!isNarrator(dialog)) {
      getAudio(dialog.person).play();
    }
    await timer(textSpeed);
  }
  btNext.disabled = false;
}

function renderText(text) {
  lbText.innerHTML = text;
}

function renderBackground(img) {
  img = getImagesURL(img);
  background.src = img;
}
