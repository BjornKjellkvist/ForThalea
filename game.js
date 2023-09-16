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

class conversation {
  constructor(array) {
    this.dialogs = array;
  }
  changeBackground() {
  };
  dialogs
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

var bjorn = new person('Björn', [new Audio(getAudioURL('Bdialog1'))], ["Bport1", "Bport2"]);
var thalea = new person('Thaléa', [new Audio(getAudioURL('Tdialog1'))], ["Tport1", "Tport2"]);
var narator = new person('nar');

var act1 = new conversation([
  new dialog(narator, "You find yourself at a bustling street"),
  new dialog(narator, "You find yourself at a bustling street"),
  new dialog(thalea, 'Hi my dude! how are you doing?', '0'),
  new dialog(bjorn, "Sup, I'm good! Are you ready for the sick concert we are about to watch here at La Chispa wich we are at during our current trip to South America?", '0'),
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
  if (currentAct.dialogs.length <= currentLine)
    return;
  var dialog = currentAct.dialogs[currentLine];
  currentLine++;
  showText(dialog);
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

function renderTextbox() {
  tb.hidden = false;
}

function isNarrator(dialog) {
  return dialog.person.name === 'nar';
}

function getAudio(person) {
  return person.audio[Math.floor(Math.random() * person.audio.length)];
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
