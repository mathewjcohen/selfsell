// *************************************************************************
// general functionality
// *************************************************************************

// *************************************************************************
// jsGcode functionality
// *************************************************************************

// grab inputs and buttons
let jsGcodeFacingDir = document.getElementById("jsGcodeFacingDir").value;
document
  .getElementById("jsGcodeFacingDir")
  .addEventListener("change", function() {
    jsGcodeFacingDir = document.getElementById("jsGcodeFacingDir").value;
  });
const jsGcodeFacingBit = document.getElementById("jsGcodeFacingBit").value;
const jsGcodeFacingFeedrate = document.getElementById("jsGcodeFacingFeedrate")
  .value;
const jsGcodeFacingWidth = document.getElementById("jsGcodeFacingWidth").value;
const jsGcodeFacingLength = document.getElementById("jsGcodeFacingLength")
  .value;
const jsGcodeFacingOutput = document.getElementById("jsGcodeFacingOutput");
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
    let p = document.createElement("p");
    p.innerHTML = `${line}`;
    jsGcodeFacingOutput.appendChild(p);
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
  let fr = jsGcodeFacingFeedrate;
  let output = [];
  const halfXwidth = jsGcodeFacingWidth / 2;
  while (p < jsGcodeFacingLength) {
    output.push(`G0 X${halfXwidth} F${fr}`); // move to X pos
    p += parseInt(jsGcodeFacingBit); // set new Y pos
    if (p > jsGcodeFacingWidth) {
      return output;
    }
    output.push(`G0 Y${p} F${fr}`); // move to new Y pos
    output.push(`G0 X-${halfXwidth} F${fr}`); // move to X pos
    p += parseInt(jsGcodeFacingBit); // set new Y pos
    if (p > jsGcodeFacingWidth) {
      return output;
    }
    output.push(`G0 Y${p} F${fr}`); // move to new Y pos
  }
  return output;
}

// generate gcode when ytravel is the facing cut
function yTravelCut() {
  let p = (jsGcodeFacingWidth / 2) * -1;
  let fr = jsGcodeFacingFeedrate;
  let output = [];
  while (p <= jsGcodeFacingWidth) {
    output.push(`G0 Y${jsGcodeFacingLength} F${fr}`); // move Y pos end
    p += parseInt(jsGcodeFacingBit); // set new X pos
    if (p > jsGcodeFacingWidth) {
      return output;
    }
    output.push(`G0 X${p} F${fr}`); // move to new X pos
    output.push(`G0 Y0 F${fr}`); // move to Y start
    p += parseInt(jsGcodeFacingBit); // set new X pos
    if (p > jsGcodeFacingWidth) {
      return output;
    }
    output.push(`G0 X${p} F${fr}`); // move to new X pos
  }
  return output;
}
