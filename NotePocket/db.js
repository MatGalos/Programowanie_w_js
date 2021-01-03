export default class Db {
    constructor() {
        this.lsNotesKey = 'notes';
    }
    saveNotes(notes) {
        localStorage.setItem(this.lsNotesKey, JSON.stringify(notes));
    }
    getNotes() {
        // check if localStorage has item this.lsNotesKey
        return JSON.parse(localStorage.getItem(this.lsNotesKey));
    }
    checkForNullResponse(){
        if(localStorage.getItem(this.lsNotesKey) === null)
            return false;
        else
            return true;
    }
}