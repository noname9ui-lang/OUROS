function updateTime() {
  const now = new Date();

  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString();

  document.querySelector("#timeElement").innerHTML = time + "<br>" + date;
}

var content = [
  {
    title: "Welcome",
    date: "2026-07-10",
    content: `
    <p class="noteTitle" contenteditable="True" style="font-weight:bold; font-size: 25px; width: 600px">Welcome</p>
    <p contenteditable="True">
    <span contenteditable="True">These are <b>OUR</b> notes.</span>
    </br>
    </br>
    </br>
    </br>
    </p>
    `
  },
]

updateTime();
setInterval(updateTime, 1000);

var currentNoteIndex = undefined;

var biggestIndex = 1;

var selectedIcon = undefined

var welcomeScreen = document.querySelector("#welcome")

var welcomeScreenClose = document.querySelector("#welcomeclose")

var welcomeScreenOpen = document.querySelector("#welcomeopen")

var manifestoIcon = document.querySelector("#manifesto-app")

var manifestoWindow = document.querySelector("#manifesto")

var manifestoClose = document.querySelector("#manifestoclose")

var communistNotesIcon = document.querySelector("#communistNotes-app")

var communistNotesWindow = document.querySelector("#communistNotes")

var communistNotesClose = document.querySelector("#communistNotesclose")

var communistNotesNewNote = document.querySelector("#communistNotesNewNote")

welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
  openWindow(welcomeScreen);
});

communistNotesIcon.addEventListener("click", function() {
  handleIconTap(communistNotesIcon, communistNotesWindow)
});

communistNotesNewNote.addEventListener("click", function() {
  newNote()
});

manifestoIcon.addEventListener("click", function() {
  handleIconTap(manifestoIcon, manifestoWindow)
});

function makeClosable(elementName) {
  var elementClose = document.querySelector("#" + elementName + "close");
  var elementWindow = document.querySelector("#" + elementName);

  elementClose.addEventListener("click", function() {
    closeWindow(elementWindow);
  });
}

function newNote() {
  content.unshift({
    title: "Title",
    date: new Date().toLocaleDateString(),
    content: `
    <p class="noteTitle" contenteditable="True" style="font-weight:bold; font-size: 25px;">Title</p>
    <p contenteditable="True">
    </br>
    </br>
    </br>
    </br>
    </br>
    </p>
    `
  })
  clearAllNotes()
  for (let i = 0; i < content.length; i++) {
    addNotesToTopBar(i)
  }
  currentNoteIndex = undefined;
  setNotesContent(0);
}

function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
}

function saveCurrentNote() {
  var notesContent = document.querySelector("#communistNotesWelcomeNote");

  if (currentNoteIndex !== undefined) {
    content[currentNoteIndex].content = notesContent.innerHTML;

    var title = notesContent.querySelector(".noteTitle");
    if (title) {
      content[currentNoteIndex].title = title.textContent;
    }
  }

  clearAllNotes();

  for (let i = 0; i < content.length; i++) {
    addNotesToTopBar(i);
  }
}

function setNotesContent(index) {

  if (currentNoteIndex !== undefined) {
    saveCurrentNote();
  }

  var notesContent = document.querySelector("#communistNotesWelcomeNote");

  notesContent.innerHTML = content[index].content;

  currentNoteIndex = index;
}

setNotesContent(0)

function addNotesToTopBar(index) {
  var NotesTopBar = document.querySelector("#notes");
  var note = content[index];
  var newDiv = document.createElement("div");

  newDiv.innerHTML = `
    <p style="margin: 0px;">
      ${note.title}
    </p>
    <p style="font-size: 12px; margin: 0px;">
      ${note.date}
    </p>
  `;
  newDiv.addEventListener("click", function() {
    setNotesContent(index);
  });
  NotesTopBar.appendChild(newDiv);
}

for (let i = 0; i < content.length; i++) {
  addNotesToTopBar(i)
}

function clearAllNotes() {
  var NotesTopBar = document.querySelector("#notes");
  while (NotesTopBar.firstChild) {
    NotesTopBar.removeChild(NotesTopBar.lastChild);
  }
}

function initializeWindow(elementName) {
  var screen = document.querySelector("#" + elementName)
  addWindowTapHandling(screen)
  makeClosable(elementName)
  dragElement(screen)
}

initializeWindow("manifesto")
initializeWindow("communistNotes")

addWindowTapHandling(welcomeScreen) 
//addWindowTapHandling(manifestoWindow) 
//addWindowTapHandling(communistNotesWindow)

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

function deleteNote(index) {
  content.splice(index,1)
  clearAllNotes();

  for (let i = 0; i < content.length; i++) {
    addNotesToTopBar(i);
  }
  currentNoteIndex = undefined;
  setNotesContent(0);
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
/*dragElement(document.getElementById("manifesto"));
dragElement(document.getElementById("communistNotes"));*/

function dragElement(element) {
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;
  var maxX = 100
  var maxY = 100

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
    console.log("currentX: "  + "currentY: ")
    console.log()
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
