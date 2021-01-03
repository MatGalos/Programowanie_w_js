import Note from './note.js';
export default class NotesUI {
    constructor(containerSelector = 'notesContainer',newNote='noteCreate') {
        this.notesContainer = document.getElementById(containerSelector);
        this.newNoteCreate=document.getElementById(newNote);
    }
    createNote(){
        const title=document.getElementById('noteTitle');
        const content=document.getElementById('noteContent');
        const note= new Note(title.value, content.value);
        title.value = '';
        content.value= '';
        return note;
    }
    removeNote(eventNoteId,notes) {
        const noteIndex = this.getNoteIndex(eventNoteId,notes);
        notes.splice(noteIndex,1);
    }
    onPinnedClick(isPinned,noteId,notes){
        notes[this.getNoteIndex(noteId,notes)].pinned = !isPinned;
    }
    getNoteIndex(noteId,notes){
        return notes.findIndex(note=>note.id==noteId);
    }

    changeColor(noteColor,noteId,notes){
        notes[this.getNoteIndex(noteId,notes)].color = noteColor;
    }
}
