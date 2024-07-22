import React from 'react';
import Post from '../Post/Post';
import { useSelector } from 'react-redux';
import { selectPosts } from '../../../../Selectors/selectors';
import { post } from '../../../../types/types';

const BlogsPopular: React.FC = () => {
    const { posts } = useSelector(selectPosts);
    return (
        <div className='wrapper-blogs'>
            {posts &&
                posts.map((post: post) => {
                    return (
                        post.viewsCount > 45 && <Post key={post._id} {...post} />
                    );
                })}
        </div>
    );
};

export default BlogsPopular;