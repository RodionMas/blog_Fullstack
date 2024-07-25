import React from 'react';
import './sass/styles.scss';
import Header from './Components/Header/Header';
import Content from './Components/Content/Content';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import BlogsPopular from './Components/Content/blogs/BlogsPopular/BlogsPopular';
import BlogsNew from './Components/Content/blogs/BlogsNew/BlogsNew';
import BlogId from './Components/BlogId/BlogId';
import CreatePost from './Components/CreatePost/CreatePost';
import Login from './Components/Login/Login';
import Registration from './Components/Registration/Registration';
import NotFound from './Components/NotFound/NotFound';
import UpdatePost from './Components/UpdatePost/UpdatePost';

const App: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  React.useEffect(() => {
    if(location.pathname === '/'){
      navigate('/new')
    }
  })
  return (
    <div className='App'>
      <Header />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Content />}>
            <Route path='/new' element={<BlogsNew />} />
            <Route path='/popular' element={<BlogsPopular />} />
          </Route>
          <Route path='/post/:id' element={<BlogId />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/update/:id' element={<UpdatePost />} />
          <Route path='login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
