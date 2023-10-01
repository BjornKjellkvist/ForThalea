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

var textSpeed;
var volume;
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

var gameOver = new choice(e => { restart(); hideButtons(); }, "Restart");

var bjorn = new person('Björn', [new Audio(getAudioURL('Bdialog1'))], [getImagesURL("Bport1"), getImagesURL("Bport2")]);
var thalea = new person('Thaléa', [new Audio(getAudioURL('Tdialog1'))], [getImagesURL("Tport1"), getImagesURL("Tport2")]);
var narrator = new person('nar');
var coati = new person('Coati', [new Audio(getAudioURL('Cdialog1')), new Audio(getAudioURL('Cdialog2'))], [getImagesURL("Cport1"), getImagesURL("Cport2")]);


//#region act1
var worm1 = new choice(e => { next(); hideButtons(); }, "Yes! Worm good!");
var worm2 = new choice(e => { startAct(act1Loss); hideButtons(); }, "No! (obviously wrong choice)");
var empanada1 = new choice(e => { startAct(act1Emp1); hideButtons(); }, 'Eat The empanada!');
var empanada2 = new choice(e => { startAct(act1Emp2); addToInventory("Empanada"); hideButtons(); }, 'Save The empanada for later');

var act1 = new conversation([
  new dialog(narrator, "You find yourself at a bustling street"),
  new dialog(narrator, "You spot a familiar face in the crowd"),
  new dialog(thalea, 'Hi my dude! how are you doing?', 0),
  new dialog(bjorn, "Sup, I'm good! Are you ready for the sick concert we are about to watch here at La Chispa which we are at during our current trip to South America?", 0),
  new dialog(thalea, "I am super ready for this concert we are about to witness in my favorite street, La Chispa, located in my favorite country, Paraguay", 0),
  new dialog(narrator, "You enjoy your time together at the open air concert"),
  new dialog(narrator, "Punk exudes from the speakers and your body is moving with the bass drum"),
  new dialog(narrator, "As the concerts comes to and you turn your head to ask he want to get a drink"),
  new dialog(narrator, "But before you can ask he interrupts you"),
  new dialog(narrator, "..."),
  new dialog(bjorn, "Hey, would you still want to be friends with me if I was turned into a worm?", 1),
  new dialog(thalea, "...You what? Turn into a worm? Like if you transformed right now?", 1),
  new dialog(bjorn, "Yea, if I turned into a work would you still be friends with me?", 0),
  new dialog(narrator, "The question caught you off guard, you have a very important choice to make"),
  new choices([worm1, worm2], "How do you respond?"),
  new dialog(thalea, "Of course, I would still like you! Whether you're a person or a worm, you'd still be the same wonderful friend to me.", 0),
  new dialog(thalea, "Our friendship isn't based on appearances or forms; it's about the connection we share and the bond we've built over time. So don't worry, I'd always like you just the way you are", 0),
  new dialog(bjorn, "Thank you, you always know the right thing to say!", 1),
  new dialog(bjorn, "Say do you want to grab some food? I'll go get some empanadas, you wait right here", 0),
  new dialog(narrator, "Before you can say anything he storms off on his way to the empanada store, to buy empanadas"),
  new dialog(thalea, "I wonder if he'll figure out the effectivo...", 0),
  new dialog(bjorn, "Hey I got some empanadas for you! I hope you're hungry!", 1),
  new choices([empanada1, empanada2], "Are you hungry?"),
]);

var act1Emp1 = new conversation([
  new audio(getAudioURL('eating1')),
  new dialog(narrator, "You eat the empanada, it's of course very delicious"),
  new nextAct(act2),
]);

var act1Emp2 = new conversation([
  new dialog(narrator, "You stuff the empanada in your pocket and save it for later"),
  new nextAct(act2),
]);

var act1Loss = new conversation([
  new dialog(thalea, "No, I don't really like worms...", 0),
  new dialog(bjorn, ".... oh ok", 0),
  new choices([gameOver], "GAME OVER"),
]);
//#endregion

//#region act2
var petDino1 = new choice(e => { startAct(act2Dino1); hideButtons(); }, 'Pet it');
var petDino2 = new choice(e => { next(); }, 'Don\'t pet it');

