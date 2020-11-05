class NotesUI {
    constructor(containerSelector = 'section') {
        this.notesContainer = document.querySelector(containerSelector);
    }
    addNote(note) {
        const htmlNote = this.createNote(note);
        const container = this.getNotesContainer();
        container.appendChild(htmlNote);
    }
    createNote(note) {
        const htmlNote = document.createElement('div');
        htmlNote.classList.add('note');
        // do all the things with notehtml object - create title, content ...
        return htmlNote;
    }
    removeNote(id) {
        const note = this.getNote(id);
        const container = this.getNotesContainer();
        container.removeChild(note);
    }
    getNote(id) {
        return document.querySelector('#' + id);
    }
    getNotesContainer() {
        return this.notesContainer;
    }
}
