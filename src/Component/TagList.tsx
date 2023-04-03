import React, { useState } from 'react';
import { deleteTagFromLocalStorage, getLocalStorageData } from '../Service/localStorageService';
import '../Styles/TagList.scss'

interface TagListProps {}

const TagList: React.FC<TagListProps> = () => {
    const [tags, setTags] = useState<string[]>(getLocalStorageData().tags);

    const handleDeleteTag = (tag: string) => {
        deleteTagFromLocalStorage(tag);
        setTags(getLocalStorageData().tags);
    };

    return (
        <div>
            <h3>All tags:</h3>
            {tags.map((tag,index) => (
                <div key={index} className='tags'>
                    <span className='spans'>{tag}</span>
                    <button className='but' onClick={() => handleDeleteTag(tag)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default TagList;