var act2 = new conversation([
  new dialog(narrator, "A few days pass"),
  new changeBackground('bg2'),
  new dialog(narrator, "After taking the night bus you arrive in Argentina"),
  new dialog(bjorn, "My legs! I'm so sore!", 0),
  new dialog(thalea, "I have no idea what you are talking about and I cannot relate at all to your struggles", 0),
  new dialog(bjorn, "Sigh...", 1),
  new dialog(thalea, "Hey let's go watch the falls!", 0),
  new dialog(narrator, "You walk around the park watching the splendor of nature"),
  new dialog(narrator, "You see beautiful birds and strange animals"),
  new dialog(thalea, "What are those? They are super cute!", 0),
  new dialog(narrator, "You see a small cute mammal that reminds you of a small dinosaur"),
  new dialog(narrator, "It runs up to you looking at you with beady eyes"),
  new choices([petDino1, petDino2], "Try and pet the small animal"),
  new dialog(narrator, "You decide to not pet it"),
  new dialog(narrator, "The small animal scurries away looking for scraps"),
  new dialog(narrator, "The rest of the trip is filled with scenic vistas of nature and water, you enjoy a great time watching the waterfalls"),
  new choices([gameOver], "Ending 1/X"),
]);

var act2Dino1 = new conversation([
  new dialog(narrator, "as you reach for the animal the empanada you carried in your pocket falls out"),
  new dialog(narrator, "the mammal hurriedly picks up the fallen empanda and begins devouring it with great speed, you are flabbergasted at it's ability to consume food"),
  new dialog(narrator, "It once again looks you in the eyes"),
  new dialog(coati, "Thank you stranger, My name is Coati, I am in your debt", 0),
  new dialog(coati, "I can sense a strong power dwelling within you, and I am in need of a champion, what say you traveler? Will you accept my quest?", 0),
  new dialog(bjorn, "Umm I'm not sure they're supposed to...", 0),
  new dialog(thalea, "YES! we accept the quest!", 0),
  new dialog(bjorn, "talk..", 0),
  new dialog(bjorn, "Oki, I guess this is what we're doing now", 0),
  new dialog(thalea, "What must me do good sir?", 0),
  new dialog(narrator, "You look at the animal named Coati as he pulls out a monical and a top hat, he gets ready to speak"),
  new dialog(coati, "*In a British accent* I must ask of you to find the three pieces of the scepter of dreams, it has been broken and scattered, we must recover it", 1),
  new dialog(coati, "It is the only thing that can save us from the evil Baron von Chucklesnatch", 1),
  new dialog(narrator, "You feel a strong sense of duty fill you as you embark on your quest to defeat the evil Baron von Chucklesnatch"),
  new dialog(thalea, "Do you have any idea where the pieces are?", 0),
  new dialog(coati, "The crystal that powers the staff was supposed to be delivered to me via Colombian, but the sailboat it was transported on sank on the coast near a small town called Santa Marta", 1),
  new dialog(coati, "Please go forth to the coast and retrieve the crystal, we are counting on you!", 1),
  new nextAct(act3)

  // new dialog(coati, "We have a lead that the base of the staff is in the mythical city of \"Prague\" in the hidden country of \"Czech Republic\"", 1),
]);

var act2Dino2 = new conversation([
  new dialog(narrator, "as you reach for the animal it runs away with it's tail in the air"),
  new dialog(bjorn, "I don't know if we're supposed to pet them", 0),
  new dialog(thalea, "This is the closest I'll ever come to a real dinosaur, do you really want to rob me of this experience?", 0),
  new dialog(bjorn, "What if it's poisonous?", 0),
  new dialog(thalea, "I think you mean venomous, unless you think I'm going to bite it.", 0),
  new dialog(bjorn, "I've seen what you eat for breakfast...", 1),
  new choices([gameOver], "Ending 2/X"),
]);

function coatiQuest() {
  if (inv.includes("Empanada")) {
    removeFromInventory("Empanada");
    startAct(act2Dino1);
  }
  else {
    startAct(act2Dino2);
  }
}
//#endregion

