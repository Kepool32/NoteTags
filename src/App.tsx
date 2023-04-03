import React, {useState} from 'react';
import NoteInput from "./Component/NoteInput";

import NoteList from "./Component/NoteList";
import TagList from "./Component/TagList";
import TagInput from "./Component/TagInput";
import './Styles/App.scss'

function App() {

    const [showNotes, setShowNotes] = useState(false);


    const handleShowNotesClick = () => {
        setShowNotes(!showNotes);
    };


    const [showTags, setShowTags] = useState(false);


    const handleShowTagsClick = () => {
        setShowTags(!showTags);
    };

  return (
    <div className='app' >

        <div className='app-content'>

                <h1>Заметки</h1>


        <NoteInput />

        <div className='btn-ed'>
            <div className='btn-content'>
            <button onClick={handleShowNotesClick}  className='btn' >
                {showNotes ? 'Скрыть заметки' : 'Показать заметки'}
            </button>
            {showNotes && <NoteList  />}
            </div>
            <div className='btn-content'>
            <button onClick={handleShowTagsClick} className='btn'>
                {showTags ? 'Скрыть тэги' : 'Показать тэги'}
            </button>
            {showTags &&   <TagList/> }
            </div>
        </div>

        <TagInput/>

        </div>
    </div>
  );
}

export default App;
