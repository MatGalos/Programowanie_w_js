import Note from './note.js';
export default class Ui{
    constructor(newNoteContainer = 'noteCreate', notesContainer = 'notesContainer'){
        this.mainContainer = document.getElementById(notesContainer);
        this.newNoteContainer = document.getElementById(newNoteContainer);
    }
    createNewNote(){
        const title = document.getElementById('noteTitle');
        const content = document.getElementById('noteContent');
        const note = new Note(title.value,content.value);
        title.value = '';
        content.value= '';
        return note;
    }
    removeNoteBtnClick(eventNoteId,notes){
        const noteIndex = this.getNoteIndex(eventNoteId,notes);
        notes.splice(noteIndex,1);
    }
    onPinnedClick(isPinned,noteId,notes){
        notes[this.getNoteIndex(noteId,notes)].pinned = !isPinned;
    }
    changeColor(noteColor,noteId,notes){
        notes[this.getNoteIndex(noteId,notes)].color = noteColor;
    }
    getNoteIndex(noteId,notes){
        return notes.findIndex(note=>note.id==noteId);
    }
    
}