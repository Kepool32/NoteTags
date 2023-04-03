import React, { useState } from 'react';
import {addNoteToLocalStorage, addTagToLocalStorage} from "../Service/localStorageService";
import '../Styles/NoteInput.scss'

function NoteInput() {

    const [content, setContent] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = event.target.value;
        setContent(newContent);

        const tagRegex = /#[\p{L}\p{Mn}\p{Pc}0-9_]+/ug;
        const matches = newContent.match(tagRegex);

        if (matches) {
            const newTags = matches.map((match) => match);
            setTags(newTags);
        } else {
            setTags([]);
        }
    };

    const handleTagClick = (tag: string) => {
        const newContent = content + ' ' + tag;
        setContent(newContent);
    };

    const handleSaveClick = () => {
        if (content.trim() === '') {
            return;
        }

        const note = {
            id: Date.now(),
            content,
        };

        addNoteToLocalStorage(note);

        tags.forEach((tag) => addTagToLocalStorage(tag));

        setContent('');
        setTags([]);
    };

    return (
        <div className='center'>
            <textarea className='note-input' value={content} onChange={handleContentChange}  />
            <div>
                {tags.map((tag) => (
                    <span key={tag} onClick={() => handleTagClick(tag)}>
                        <div className='taq'> {tag}{' '}</div>
                    </span>
                ))}
            </div>
            <button className='note-save' onClick={handleSaveClick}>Сохранить</button>
        </div>
    );
}

export default NoteInput;