//#region act3
var act3 = new conversation([
  new changeBackground('bgact31'),
  new dialog(bjorn, "So we're suppose to just search the entire coast of this place?", 0),
  new dialog(bjorn, "At least it's pretty to look at", 1),
  new dialog(thalea, "I think the first thing we need to do is getting a diving license!", 0),
  new dialog(bjorn, "Doesn't that like a week to do?", 0),
  new dialog(thalea, "I'm sure we can do it in two days!", 0),
  new dialog(bjorn, "...", 1),
  new dialog(bjorn, "We're going to have to cram for the test aren't we?", 1),
  new dialog(thalea, `Oh it will be easy, I've done this before, all you  had to do is
  imagine you've got an exam demain, and you're feeling a bit overwhelmed. First things first, prioritize your topics. Choisissez les sujets les plus importants, the ones that are likely to show up on the test. Don't waste time on les petits détails.
Now, create a study plan, or "un plan d'étude." Divide your remaining time into smaller sessions. Il vaut mieux étudier en petites doses than trying to cram all at once. Ça aide à mieux retenir.
When you're studying, don't just read passively. Use active learning. Écrivez des notes, créez des fiches de révision, or even talk to yourself à haute voix. This helps reinforce your memory.
Condense your information, or "réduisez l'information." Summarize complex concepts into simple notes or "cartes mentales." C'est plus facile à mémoriser.
Don't forget to review past assignments, quizzes, or "examens antérieurs." Ils peuvent vous donner une idée des types de questions à prévoir.
Study with friends if possible. Former un groupe d'étude can be très utile. Expliquer les concepts aux autres can improve your understanding.
Find a quiet place, sans distractions. Éliminez les distractions comme les téléphones et les médias sociaux. Restez concentré.
Take breaks, or "faites des pauses." Un peu de repos every 30-45 minutes keeps your brain fresh. Profitez-en pour boire de l'eau et manger sainement.
Stay positive, or "restez positif." Avoir une mentalité positive helps with concentration.
N'oubliez pas de dormir! Essayez d'obtenir quelques heures de sommeil réparateur. Même a short nap, or "une petite sieste," can improve your focus.
Voilà! These strategies can help you make the most of your last-minute study session, but remember that cramming should be a last resort. Prévoyez bien à l'avance for your exams, and stay organized to avoid the stress of last-minute cramming. Bonne chance avec vos études!
`, 1),
  new dialog(bjorn, "...", 0),
  new dialog(bjorn, "Hey do you wanna get ice cream?", 1),
  new dialog(thalea, "Yes! Wait what were we talking about?", 0),


]);
//#region act4
var act4 = new conversation([
  new changeBackground('bg'),
  new dialog(narrator, "You arrive back in Europe after a long distance flight, you set your sights for Prague"),
  new dialog(narrator, "You dash towards the connecting flight managing to get to it just in time before the gate closing"),
  new dialog(narrator, "The queue is just about to dissipate through terminal gate"),
  new dialog(thalea, "Phew, thank god! we barely made it!", 0),
  new dialog(bjorn, "what are you talking about we had lots of time! there were even minutes left!", 1),
  new dialog(thalea, "You know one day you're going to get punished for being last minute", 1),
  new dialog(bjorn, "It's a connecting flight, we had no time. what do you want me to do about it?", 1),
  new dialog(thalea, "Maybe you didn't have to look at the boarder shop for 20 minutes?", 0),
  new dialog(thalea, "Or stop at the coffee shop for a Latte and Donut?", 0),
  new dialog(thalea, "Or pet the dog for 5 minutes?", 0),
  new dialog(bjorn, "But it was a very cute dog!", 0),
  new dialog(thalea, "Yea, it was a very cute dog", 1),
  new dialog(narrator, "You board the flight, and spend the rest of your time discussing the cuteness of the dog"),
  new changeBackground('bg'),
  new dialog(bjorn, "Aaah, finally arrived in Prague", 1),
  new dialog(thalea, "The air is so nice!", 0),
  new dialog(bjorn, "Also you have the rest of the directions right?", 1),
  new dialog(thalea, "Haha, funny joke, I know you have them", 0),
  new dialog(bjorn, "What no? He clearly gave them to you", 1),
  new dialog(thalea, "Wait so the only directions we have so far is go to Prague...?", 0),
  new dialog(bjorn, "I'm sure we'll figure it out, let's just go in a random direction", 0),
  new dialog(thalea, "I don't think we have a better plan", 0),
  new dialog(narrator, "You wander through the city"),
  new dialog(narrator, "As you aimlessly stroll through the city center you enter upon a square"),
  new dialog(bjorn, "Hey look! tents! I'm sure they're some kind of fun festival, we should go check it out!", 0),
  new dialog(narrator, "With no other lead you head towards the tents"),
  new changeBackground('bg'),
  new dialog(bjorn, "It's a beer festival, just our luck!", 0),
  new dialog(thalea, "How is this our luck?", 1),
  new dialog(bjorn, "I mean it has to be destiny at this point no?", 1),
  new dialog(narrator, "After entering you spot a fountain in the middle of the square, no water flowing through it"),
  new dialog(narrator, "You spot something in the fountain, glimmering"),

]);
//#endregion

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

function startGame() {
  startScreen.hidden = true;
  gameScreen.hidden = false;
  textSpeed = document.getElementById('textSpeed').value;
  volume = document.getElementById('volume').value;
  renderBackground('bg1');
  renderTextbox();
  startAct(act3);
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
  var result = "";
  lbText.text = "";
  var arr = dialog.text.split("");
  btNext.disabled = true;
  for (var i = 0; i < arr.length; i++) {
    e = arr[i];
    result = result + e;
    lbText.innerHTML = result;
    if (!isNarrator(dialog)) {
      var audio = getAudio(dialog.person);
      audio.volume = (volume * 10) / 100;
      audio.play();
    }
    if (textSpeed > 0)
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
