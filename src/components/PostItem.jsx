import React, { useState } from 'react';
import MyButton from './UI/button/MyButton';

const PostItem = (props) => {
   const [isDone, setIsDone] = useState(false);

   const toggleDone = () => {
      setIsDone(!isDone);
   };

   return (
      <div className='post' style={{ backgroundColor: isDone ? '#d4edda' : 'white' }}>
         <div className='post__content'>
            <strong>{props.number}. {props.post.title}</strong>
            <div style={{ textDecoration: isDone ? 'line-through' : 'none' }}>
               {props.post.body}
            </div>
         </div>
         <div className='post__btns'>
            <MyButton onClick={() => props.remove(props.post)}>
               Delete
            </MyButton>
            <MyButton onClick={toggleDone} style={{ marginLeft: '10px' }}>
               {isDone ? 'Undo' : 'Done'}
            </MyButton>
         </div>
      </div>
   );
};

export default PostItem;
