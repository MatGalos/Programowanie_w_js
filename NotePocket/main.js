
const lsNotesKey = 'notes';
// 1. how to store & save notes in local storage
const notes = [];
// json
const note = {
title: 'new note',
content: 'simple note',
colour: '#ff1455',
pinned: false,
createDate: new Date()
};
notes.push(note);
notes.push(note);
notes.push(note);
localStorage.setItem(lsNotesKey, JSON.stringify(notes));
// 2. read the notes from local storage
const notesFromLocalStorage = JSON.parse(localStorage.getItem(lsNotesKey));
const convertedNotes = notesFromLocalStorage.map( note => {
note.createDate = new Date(note.createDate);
return note;
});
// 3. html structure modify
// simple way
const notesContainer = document.querySelector('main');
// for (const note of convertedNotes) {
// notesContainer.innerHTML += `
// <section class="note">
// <h1>${note.title}</h1>
// <p>${note.content}</p>
// <time>${note.createDate.toLocaleString()}</time>
// <button>remove</button>
// </section>`;
// }
// full object way
for (const note of convertedNotes) {
const htmlNote = document.createElement('section');
const htmlTitle = document.createElement('h1');
const htmlContent = document.createElement('p');
const htmlTime = document.createElement('time');
const htmlButton = document.createElement('button');
htmlNote.classList.add('note');
htmlTitle.innerHTML = note.title;
htmlContent.innerHTML = note.content;
htmlTime.innerHTML = note.createDate.toLocaleString();
htmlButton.innerHTML = 'remove';
htmlButton.addEventListener('click', removeNote);
htmlNote.appendChild(htmlTitle);
htmlNote.appendChild(htmlContent);
htmlNote.appendChild(htmlTime);
htmlNote.appendChild(htmlButton);
notesContainer.appendChild(htmlNote);
}
//const nodeToRemove = document.querySelector('')
// notesContainer.removeChild(nodeToRemove);
function removeNote() {}
// 4. get value from html forms
document.querySelector('#newNoteBtn').addEventListener('click', onNewNote);
function onNewNote() {
const title = document.querySelector('#noteTitle').value;
const content = document.querySelector('#noteContent').value;
console.log(title, content);
}