var magnets = document.querySelectorAll(".magnetic");
var strength = 40;

magnets.forEach((magnet) => {
  magnet.addEventListener("mousemove", moveMagnet);
  magnet.addEventListener("mouseout", function (event) {
    gsap.to(event.currentTarget, 1, { x: 0, y: 0, ease: Power4.easeOut });
  });
});

function moveMagnet(event) {
  var magnetButton = event.currentTarget;
  var bounding = magnetButton.getBoundingClientRect();

  //console.log(magnetButton, bounding)

  gsap.to(magnetButton, 1, {
    x:
      ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.5) *
      strength,
    y:
      ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.5) *
      strength,
    ease: Power4.easeOut,
  });

  //magnetButton.style.transform = 'translate(' + (((( event.clientX - bounding.left)/(magnetButton.offsetWidth))) - 0.5) * strength + 'px,'+ (((( event.clientY - bounding.top)/(magnetButton.offsetHeight))) - 0.5) * strength + 'px)';
}
let coordinates = {
  x: 0,
  y: 0,
};
document.addEventListener("dragstart", dragStart);

function dragStart(event) {
  console.log(event);
  if (event?.target?.classList?.contains("image")) {
    event?.dataTransfer?.setData("text/plain", event?.target?.id);
    return;
  }
  event.dataTransfer.setData("text/plain", event?.target?.parentElement?.id);
  event.target.parentElement.style.border = "1px solid yellow";
  document.body.style.cursor = "grabbing";
}

window.addEventListener("dragover", (e) => {
  e.preventDefault();
});

window.addEventListener("drop", (event) => {
  var draggedElementId = event.dataTransfer.getData("text/plain");
  var draggedElement = document.getElementById(draggedElementId);
  draggedElement.style.position = "fixed";
  draggedElement.style.left = coordinates.x + "px";
  draggedElement.style.top = coordinates.y + "px";
  draggedElement.style.border = "none";

  event.target.appendChild(draggedElement);
});

window.addEventListener("drag", (event) => {
  coordinates.x = event.clientX;
  coordinates.y = event.clientY;
});

window.onload = () => {
  // alert("Everthing on this page is Magnetic and Draggable \nEvent the text");
};

document.querySelectorAll("a").forEach((elem) => {
  elem.onclick = () => {
    window.open(elem.getAttribute("data-href"), "_blank");
  };
});
// use this for glassmorphism and blur circles;
