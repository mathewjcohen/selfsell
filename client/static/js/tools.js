// *************************************************************************
// general functionality
// *************************************************************************

// *************************************************************************
// jsGcode functionality
// *************************************************************************

// grab inputs and buttons
let jsGcodeFacingDir = document.getElementById("jsGcodeFacingDir").value;
let jsGcodeFacingBit = document.getElementById("jsGcodeFacingBit").value;
let jsGcodeFacingWidth = document.getElementById("jsGcodeFacingWidth").value;
let jsGcodeFacingLength = document.getElementById("jsGcodeFacingLength").value;
let jsGcodeFacingOutput = document.getElementById("jsGcodeFacingOutput");

function updateVals(el) {
  switch (el.id) {
    case "jsGcodeFacingDir":
      jsGcodeFacingDir = document.getElementById("jsGcodeFacingDir").value;
      break;
    case "jsGcodeFacingBit":
      jsGcodeFacingBit = document.getElementById("jsGcodeFacingBit").value;
      break;
    case "jsGcodeFacingWidth":
      jsGcodeFacingWidth = document.getElementById("jsGcodeFacingWidth").value;
      break;
    case "jsGcodeFacingLength":
      jsGcodeFacingLength = document.getElementById("jsGcodeFacingLength")
        .value;
      break;
  }
}

document
  .getElementById("jsGcodeFacingDir")
  .addEventListener("change", function() {
    jsGcodeFacingDir = document.getElementById("jsGcodeFacingDir").value;
  });

document
  .getElementById("jsGcodeFacingBtn")
  .addEventListener("click", function() {
    if (jsGcodeFacingLength && jsGcodeFacingWidth) {
      formatGcodeForMarkup();
    } else {
      alert("error");
    }
  });

// set to prefered home coords
function homeXY() {
  const halfXwidth = jsGcodeFacingWidth / 2;
  return [`G0 X-${halfXwidth}`, "G0 Y0"];
}

// format generated gcode for markup
function formatGcodeForMarkup() {
  jsGcodeFacingOutput.innerHTML = "";
  generateGcode().forEach(line => {
    jsGcodeFacingOutput.innerHTML += `${line}`;
    jsGcodeFacingOutput.innerHTML += "\n";
  });
}

// generate gcode
function generateGcode() {
  let output = [];
  if (jsGcodeFacingDir == "X") {
    output.push(...xTravelCut());
  } else {
    output.push(...yTravelCut());
  }
  output.push(...homeXY());
  return output;
}

// generate gcode when xtravel is the facing cut
function xTravelCut() {
  let p = 0;
  let output = [];
  const halfXwidth = jsGcodeFacingWidth / 2;
  while (p < jsGcodeFacingLength - jsGcodeFacingBit) {
    output.push(`G0 X${halfXwidth}`); // move to X pos
    p += parseInt(jsGcodeFacingBit); // set new Y pos
    output.push(`G0 Y${p}`); // move to new Y pos
    output.push(`G0 X-${halfXwidth}`); // move to X pos
    p += parseInt(jsGcodeFacingBit); // set new Y pos
    output.push(`G0 Y${p}`); // move to new Y pos
    if (p > jsGcodeFacingLength - jsGcodeFacingBit) {
      // exit if at end of material
      return output;
    }
  }
  return output;
}

// generate gcode when ytravel is the facing cut
function yTravelCut() {
  let p = (jsGcodeFacingWidth / 2) * -1;
  let output = [];
  while (p < jsGcodeFacingWidth / 2 - jsGcodeFacingBit) {
    output.push(`G0 Y${jsGcodeFacingLength}`); // move Y pos end
    p += parseInt(jsGcodeFacingBit); // set new X pos
    output.push(`G0 X${p}`); // move to new X pos
    output.push(`G0 Y0`); // move to Y start
    p += parseInt(jsGcodeFacingBit); // set new X pos
    output.push(`G0 X${p}`); // move to new X pos
    if (p > jsGcodeFacingWidth / 2 - jsGcodeFacingBit) {
      output.push(`G0 Y${jsGcodeFacingLength}`); // move Y pos end
      // and exit if at end of material
      return output;
    }
  }
  return output;
}
