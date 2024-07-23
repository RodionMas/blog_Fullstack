import React from 'react';
import { ChildProps } from '../../types/types';

const MessageDel: React.FC<ChildProps> = ({wantDel, setDel}) => {
    return (
        <div className='MessageDel'>
            <span>Вы точно хотите удалить?</span>
            <div className='del-block'>
            <button onClick={() => wantDel()} className='del-yes'>Да</button>
            <button onClick={() => setDel(false)} className='del-no'>Нет</button>
            </div>
        </div>
    );
};

export default MessageDel;