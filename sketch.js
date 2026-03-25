let canvasSize, canvasX, canvasY;
let [mouseWasClicked, mouseWasDown, loadComplete, abortLoad] = Array(4).fill(
  false
);
let [loading, fakeLoading, loadFade, pageNum] = Array(4).fill(0);
let items = 147422;
let loaded = "";
let letters = ["A", "B", "C", "D", "E", "F", "G"];
let treble,
  bass,
  sharp,
  flat,
  natural,
  rest,
  flag,
  click,
  pass,
  fail,
  tap,
  keySig,
  clef,
  not,
  acc,
  answ,
  prevAns,
  col,
  beatShow,
  beat,
  lastBeat,
  countdown,
  rhythmIn,
  rhythmOut,
  lives,
  fade,
  lastPoint;
function loadScreen(name, type, size) {
  if (size) {
    loading += size;
  }
  let newFile =
    type +
    "://" +
    name +
    (type == "img" ? ".png" : type == "snd" ? ".mp3" : "");

  if (!abortLoad) {
    loaded = newFile;
  }
  if (!size) {
    abortLoad = true;
    console.error("Failed to load " + newFile);
  }
}
function drawLoad() {
  background(0);
  textSize(50);
  fill(255);
  text("Loading...", 200, 150);
  rect(25, 230, min((350 / items) * fakeLoading, 350), 20);
  textSize(20);
  if (abortLoad) {
    fill(255, 0, 0);
    text("ERROR LOADING FILE", 200, 330);
  }
  text(loaded, 200, 300);
  fill(255);
  textAlign(RIGHT, CENTER);
  textSize(15);
  blendMode(DIFFERENCE);
  let percentText = round(min((fakeLoading * 100) / items, 100));
  if (
    percentText == 100 &&
    !(round(fakeLoading) == loading && loading == items)
  ) {
    percentText--;
  }
  text(
    percentText + "%",
    constrain((350 / items) * fakeLoading + 23, 49, 373),
    241.2
  );
  blendMode(BLEND);
  fakeLoading =
    min(loading + 5000, items) +
    (fakeLoading - min(loading + 5000, items)) * pow(0.995, deltaTime);
  if (round(fakeLoading) == loading && loading == items) {
    textAlign(CENTER, CENTER);
    menuScreen();
    if (loadFade >= 255) {
      loadComplete = true;
    }
    loadFade += 0.255 * deltaTime;
  }
}
function setup() {
  canvasSize = constrain(windowWidth, 400, windowHeight);
  createCanvas(canvasSize, canvasSize);
  frameRate(60);
  angleMode(DEGREES);
  treble = loadImage(
    "/assets/img/treble.png",
    function () {
      loadScreen("treble", "img", 30642);
    },
    function () {
      loadScreen("treble", "img", 0);
    }
  );
  bass = loadImage(
    "/assets/img/bass.png",
    function () {
      loadScreen("bass", "img", 15558);
    },
    function () {
      loadScreen("bass", "img", 0);
    }
  );
  sharp = loadImage(
    "/assets/img/sharp.png",
    function () {
      loadScreen("sharp", "img", 2909);
    },
    function () {
      loadScreen("sharp", "img", 0);
    }
  );
  flat = loadImage(
    "/assets/img/flat.png",
    function () {
      loadScreen("flat", "img", 3246);
    },
    function () {
      loadScreen("flat", "img", 0);
    }
  );
  natural = loadImage(
    "/assets/img/natural.png",
    function () {
      loadScreen("natural", "img", 23704);
    },
    function () {
      loadScreen("natural", "img", 0);
    }
  );
  rest = loadImage(
    "/assets/img/rest.png",
    function () {
      loadScreen("rest", "img", 3570);
    },
    function () {
      loadScreen("rest", "img", 0);
    }
  );
  flag = loadImage(
    "/assets/img/flag.png",
    function () {
      loadScreen("flag", "img", 20004);
    },
    function () {
      loadScreen("flag", "img", 0);
    }
  );
  click = new Audio("/assets/snd/click.mp3");
  function clickYes() {
    loadScreen("click", "snd", 2013);
    click.removeEventListener("canplaythrough", clickYes);
    click.removeEventListener("canplaythrough", clickNo);
  }
  function clickNo() {
    loadScreen("click", "snd", 0);
    click.removeEventListener("canplaythrough", clickYes);
    click.removeEventListener("canplaythrough", clickNo);
  }
  click.addEventListener("canplaythrough", clickYes);
  click.addEventListener("error", clickNo);
  pass = new Audio("/assets/snd/pass.mp3");
  function passYes() {
    loadScreen("pass", "snd", 25001);
    pass.removeEventListener("canplaythrough", passYes);
    pass.removeEventListener("canplaythrough", passNo);
  }
  function passNo() {
    loadScreen("pass", "snd", 0);
    pass.removeEventListener("canplaythrough", passYes);
    pass.removeEventListener("canplaythrough", passNo);
  }
  pass.addEventListener("canplaythrough", passYes);
  pass.addEventListener("error", passNo);
  fail = new Audio("/assets/snd/fail.mp3");
  function failYes() {
    loadScreen("fail", "snd", 14011);
    fail.removeEventListener("canplaythrough", failYes);
    fail.removeEventListener("canplaythrough", failNo);
  }
  function failNo() {
    loadScreen("fail", "snd", 0);
    fail.removeEventListener("canplaythrough", failYes);
    fail.removeEventListener("canplaythrough", failNo);
  }
  fail.addEventListener("canplaythrough", failYes);
  fail.addEventListener("error", failNo);
  tap = new Audio("/assets/snd/tap.mp3");
  function tapYes() {
    loadScreen("tap", "snd", 6764);
    tap.removeEventListener("canplaythrough", tapYes);
    tap.removeEventListener("canplaythrough", tapNo);
  }
  function tapNo() {
    loadScreen("tap", "snd", 0);
    tap.removeEventListener("canplaythrough", tapYes);
    tap.removeEventListener("canplaythrough", tapNo);
  }
  tap.addEventListener("canplaythrough", tapYes);
  tap.addEventListener("error", tapNo);
}
function menuScreen() {
  background(255, loadFade);
  stroke(0, loadFade);
  strokeWeight(3);
  for (let l = 0; l < 2; l++) {
    fill(255);
    if (loadComplete) {
      if (
        canvasX >= 125 &&
        canvasX <= 275 &&
        canvasY >= 120 + 135 * l &&
        canvasY <= 200 + 135 * l
      ) {
        cursor(HAND);
        fill(220);
        if (mouseIsPressed && mouseButton == "left") {
          fill(200);
        }
        if (mouseWasClicked) {
          playSound(click);
          document
            .querySelector("footer")
            .style.setProperty("animation-name", "hide");
          document.querySelector("footer").style.setProperty("left", "100%");
          document
            .querySelector("footer")
            .style.setProperty("bottom", "-100px");
          document
            .querySelector("footer > a")
            .style.setProperty("pointer-events", "none");
          if (l) {
            countdown = lives = 3;
            beatShow = beat = lastBeat = fade = 0;
            newRhythm();
            pageNum = 2;
          } else {
            generateCard();
            answ = [0, 0];
            prevAns = "";
            col = color(0, 0, 0);
            pageNum = 1;
          }
        }
      }
    } else {
      noFill();
    }
    rect(125, 120 + 135 * l, 150, 80, 10);
  }
  noStroke();
  fill(0, loadFade);
  textSize(39);
  text("Music Theory Review", 200, 60);
  textSize(25);
  text("Pitch\nPractice", 200, 160);
  text("Rhythm\nReview", 200, 295);
  textSize(15);
  text("Read the note on the staff and determine its pitch", 200, 225);
  text("Tap the spacebar to the rhythm of the notes on the staff", 200, 360);
}
function backButton() {
  stroke(0);
  strokeWeight(3);
  fill(255);
  if (canvasX >= 10 && canvasX <= 90 && canvasY >= 10 && canvasY <= 60) {
    cursor(HAND);
    fill(220);
    if (mouseIsPressed && mouseButton == "left") {
      fill(200);
    }
    if (mouseWasClicked) {
      playSound(click);
      document
        .querySelector("footer")
        .style.setProperty("animation-name", "show");
      document
        .querySelector("footer")
        .style.setProperty("left", "calc(100% - 105px)");
      document.querySelector("footer").style.setProperty("bottom", "5px");
      document
        .querySelector("footer > a")
        .style.setProperty("pointer-events", "auto");
      pageNum = 0;
    }
  }
  rect(10, 10, 80, 50, 8);
  noStroke();
  fill(0);
  textSize(25);
  textAlign(CENTER, CENTER);
  text("Back", 50, 35);
}
function generateCard() {
  clef = "bass";
  if (random() < 0.5) {
    clef = "treble";
  }
  keySig = round(6 * sq(random()));
  if (random() < 0.5) {
    keySig *= -1;
  }
  not = round(10 * sq(random()) + 4);
  if (random() < 0.5) {
    not = 8 - not;
  }
  acc = null;
  if (random() < 0.25) {
    acc = -1;
    if (random() < 0.5) {
      acc = 1;
    }
    let lett = 6 - 2 * toNote(not);
    if (round((keySig + lett - 7 * round(lett / 7)) / 7) == acc) {
      acc = 0;
    }
  }
}
function toLine(note) {
  note *= -1;
  note -= 7 * floor((note - (keySig < 0) - 1) / 7);
  if (clef == "treble") {
    note -= 2;
  }
  return note;
}
function toNote(lin) {
  lin *= -1;
  if (clef == "treble") {
    lin -= 2;
  }
  lin -= 7 * floor(lin / 7);
  return lin;
}
function accidental(sign, x, y) {
  push();
  translate(x, y);
  if (sign == 1) {
    image(sharp, -29.5, -30, 80, 60);
  }
  if (sign == -1) {
    image(flat, -8.5, -35, 23, 50);
  }
  if (sign == 0) {
    image(natural, -7.5, -30, 15, 60);
  }
  pop();
}
function note(loc, sign) {
  stroke(0);
  let side = abs(loc - 4) / (loc - 4);
  for (let l = 3 * side + 2; side * l <= (side * loc) / 2; l += side) {
    if (abs(l) > 100) {
      break;
    }
    line(260, 20 * l + 100, 290, 20 * l + 100);
  }
  noStroke();
  fill(0);
  push();
  translate(275, 10 * loc + 100);
  push();
  rotate(-33);
  ellipse(0, 0, 20, 17);
  pop();
  stroke(0);
  if (loc > 4) {
    line(9, -2.5, 9, -60);
  } else {
    line(-9, 2.5, -9, 60);
  }
  accidental(sign, -27.5, 0);
  pop();
}
function staff() {
  if (clef == "treble") {
    image(treble, 15, 63, 93.875, 160);
  } else {
    image(bass, 15, 61, 103, 145.5);
  }
  for (let i = 0; i < abs(keySig); i++) {
    let I = (4 * i * abs(keySig)) / keySig + 5;
    if (keySig < 0) {
      I += 10;
    }
    I -= 7 * floor(I / 7);
    accidental(abs(keySig) / keySig, 15 * i + 110, 10 * toLine(I) + 100);
  }
  stroke(0);
  for (let l = 0; l < 5; l++) {
    line(25, 20 * l + 100, 375, 20 * l + 100);
  }
  line(24.5, 100, 24.5, 180);
  line(375.5, 100, 375.5, 180);
  note(not, acc);
}
function anwer() {
  noFill();
  stroke(0);
  strokeWeight(3);
  rect(50, 265, 300, 80, 4);
  for (let d = -1; d <= 1; d += 2) {
    fill(255);
    if (
      canvasX >= 145 &&
      canvasX <= 194 &&
      canvasY >= 290 - 18.75 * d &&
      canvasY <= 320 - 18.75 * d
    ) {
      cursor(HAND);
      fill(200);
      if (mouseWasClicked) {
        playSound(click);
        answ[0] += d;
        answ[0] -= 7 * floor(answ[0] / 7);
      }
    }
    rect(145, 290 - 18.75 * d, 49, 30, 10);
    fill(255);
    if (
      canvasX >= 223 + 23 * d &&
      canvasX <= 263 + 23 * d &&
      canvasY >= 270 &&
      canvasY <= 340
    ) {
      cursor(HAND);
      fill(200);
      if (mouseWasClicked) {
        playSound(click);
        if (d == answ[1]) {
          answ[1] = 0;
        } else {
          answ[1] = d;
        }
      }
    }
    rect(223 + 23 * d, 270, 40, 70, 10);
  }
  fill(255);
  if (canvasX >= 292 && canvasX <= 344 && canvasY >= 270 && canvasY <= 340) {
    cursor(HAND);
    fill(200);
    if (mouseWasClicked) {
      playSound(click);
      check();
    }
  }
  rect(292, 270, 52, 70, 10);
  noStroke();
  fill(0);
  textSize(60);
  textAlign(LEFT, BASELINE);
  text(letters[answ[0]], 65, 325);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("↑", 169.5, 286.25);
  text("↓", 169.5, 323.75);
  textAlign(LEFT, BASELINE);
  fill(col);
  text("The previous card's answer was: " + prevAns, 45, 380);
  fill(0);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("✓", 318, 305);
  textAlign(LEFT, BASELINE);
  accidental(answ[1] || null, 125, 305);
  accidental((answ[1] == -1) - 1, 220, 308);
  accidental(1 - (answ[1] == 1), 266, 308);
}
function check() {
  let n1 = toNote(not);
  let a1 = acc;
  let lett = 6 - 2 * n1;
  if (a1 == null) {
    a1 = round((keySig + lett - 7 * round(lett / 7)) / 7);
  }
  let p1 = 2 * n1 - floor((n1 + 1) / 3) + a1;
  if (p1 == -1) {
    p1 = 11;
  }
  let p2 = 2 * answ[0] - floor((answ[0] + 1) / 3) + answ[1];
  if (p2 == -1) {
    p2 = 11;
  }
  prevAns = letters[n1] + (a1 == 1 ? "♯" : a1 == -1 ? "♭" : "");
  if (p1 == p2) {
    playSound(pass);
    col = color(0, 255, 0);
  } else {
    playSound(fail);
    col = color(255, 0, 0);
  }
  generateCard();
}
function newRhythm() {
  rhythmIn = [];
  rhythmOut = Array(8).fill(0);
  for (let n = 0; n < 2; n++) {
    let halfMeasure = [];
    for (let N = 0; N < 2; N++) {
      let beat = [1, 0];
      if (random() < 0.5) {
        beat[1]++;
      }
      halfMeasure = halfMeasure.concat(beat);
    }
    if (random() < 0.25) {
      if (random() < 0.5) {
        halfMeasure[0] = 0;
        halfMeasure[1] = 0;
      } else {
        halfMeasure[2] = 0;
      }
    }
    rhythmIn = rhythmIn.concat(halfMeasure);
  }
}
function nthRest(nu) {
  if (nu == -1) {
    image(rest, 0, -55, 38, 68.4);
    return;
  }
  noStroke();
  fill(0);
  ellipse(0, -35, 10, 10);
  strokeWeight(2);
  stroke(0);
  noFill();
  arc(0, -48, 34, 34, 49, 90);
  line(11, -35, -1, -1.25);
  strokeWeight(1);
}
function noteHead(coun) {
  push();
  for (let i = 1; i <= coun; i++) {
    noStroke();
    fill(0);
    push();
    rotate(-33);
    ellipse(0, 0, 20, 17);
    pop();
    stroke(0);
    line(9, -2.5, 9, -60);
    translate(0, 20);
    if (i >= 2) {
      break;
    }
  }
  pop();
}
function dot() {
  noStroke();
  fill(0);
  ellipse(15, -6, 6, 6);
}
function bar(neg) {
  neg = neg || 1;
  noStroke();
  fill(0);
  rect(9, -60, 44 * neg, 10);
}
function nthFlag() {
  image(flag, 8.5, -60, 18.9, 57.55);
}
function heart(x, y, s, fil) {
  push();
  translate(x, y - s * (sqrt(0.03125) + 0.25));
  for (let n = -1; n < 2; n += 2) {
    if (fil) {
      noStroke();
      fill(255, 0, 0, fil * 255);
      arc((n * s) / 4, s / 4, s / 2, s / 2, -n * 135, 180 - 135 * n);
      push();
      rotate(90 - 45 * n);
      rect(s * (sqrt(0.125) - 0.25), 0, s / 2, s * (n * sqrt(0.125) - 0.25));
      pop();
    }
    stroke(0);
    strokeWeight(2);
    noFill();
    arc((n * s) / 4, s / 4, s / 2, s / 2, -n * 135, 180 - 135 * n);
    line(
      n * s * (0.25 - sqrt(0.03125)),
      s * (0.25 - sqrt(0.03125)),
      0,
      s * (0.5 - sqrt(0.125))
    );
    line(
      n * s * (sqrt(0.03125) + 0.25),
      s * (0.25 + sqrt(0.03125)),
      0,
      s * (0.5 + sqrt(0.125))
    );
  }
  pop();
}
function checkX(check, x, y, s, fil) {
  push();
  translate(x, y);
  scale(s / 200);
  noFill();
  for (let i = 0; i < 2; i++) {
    strokeWeight(10 - 5 * i);
    if (check) {
      stroke(0, 136 + 119 * i, 0, fil * 255);
      beginShape();
      vertex(100, -80);
      vertex(-100 / 3, 80);
      vertex(-100, 0);
      endShape();
    } else {
      stroke(136 + 119 * i, 0, 0, fil * 255);
      for (let j = -1; j < 2; j += 2) {
        line(j * 100, -100, -j * 100, 100);
      }
    }
  }
  pop();
}
function rhythmGame() {
  if (lives > 0) {
    countdown -= deltaTime / 750;
    if (countdown <= 0) {
      lastBeat = beat;
      beat += (deltaTime * (80 + floor(beat / 8))) / 60000;
      if (floor(beat / 8) > floor(lastBeat / 8)) {
        beat +=
          deltaTime / 60000 +
          (8 * floor(beat / 8) - lastBeat) / (80 + floor(lastBeat / 8));
      }
      while (beatShow < beat) {
        beatShow++;
        playSound(tap);
      }
    }
    push();
    let sign = abs(4 - (beat % 8)) / (4 - (beat % 8)) || 0;
    translate(
      0,
      80 * sign * (1 / (1 - 0.8 * pow(abs((beat % 8) / 4 - 1), 5 / 3)) - 1)
    );
    for (let L = 0; L < 2; L++) {
      stroke(0);
      for (let l = 0; l < 5; l++) {
        line(20, 20 * l + 100 + 120 * L, 380, 20 * l + 100 + 120 * L);
      }
      line(19.5, 100 + 120 * L, 19.5, 180 + 120 * L);
      line(380.5, 100 + 120 * L, 380.5, 180 + 120 * L);
      let rhythm = L ? rhythmOut : rhythmIn;
      push();
      translate(0, 160 + 120 * L);
      for (let half = 0; half < 2; half++) {
        if (
          rhythm[4 * half + 1] &&
          !rhythm[4 * half + 2] &&
          rhythm[4 * half + 3]
        ) {
          push();
          translate(35 + 176 * half, 0);
          if (rhythm[4 * half]) {
            noteHead(rhythm[4 * half]);
            nthFlag();
          } else {
            nthRest();
          }
          translate(44, 0);
          noteHead(rhythm[4 * half + 1]);
          translate(88, 0);
          noteHead(rhythm[4 * half + 3]);
          nthFlag();
          pop();
        } else if (
          rhythm[4 * half] &&
          !rhythm[4 * half + 1] &&
          !rhythm[4 * half + 2] &&
          rhythm[4 * half + 3]
        ) {
          push();
          translate(35 + 176 * half, 0);
          noteHead(rhythm[4 * half]);
          dot();
          translate(132, 0);
          noteHead(rhythm[4 * half + 3]);
          nthFlag();
          pop();
        } else {
          for (let quarter = 0; quarter < 2; quarter++) {
            push();
            translate(35 + 176 * half + 88 * quarter, 0);
            if (rhythm[4 * half + 2 * quarter]) {
              noteHead(rhythm[4 * half + 2 * quarter]);
              if (rhythm[4 * half + 2 * quarter + 1]) {
                bar(1);
                translate(44, 0);
                noteHead(rhythm[4 * half + 2 * quarter + 1]);
              }
            } else if (rhythm[4 * half + 2 * quarter + 1]) {
              nthRest();
              translate(44, 0);
              noteHead(rhythm[4 * half + 2 * quarter + 1]);
              nthFlag();
            } else {
              translate(11, 0);
              nthRest(-1);
            }
            pop();
          }
        }
      }
      pop();
      stroke(200, 0, 0);
      strokeWeight(3);
      let l = constrain(50 * ((beat % 8) - 8 * L) * (4 - (beat % 8)), 0, 50);
      if (l) {
        line(
          20 + 90 * (beat % 8) - 360 * L,
          140 + 120 * L - l,
          20 + 90 * (beat % 8) - 360 * L,
          140 + 120 * L + l
        );
      }
      strokeWeight(1);
    }
    pop();
    if (mouseWasDown) {
      let res = (((round(lastBeat * 2 - 0.2) / 2) % 8) - 4) * 2;
      if (res >= 0 && res < 8) {
        rhythmOut[res]++;
      }
    }
    if (floor(lastBeat / 8) != floor(beat / 8)) {
      let matches = true;
      for (let b in rhythmIn) {
        if (rhythmIn[b] != rhythmOut[b]) {
          matches = false;
          break;
        }
      }
      if (matches) {
        playSound(pass);
        fade = 1;
        lastPoint = true;
      } else {
        playSound(fail);
        fade = 1;
        lastPoint = false;
        lives--;
      }
      newRhythm();
    }
  }
  for (let i = 0; i < 3; i++) {
    heart(380 - 35 * i, 18, 30, i == lives && !lastPoint ? fade : i < lives);
  }
  if (lives <= 0) {
    let inv = 255 - 255 * max(fade, 0);
    fill(255, 0, 0, inv);
    textSize(100);
    text("GAME\nOVER", 200, 200);
    textSize(30);
    fill(0, inv);
    text("Score: " + floor(lastBeat / 8), 200, 193);
  }
  checkX(lastPoint, 200, 200, 100 + 150 * fade, fade);
  noStroke();
  if (ceil(countdown) > 0) {
    fill(0);
    textSize(50 * sq(countdown - floor(countdown)) + 150);
    text(ceil(countdown), 200, 200);
  } else if (countdown > -3) {
    fill(0, 255 + 85 * countdown);
    textSize(100 * pow(2, countdown + 1));
    text("GO", 200, 200);
  }
  fade -= deltaTime / 500;
}
function draw() {
  noStroke();
  cursor(ARROW);
  textFont("Arial");
  textAlign(CENTER, CENTER);
  canvasX = (mouseX * 400) / canvasSize;
  canvasY = (mouseY * 400) / canvasSize;
  push();
  scale(canvasSize / 400);
  if (loadComplete) {
    if (pageNum) {
      if (pageNum > 1) {
        background(255);
        rhythmGame();
      } else {
        background(255);
        staff();
        anwer();
      }
      backButton();
    } else {
      menuScreen();
    }
  } else {
    cursor(WAIT);
    drawLoad();
  }
  pop();
  mouseWasClicked = mouseWasDown = false;
}
function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
function mouseClicked() {
  if (mouseButton == "left") {
    mouseWasClicked = true;
  }
}
function mousePressed() {
  if (mouseButton == "left") {
    mouseWasDown = true;
  }
}
function keyPressed() {
  if (keyCode == 32) {
    mouseWasDown = true;
  }
}
function windowResized() {
  canvasSize = constrain(windowWidth, 400, windowHeight);
  resizeCanvas(canvasSize, canvasSize);
}