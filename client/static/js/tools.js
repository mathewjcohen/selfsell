// *************************************************************************
// general functionality
// *************************************************************************

// *************************************************************************
// jsGcode functionality
// *************************************************************************

// grab inputs and buttons
let jsGcodeFacingDir = document.getElementById("jsGcodeFacingDir").value;
const jsGcodeFacingBit = document.getElementById("jsGcodeFacingBit").value;
const jsGcodeFacingWidth = document.getElementById("jsGcodeFacingWidth").value;
const jsGcodeFacingLength = document.getElementById("jsGcodeFacingLength")
  .value;
const jsGcodeFacingOutput = document.getElementById("jsGcodeFacingOutput");

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
  let output = [];
  const halfXwidth = jsGcodeFacingWidth / 2;
  while (p < jsGcodeFacingLength) {
    output.push(`G0 X${halfXwidth}`); // move to X pos
    p += parseInt(jsGcodeFacingBit); // set new Y pos
    output.push(`G0 Y${p}`); // move to new Y pos
    output.push(`G0 X-${halfXwidth}`); // move to X pos
    p += parseInt(jsGcodeFacingBit); // set new Y pos
    output.push(`G0 Y${p}`); // move to new Y pos
    if (p > jsGcodeFacingLength) {
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
  let currentPos = 0;
  while (p < jsGcodeFacingWidth / 2) {
    output.push(`G0 Y${jsGcodeFacingLength}`); // move Y pos end
    p += parseInt(jsGcodeFacingBit); // set new X pos
    output.push(`G0 X${p}`); // move to new X pos
    output.push(`G0 Y0`); // move to Y start
    p += parseInt(jsGcodeFacingBit); // set new X pos
    output.push(`G0 X${p}`); // move to new X pos
    if (p > jsGcodeFacingWidth / 2) {
      output.push(`G0 Y${jsGcodeFacingLength}`); // move Y pos end
      // and exit if at end of material
      return output;
    }
  }
  return output;
}
