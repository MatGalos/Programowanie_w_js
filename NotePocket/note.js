export default class Note {
    constructor(title, content, color = 'red',  pinned = false) {        
        this.title  = title;
        this.content = content;
        this.color = color;
        this.pinned = pinned;
        this.date = new Date();
        this.id = Date.now().toString();
    }    
}