import Notes from './notes.js';
const notatki=new Notes();
document.addEventListener('DOMContentLoaded', () => {    
    notatki.renderNotes();}
);
document.getElementById('newNoteBtn').addEventListener('click', ()=>notatki.addNote());