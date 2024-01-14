import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { getDocs, collectionGroup, query, where, or, and } from 'firebase/firestore';
import classNames from 'classnames';
import { setAllPosts, showNotification, togglePostMark, toggleReactionToPost } from '../store';
import { db } from '../firebase-config';
import useSortPosts from '../hooks/use-sort-posts';
import Post from '../components/posts/Post';
import { data } from '../store/slices/allPostsSlice'
import TOPICS_LIST from '..';

function HomePage() {
  const { allPosts, searchTerm } = useSelector((state) => state.allPostsReducer);
  const dispatch = useDispatch();

  const getAllPosts = useCallback(async () => {
    try {
      const querySnapshot = await getDocs((searchTerm) ?
        query(collectionGroup(db, 'posts'),
          or(and(where('header', '>=', searchTerm), where('header', '<=', searchTerm + '\uf8ff')), where('header', '==', ''))) :
        collectionGroup(db, 'posts'));

      const postsData = [];
      const usersData = {};

      querySnapshot.forEach((doc) => {
        if (doc.id === 'userData') {
          const creationTime = doc.data().creationTime.toDate();
          usersData[doc.data().uid] = { ...doc.data(), creationTime: creationTime.getTime() };
        }
      });

      querySnapshot.forEach((doc) => {
        if (doc.id !== 'userData') {
          const publishDate = doc.data().publishDate.toDate();
          const editDate = (doc.data().editDate) ? doc.data().editDate.toDate() : '';

          postsData.push({
            ...doc.data(), id: doc.id, userData: usersData[doc.data().uid],
            publishDate: publishDate.getTime(), editDate: (editDate) ? editDate.getTime() : ''
          });
        }
      });

      dispatch(setAllPosts(postsData));
    } catch (error) {
      dispatch(showNotification({
        id: nanoid(), type: 'Error', text: 'Ошибка получения постов'
      }));
    }
  }, [dispatch, searchTerm]);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const sortedPosts = useSortPosts(TOPICS_LIST, 'allPosts');

  let content;
  if (allPosts.length === 0) {
    content = <p className="text-2xl text-neutral-4 text-center">
      {(searchTerm) ? 'Нету постов по вашим запросам' : 'Нет опубликованных постов'}
    </p>;
  } else if (allPosts.length > 0 && sortedPosts.length === 0) {
    content = <p className="text-2xl text-neutral-4 text-center">Нету постов по вашим запросам</p>;
  } else {
    content = data.map((post) =>
    (<Post data={post} key={post.id} onToggleReaction={toggleReactionToPost} onTogglePostMark={togglePostMark}
      post={post} showUserData />
    ));
  }

  const postsClass = classNames({
    'grid grid-cols-[repeat(auto-fit,_minmax(440px,_1fr))] gap-4 pr-4 overflow-auto': sortedPosts.length > 0,
    'flex justify-center items-center h-full': sortedPosts.length === 0
  });

  return (
    <div className="flex flex-col space-y-6 h-full p-6 sm:overflow-auto">
      <h1 className="mb-6 text-5xl font-bold text-center">Дневник путешествий</h1>

      <div className={postsClass}>
        {content}
      </div>
    </div>
  );
}

export default HomePage;
