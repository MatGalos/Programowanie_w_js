class Notes {
    constructor(containerSelector) {
        this.notesArr = [];
        this.db = new Db();
        this.notesUI = new NotesUI(containerSelector);
    }

    addNote(note) {
        this.notesArr.push(note);
        this.db.saveNotes(this.notesArr);
        this.notesUI.addNote(note);
    }
    removeNote(id) {
        this.notesArr = this.notesArr.filter(el => el.id !== id);
        // this.notesArr.findeIndex, then this.notesArr.splice        
        this.db.saveNotes(this.notesArr);
        this.notesUI.removeNote(id);
    }

    getNote(id) {
        return this.notesArr.find(el => el.id === id);
    }

    getNotes() {
        return [...this.notesArr];
    }
}