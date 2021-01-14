import Db from './db.js';
import NotesUI from './notes-ui.js';
export default class Notes{
    constructor(){
        this.notes = [];
        this.db = new Db();
        this.ui = new NotesUI();
    }

    addNote(){
        const note = this.ui.createNewNote();
        this.notes.push(note);
        this.synchronizeLs();
    }

    synchronizeLs(){
        this.db.saveNotes(this.notes);
        this.renderNotes();
    }

    removeCurrentNotesFromHtml(){
        const notesContainer = document.getElementById('notesContainer');
        const childs = Array.from(notesContainer.childNodes);
        for(const child of childs){
            notesContainer.removeChild(child);
        }
    }

    renderNotes(){
        this.notes = [];
        if(this.db.checkForNullResponse()){
            this.notes = this.db.getNotes();
            this.removeCurrentNotesFromHtml();
            this.sortNotes();
            this.addNotesToHtml();
        }
    }

    sortNotes(){
        const earlierDate = (a,b) =>{
            if(a.date === b.date)
                return 0;
            else if(a.date < b.date)
                return 1;
            else 
                return -1;
        };
        const pinnedFirst = (a,b) => {
            if(a.pinned === b.pinned)
                return 0;
            else if(a.pinned === true && b.pinned === false)
                return -1;
            else   
                return 1;
        };
        this.notes.sort(earlierDate);
        this.notes.sort(pinnedFirst);
    }

    addNotesToHtml(){
        for(const note of this.notes){
            this.createHtmlNote(note);
        }
    }

    createHtmlNote(note){
        const notesContainer = document.getElementById('notesContainer');
        const isPinned = note.pinned?'pinned':'unpinned';
        const htmlNote = document.createElement('section');
        htmlNote.id= note.id;
        htmlNote.classList.add('note', note.color, isPinned);
        const htmltitle = document.createElement('h1');
        htmltitle.innerHTML = note.title;
        const htmlContent = document.createElement('p');
        htmlContent.innerHTML = note.content;
        const htmlTime = document.createElement('time');
        const datex = new Date(note.date); 
        htmlTime.innerHTML = 'Created '+ datex.toLocaleString();
        const htmlColorChange = this.createPalette(note.color,note.id);
        htmlColorChange.classList.add('paletteHolder');
        const pinnedArea = this.createPinnedCheck(note.pinned,note.id);
        const htmlButton = document.createElement('button');
        htmlButton.innerHTML = 'Remove';
        htmlButton.addEventListener('click',()=> {
            this.ui.removeNoteBtnClick(note.id, this.notes);
            this.synchronizeLs();
        });
        htmlNote.appendChild(htmltitle);
        htmlNote.appendChild(htmlContent);
        htmlNote.appendChild(htmlTime);
        htmlNote.appendChild(htmlColorChange);
        htmlNote.appendChild(pinnedArea);
        htmlNote.appendChild(htmlButton);
        console.log('adding to html:',htmlNote);
        notesContainer.appendChild(htmlNote);
    }

    createPalette(noteColor,noteId){
        const blue = document.createElement('div');
        const green=document.createElement('div');
        const red = document.createElement('div');
        const violet = document.createElement('div');
        blue.classList.add('blue', 'palette');
        red.classList.add('red', 'palette');
        violet.classList.add('violet', 'palette');
        green.classList.add('green', 'palette');
        
        switch(noteColor){
        case 'blue':
            blue.classList.add('chosenColor');
            break;
        case 'red':
            red.classList.add('chosenColor');
            break;
        case 'violet':
            violet.classList.add('chosenColor');
            break;
        case 'green':
            green.classList.add('chosenColor');
            break;
        }
        const colors = [];
        const palette = document.createElement('div');
        colors.push(blue,red,violet,green);
        for(const col of colors){
            palette.appendChild(col);
            col.addEventListener('click',()=>{
                this.ui.changeColor(col.classList[0],noteId,this.notes);
                this.synchronizeLs();
            });
        }
        return palette;
    }
    
    createPinnedCheck(isPinned,noteId){
        const pinnedAreaDiv = document.createElement('div');
        pinnedAreaDiv.classList.add('pinnedArea');
        const pinnedInput = document.createElement('input');
        pinnedInput.setAttribute('type','checkbox');
        pinnedAreaDiv.appendChild(pinnedInput);
        if(isPinned)
            pinnedInput.checked = true;
        pinnedInput.addEventListener('change',()=>{
            this.ui.onPinnedClick(isPinned,noteId,this.notes);
            this.synchronizeLs();
        });
        return pinnedAreaDiv;
    }
}