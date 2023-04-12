import React, { useState } from 'react';
import { addTagToLocalStorage } from '../Service/localStorageService';
import '../Styles/TagInput.scss'

interface TagInputProps {}

const TagInput: React.FC<TagInputProps> = () => {
    const [tag, setTag] = useState('');

    const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTag(event.target.value);
    };

    const handleSaveClick = () => {
        if (tag.trim() === '') {
            return;
        }

        addTagToLocalStorage(tag);

        setTag('');
    };

    return (
        <div className='tag-inp'>
            <input className='inp' type="text" value={tag} onChange={handleTagChange} />
            <button className='btn-inpt' onClick={handleSaveClick}>Add Tag</button>
        </div>
    );
};

export default TagInput;





