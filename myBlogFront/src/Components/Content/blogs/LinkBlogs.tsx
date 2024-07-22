import React from 'react';
import { Link } from 'react-router-dom';

const LinkBlogs: React.FC = () => {
    const [changeLink, setChangeLink] = React.useState<number>(0)
    const linkArr: string[] = ['Новые', 'Популярные']
    return (
        <div className='wrapper-link-blogs'>
            {linkArr.map((el: string, i: number) => {
                return <Link key={i} onClick={() => setChangeLink(i)} className={`${changeLink === i ? 'active-link' : 'default-link'}`} to={`${el === 'Новые' ? '/new' : '/popular'}`}>
                    {el}
                </Link>
            })}
        </div>
    );
};

export default LinkBlogs;