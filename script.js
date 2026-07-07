function updateTime() {
  const now = new Date();

  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString();

  document.querySelector("#timeElement").innerHTML = time + "<br>" + date;
}

updateTime();
setInterval(updateTime, 1000);

var biggestIndex = 1;

var selectedIcon = undefined

var welcomeScreen = document.querySelector("#welcome")

var welcomeScreenClose = document.querySelector("#welcomeclose")

var welcomeScreenOpen = document.querySelector("#welcomeopen")

var manifestoIcon = document.querySelector("#manifesto-app")

var manifestoWindow = document.querySelector("#manifesto")

var manifestoClose = document.querySelector("#manifestoclose")

var communistNotesIcon = document.querySelector("#communist-notes-app")

var communistNotesWindow = document.querySelector("#communist-notes")

var communistNotesClose = document.querySelector("#communist-notesclose")

welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
  openWindow(welcomeScreen);
});

communistNotesIcon.addEventListener("click", function() {
  handleIconTap(communistNotesIcon, communistNotesWindow)
});

communistNotesClose.addEventListener("click", function() {
  closeWindow(communistNotesWindow)
})

manifestoIcon.addEventListener("click", function() {
  handleIconTap(manifestoIcon, manifestoWindow)
});

manifestoClose.addEventListener("click", function() {
  closeWindow(manifestoWindow)
})

function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
}

addWindowTapHandling(welcomeScreen) 
addWindowTapHandling(manifestoWindow) 
addWindowTapHandling(communistNotesWindow)

function handleWindowTap(element){
  biggestIndex++;
  element.style.zIndex = biggestIndex
  elementheader = element.id + "header";
  elementheader.style.zIndex = biggestIndex+1;
  deselectIcon(selectedIcon)
}

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element
} 

function deselectIcon(element) {
  element.classList.remove("selected");
  selectedIcon = undefined
} 

function closeWindow(element) {
  element.style.display = "none"
}

function openWindow(element) {
  element.style.display = "block"
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  elementheader = element.id + "header";
  elementheader.style.zIndex = biggestIndex+1;
}

function handleIconTap(icon, appWindow) {
  if (icon.classList.contains("selected")) {
    deselectIcon(icon)
    openWindow(appWindow)
  }
  else {
    selectIcon(icon)
  }
}

dragElement(document.getElementById("welcome"));
dragElement(document.getElementById("manifesto"));
dragElement(document.getElementById("communist-notes"));

function dragElement(element) {
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  if (document.getElementById(element.id + "header")) {
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
