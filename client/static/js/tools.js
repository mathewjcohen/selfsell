// grab inputs and buttons
const jsGcodeFacingDir = document.getElementById("jsGcodeFacingDir");
const jsGcodeFacingBit = document.getElementById("jsGcodeFacingBit");
const jsGcodeFacingFeedrate = document.getElementById("jsGcodeFacingFeedrate");
const jsGcodeFacingWidth = document.getElementById("jsGcodeFacingWidth");
const jsGcodeFacingLength = document.getElementById("jsGcodeFacingLength");
const jsGcodeFacingOutput = document.getElementById("jsGcodeFacingOutput");
const jsGcodeFacingBtn = document
  .getElementById("jsGcodeFacingBtn")
  .addEventListener("click", function() {
    if (jsGcodeFacingLength.value && jsGcodeFacingWidth.value) {
      // jsGcodeFacingOutput.innerHTML = generateGcode();
      alert(`${generateGcode()}`);
    } else {
      alert("error");
    }
  });

function homeXY() {
  const halfXwidth = jsGcodeFacingWidth / 2;
  return [`G0 X-${halfXwidth}`, "G0 Y0"];
}

function generateGcode() {
  let p = 0;
  let fr = jsGcodeFacingFeedrate;
  let output = [];
  if (jsGcodeFacingDir.value == "X") {
    let dirTravel = jsGcodeFacingWidth / 2;
    output.push(...homeXY());
    alert(output);
    output.push(xTravel(dirTravel, fr, false));
    p += jsGcodeFacingBit; // advance diamter of bit for Y
    output.push(yTravel(p, fr, false));
    output.push(xTravel(dirTravel, fr, true));
    p += jsGcodeFacingBit; // advance diamter of bit for Y
    alert(output);
    alert(p);
    while (p < jsGcodeFacingLength.value) {
      output.push(xTravel(dirTravel, fr, false));
      p += jsGcodeFacingBit; // advance diamter of bit for Y
      output.push(yTravel(p, fr, false));
      output.push(xTravel(dirTravel, fr, true));
      p += jsGcodeFacingBit; // advance diamter of bit for Y
      alert(output);
    }
  } else {
    let dirTravel = jsGcodeFacingLength / 2;
    while (p < jsGcodeFacingWidth.value) {
      output.push(yTravel(dirTravel, fr, false));
      p += jsGcodeFacingBit; // advance diamter of bit for Y
      output.push(xTravel(p, fr, false));
      output.push(yTravel(dirTravel, fr, true));
      p += jsGcodeFacingBit; // advance diamter of bit for Y
      alert(output);
    }
  }
  output.push(...homeXY());
  console.log(output.join("&#13;"));
  // return output.join("&#13;");
}

function xTravel(amount, fr, neg) {
  if (neg === false) {
    return `G0 X${amount} F${fr}`;
  }
  return `G0 X-${amount} F${fr}`;
}
function yTravel(amount, fr, neg) {
  if (neg === false) {
    return `G0 Y${amount} F${fr}`;
  }
  return `G0 Y-${amount} F${fr}`;
}
