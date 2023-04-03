import React, { useState } from 'react';
import {
    addTagToLocalStorage,
    deleteNoteFromLocalStorage,

    getLocalStorageData,
    Note,
    updateNoteInLocalStorage
} from "../Service/localStorageService";
import  '../Styles/NoteList.scss'

interface NoteListProps {}

const NoteList: React.FC<NoteListProps> = () => {
    const [notes, setNotes] = useState<Note[]>(getLocalStorageData().notes);
    const [tags] = useState<string[]>(getLocalStorageData().tags);
    const [selectedTag, setSelectedTag] = useState<string>("All tags");

    const handleDeleteNote = (note: Note) => {
        deleteNoteFromLocalStorage(note);
        setNotes(getLocalStorageData().notes);
    };

    const handleEditNote = (note: Note) => {
        const newContent = prompt('Enter new content:', note.content);
        if (newContent !== null) {
            const tags = newContent.match(/#\S+/g) ?? [];
            updateNoteInLocalStorage({ ...note, content: newContent });
            tags.forEach(addTagToLocalStorage);
            setNotes(getLocalStorageData().notes);
        }
    };

    const handleTagSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTag(event.target.value);
    };

    const filteredNotes = selectedTag !== "All tags"
        ? notes.filter(note => {
            const tags = note.content.match(/(?<=\s|^)#\S+/g) ?? [];
            // @ts-ignore
            return tags.includes(selectedTag);
        })
        : notes;

    return (
        <div >
            <div className='FiltSect'>
            <h3 className='Filt'>Filter by tag</h3>
            <select className='sel' value={selectedTag} onChange={handleTagSelect}>
                <option value="All tags">All tags</option>
                {tags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                ))}
            </select>
        </div>
            <div className='Filt-cont' >
            {filteredNotes.map((note) => (
                <div key={note.id}>
                    <span>{note.content}</span>
                    <button onClick={() => handleEditNote(note)}>Edit</button>
                    <button onClick={() => handleDeleteNote(note)}>Delete</button>
                </div>
            ))}
            </div>
        </div>
    );
};

export default NoteList;








/*// Получить данные из локального хранилища
const data = JSON.parse(localStorage.getItem('my-app-data'));

// Вывести все заметки в консоль
console.log(data.notes);

// Вывести все теги в консоль
console.log(data.tags);*/
