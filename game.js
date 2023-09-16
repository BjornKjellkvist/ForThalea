var tb;
var btNext;
var lbText;
var port;
var imgPort;
var lbPort;
var background;
var startScreen;
var inv;

class conversation {
  constructor(array) {
    this.dialogs = array;
  }
  addDialog() {
    this.dialogs.push
  };
  dialogs
}

class dialog {
  constructor(name, text, portrait) {
    this.name = name;
    this.text = text;
    this.portrait = portrait;
  }
  name;
  text;
  portrait;
}

var act2 = [
  new dialog('test', 'test', 'port1'),
  new dialog('test2', 'test2', 'port1'),
];

var act1 = new dialog('test', 'test', 'port1');

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
  renderBackground('face3');
  renderTextbox();
  showText(act1);
  // showPortrait("port1", "Thalèa");
}

function next() {
  var text = "testwaef sadfwaewaeffwweaf eafweaf awefwaef awef"
  showText(text);
}

function showPortrait(img, name) {
  img = getURL(img);
  imgPort.src = img
  lbPort.innerHTML = name;
}

function getURL(path) {
  return (new URL("images/" + path + ".jpg", document.location)).href;
}

function renderTextbox() {
  tb.hidden = false;
}

function showText(dialog) {
  showPortrait(dialog.portrait, dialog.name)
  var textSpeed = 15;
  var resultat = "";
  lbText.text = "";
  var arr = dialog.text.split("");
  var promise = Promise.resolve();
  arr.forEach(e => {
    promise = promise.then(function () {
      resultat = resultat + e;
      lbText.innerHTML = resultat;
      return new Promise(function (resolve) {
        setTimeout(resolve, textSpeed);
      });
    });
  });
}

function renderBackground(img) {
  img = getURL(img);
  background.src = img;
}




