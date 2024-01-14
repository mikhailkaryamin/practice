import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { getDocs, collection, query, collectionGroup, where, or } from 'firebase/firestore';
import { MdAdd, MdArrowBack } from 'react-icons/md';
import classNames from 'classnames';
import { setUserPosts, setAddEditPostMode, showNotification } from '../../store';
import { auth, db } from '../../firebase-config';
import Button from '../other/Button';
import ReactIcon from '../other/ReactIcon';

function UserPosts({ arrayName }) {
  const { addEditPostMode } = useSelector((state) => state.userPostsReducer);
  const userData = useSelector((state) => state.navigationReducer.userData);

  const dispatch = useDispatch();

  const getAllPosts = useCallback(async () => {
    try {
      let querySnapshot = [];
      const usersData = {};

      if (arrayName === 'subscriptions') {
        if (!auth.currentUser) {
          dispatch(showNotification({
            id: nanoid(), type: 'Error', text: 'Ты не залогинен'
          }));

          return;
        }

        const subscriptionsQuerySnapshot = await getDocs(query(collectionGroup(db, 'posts'), where('subscribers', 'array-contains', auth.currentUser.uid)));
        if (!subscriptionsQuerySnapshot.empty) {
          const subscribedUsers = [];
          subscriptionsQuerySnapshot.forEach((doc) => {
            const creationTime = doc.data().creationTime.toDate();

            usersData[doc.data().uid] = { ...doc.data(), creationTime: creationTime.getTime() };
            subscribedUsers.push((doc.data().uid));
          });

          querySnapshot = await getDocs(query(collectionGroup(db, 'posts'), where('uid', 'in', subscribedUsers)));
        }
      }
      else if (arrayName === 'marked') {
        if (!auth.currentUser) {
          dispatch(showNotification({
            id: nanoid(), type: 'Error', text: 'Ты не залогинен'
          }));

          return;
        }

        querySnapshot = await getDocs(query(collectionGroup(db, 'posts'), or(where('marked', 'array-contains', auth.currentUser.uid), where('marked', '==', ''))));

        querySnapshot.forEach((doc) => {
          if (doc.id === 'userData') {
            const creationTime = doc.data().creationTime.toDate();
            usersData[doc.data().uid] = { ...doc.data(), creationTime: creationTime.getTime() };
          }
        });
      }
      else {
        querySnapshot = await getDocs(collection(db, 'users', (arrayName === 'ownPosts') ? auth.currentUser.uid : userData.uid, 'posts'));
      }

      const postsData = [];
      let subscribers = 0;
      let subscriptions = 0;

      querySnapshot.forEach((doc) => {
        if (doc.id !== 'userData') {
          const publishDate = doc.data().publishDate.toDate();
          const editDate = (doc.data().editDate) ? doc.data().editDate.toDate() : '';

          postsData.push({
            ...doc.data(), id: doc.id, userData: usersData[doc.data().uid],
            publishDate: publishDate.getTime(), editDate: (editDate) ? editDate.getTime() : ''
          });
        } else if (arrayName === 'ownPosts') {
          subscribers = doc.data().subscribers.length;
          subscriptions = doc.data().subscriptions.length;
        }
      });
      dispatch(setUserPosts({ arrayName, postsData, userData: { subscribers, subscriptions } }));
    } catch (error) {
      dispatch(showNotification({
        id: nanoid(), type: 'Error', text: 'Произошла ошибка при получении поста'
      }));
    }
  }, [dispatch, userData, arrayName]);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const handleSetPostMode = () => {
    dispatch(setAddEditPostMode({
      addEditPostMode: (addEditPostMode !== 0) ? 0 : 1
    }));
  }

  const headerClass = classNames('flex', 'justify-between', 'items-center',
    'space-x-2', 'w-full', 'p-6', 'border-b-2', 'border-neutral-3',
    { 'xl:flex-wrap xl:space-y-2 md:flex-wrap md:space-y-2': arrayName === 'ownPosts' },
    'xs:flex-col xs:gap-2');

  return (
    <section className="flex flex-col items-center grow bg-[white] rounded-xl shadow-lg">
      <header className={headerClass}>
        {arrayName === 'ownPosts' &&
          <Button className="xl:order-1 md:order-1" onClick={handleSetPostMode}>
            {(addEditPostMode) ?
              <ReactIcon src={<MdArrowBack className="w-6 h-6" />} color="white" /> :
              <ReactIcon src={<MdAdd className="w-6 h-6" />} color="white" />}
            <span>{(addEditPostMode) ? 'К постам' : 'Добавить новый пост'}</span>
          </Button>}

      </header>

    </section>
  );
}

export default UserPosts;
