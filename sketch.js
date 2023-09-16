
async function setup() {
  createCanvas(800, 1000);
  background(0);

  colorMode(HSB);

  console.log(320 % 360);
  let hueA = 50;
  let satA = 89;
  let briA = 97;

  let hueB = 224;
  let satB = 69;
  let briB = 54;

  let testRGBData = hsbToRgb(hueA, satA, briA);
  console.log(testRGBData);

  let colorA = color(hueA, satA, briA);
  let colorB = color(hueB, satB, briB);

  for (let i = 0; i < 400; i++) {
    let t = i / 400;

    let nowColor = lerpColor(colorA, colorB, t);
    fill(nowColor);
    noStroke();

    rect(200 + i, 200, 1, 60);
  }

  colorMode(RGB);
  let rA = 247;
  let gA = 210;
  let bA = 27;

  let rB = 43;
  let gB = 68;
  let bB = 138;

  colorA = color(rA, gA, bA);
  colorB = color(rB, gB, bB);

  for (let i = 0; i < 400; i++) {
    let t = i / 400;

    let nowColor = lerpColor(colorA, colorB, t);
    fill(nowColor);
    noStroke();

    rect(200 + i, 300, 1, 60);
  }



  for (let i = 0; i < 400; i++) {
    let t = i / 400;

    let nowR = lerp(rA, rB, t) + noise(i * 0.1, 111) * 60;
    let nowG = lerp(gA, gB, t) + noise(i * 0.1, 111.6) * 60;
    let nowB = lerp(bA, bB, t);

    fill(nowR, nowG, nowB);
    noStroke();

    rect(200 + i, 400, 1, 60);
  }


  colorMode(HSB);

  for (let i = 0; i < 400; i++) {
    let t = i / 400;

    let nowH = lerp(hueA, hueB, t);
    let nowS = lerp(satA, satB, t);
    let nowB = lerp(briA, briB, t) + - noise(i * 0.02) * 30;

    fill(nowH, nowS, nowB);
    noStroke();

    rect(200 + i, 500, 1, 60);
  }


  // let L1 = 85.49;
  // let C1 = 81.86;
  // let H1 = 88.48;

  // let L2 = 29.97;
  // let C2 = 43.85;
  // let H2 = 282.66;


  // colorMode(RGB);

  // for (let i = 0; i < 400; i++) {
  //   let t = i / 400;

  //   let nowL = 80;
  //   let nowC = 100;
  //   let nowH = lerp(0, 120, t);

  //   let rgbValues = lchToRgb(nowL, nowC, nowH);

  //   fill(rgbValues.r, rgbValues.g, rgbValues.b);
  //   noStroke();

  //   rect(200 + i, 400, 1, 60);
  // }
}

// async sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}