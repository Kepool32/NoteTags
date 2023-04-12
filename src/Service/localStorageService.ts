export interface Note {
    id: number;
    content: string;

}

export interface LocalStorageData {
    notes: Note[];
    tags: string[];
}

function getLocalStorageData(): LocalStorageData {
    const data = localStorage.getItem('my-app-data');
    return data ? JSON.parse(data) : { notes: [], tags: [] };
}

function saveLocalStorageData(data: LocalStorageData): void {
    localStorage.setItem('my-app-data', JSON.stringify(data));
}

function addNoteToLocalStorage(note: Note): void {
    const data = getLocalStorageData();
    data.notes.push(note);
    saveLocalStorageData(data);
}

function updateNoteInLocalStorage(note: Note): void {
    const data = getLocalStorageData();
    const index = data.notes.findIndex((n) => n.id === note.id);
    if (index !== -1) {
        data.notes[index] = note;
        saveLocalStorageData(data);
    }
}

function deleteNoteFromLocalStorage(note: Note): void {
    const data = getLocalStorageData();
    data.notes = data.notes.filter((n) => n.id !== note.id);
    saveLocalStorageData(data);
}

function addTagToLocalStorage(tag: string): void {
    const data = getLocalStorageData();
    if (!data.tags.includes(tag)) { // проверяем, есть ли такой тег в списке
        data.tags.push(tag);
        saveLocalStorageData(data);
    }
}

function deleteTagFromLocalStorage(tag: string): void {
    const data = getLocalStorageData();
    data.tags = data.tags.filter((t) => t !== tag);
    saveLocalStorageData(data);
}

export { getLocalStorageData, addNoteToLocalStorage, updateNoteInLocalStorage, deleteNoteFromLocalStorage, addTagToLocalStorage, deleteTagFromLocalStorage };
