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
  changeBackground() {
  };
  actions
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

var worm1 = new choice(e => { alert('test1'); }, "Yes! Worm good!");
var worm2 = new choice(e => { alert('test2'); }, "No! (obviously wrong choice)");

var bjorn = new person('Björn', [new Audio(getAudioURL('Bdialog1'))], ["Bport1", "Bport2"]);
var thalea = new person('Thaléa', [new Audio(getAudioURL('Tdialog1'))], ["Tport1", "Tport2"]);
var narator = new person('nar');

var act1 = new conversation([
  // new dialog(narator, "You find yourself at a bustling street"),
  // new dialog(narator, "You spot a familiar face in the crowd"),
  // new dialog(thalea, 'Hi my dude! how are you doing?', '0'),
  // new dialog(bjorn, "Sup, I'm good! Are you ready for the sick concert we are about to watch here at La Chispa wich we are at during our current trip to South America?", '0'),
  // new dialog(thalea, "I am super ready for this concert we are about to witness in my favorite street, La Chispa, located in my favorite country, Paraguay", '0'),
  // new dialog(narator, "You enjoy your time togheter at the open air concert"),
  // new dialog(narator, "Time passes..."),
  // new dialog(narator, "..."),
  // new dialog(bjorn, "Hey, would you still want to be friends with me if I was turned into a worm?", '1'),
  // new dialog(thalea, "...You what? turn into a worm? Like if you transformed right now?", '1'),
  // new dialog(bjorn, "Yea, if I turned into a work would you still be friends with me?", '0'),
  new dialog(narator, "The question caughts you off guard, you have a very important choice to make"),
  new choices([worm1, worm2], "What will you choose?"),
]);

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
  inv = new Array;
}

function startGame() {
  startScreen.hidden = true;
  gameScreen.hidden = false;
  renderBackground('bg1');
  renderTextbox();
  startAct(act1);
  next();
}

function startAct(act) {
  btNext.disabled = false;
  currentAct = act;
  currentLine = 0;
}

function next() {
  if (currentAct.actions.length <= currentLine)
    return;
  var action = currentAct.actions[currentLine];
  currentLine++;
  if (action instanceof dialog) {
    showText(action);
  }
  if (action instanceof choices) {
    showChoices(action);
  }
}

function showChoices(choices) {
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
  img = getImagesURL(dialog.person.portrait[dialog.portrait]);
  imgPort.src = img
  lbPort.innerHTML = dialog.person.name;
  port.hidden = false;
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
  return person.audio[Math.floor(Math.random() * person.audio.length)];
}

function renderTextbox() {
  tb.hidden = false;
}

function showText(dialog) {
  showPortrait(dialog);
  var textSpeed = 15;
  var resultat = "";
  lbText.text = "";
  var arr = dialog.text.split("");
  var promise = Promise.resolve();
  arr.forEach(e => {
    promise = promise.then(function () {
      resultat = resultat + e;
      lbText.innerHTML = resultat;
      if (!isNarrator(dialog)) {
        getAudio(dialog.person).play();
      }
      return new Promise(function (resolve) {
        setTimeout(resolve, textSpeed);
      });
    });
  });
}

function renderBackground(img) {
  img = getImagesURL(img);
  background.src = img;
}
