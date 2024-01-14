import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { MdPreview, MdClear, MdArrowBack, MdPublish, MdSave } from 'react-icons/md';
import { addPost, setPostContent, showNotification, updatePost } from '../../store';
import { auth, db } from '../../firebase-config';
import MarkdownPreviewRef from '@uiw/react-markdown-preview';
import Button from '../other/Button';
import Input from '../input/Input';
import ReactIcon from '../other/ReactIcon';

function PostEditor({ topics }) {
  const { editablePostData, postContent } = useSelector((state) => state.userPostsReducer);

  const [postTitle, setPostTitle] = useState(editablePostData?.header || '');
  const [previewMode, setPreviewMode] = useState(false);

  const dispatch = useDispatch();

  const publishPost = async () => {
    if (topics.length === 0) {
      dispatch(showNotification({
        id: nanoid(), type: 'Error', text: 'Выбери как минимум один топик'
      }));

      return;
    }

    const now = new Date();

    if (editablePostData) {
      try {
        const post = {
          header: postTitle,
          content: postContent,
          topics,
          editDate: now.getTime()
        };

        await updateDoc(doc(db, 'users', auth.currentUser.uid, 'posts', editablePostData.id), { ...post, editDate: now });

        dispatch(showNotification({
          id: nanoid(), type: 'Info', text: 'Пост успешно обновлен'
        }));
        dispatch(updatePost(post));
      } catch (error) {
        dispatch(showNotification({
          id: nanoid(), type: 'Error', text: 'Ошибка обновления поста'
        }));
      }
    } else {
      try {
        const post = {
          uid: auth.currentUser.uid,
          header: postTitle,
          content: postContent,
          topics,
          reactions: [],
          marked: [],
          publishDate: now.getTime(),
          editDate: ''
        };

        await addDoc(collection(db, 'users', auth.currentUser.uid, 'posts'), { ...post, publishDate: now });

        dispatch(showNotification({
          id: nanoid(), type: 'Info', text: 'Пост успешно опубликован'
        }));
        dispatch(addPost(post));
      } catch (error) {
        dispatch(showNotification({
          id: nanoid(), type: 'Error', text: 'Ошибка публикации поста'
        }));
      }
    }
  }

  const openPreviewMode = () => {
    if (!postTitle || !postContent) {
      dispatch(showNotification({
        id: nanoid(), type: 'Error', text: 'Введите заголовок и текст'
      }));

      return;
    }

    setPreviewMode(!previewMode);
  }

  const handleInput = (text) => {
    dispatch(setPostContent(text));
  }

  const clearContent = () => {
    dispatch(showNotification({
      id: nanoid(), type: 'Confirm', text: 'Очистить текст?'
    }));
  }

  return (
    <div className="flex flex-col space-y-4 grow w-full p-6 border-b-2 border-neutral-3 overflow-auto">
      {(previewMode) ?
        <MarkdownPreviewRef className="grow border-b-2 border-neutral-3" source={postContent} /> :
        <><Input value={postTitle} onChange={(text) => { setPostTitle(text) }} type="text" placeholder="Post title" largeFont />
          <textarea className="grow p-4 text-xl border-[3px] border-neutral-3 rounded-lg focus:outline-none"
            placeholder="Введите текст ..." value={postContent} onInput={(event) => { handleInput(event.target.value) }} /></>}

      <div className="flex justify-end space-x-4">
        <Button onClick={openPreviewMode} secondary>
          {(previewMode) ?
            <ReactIcon src={<MdArrowBack className="w-6 h-6" />} color="black" /> :
            <ReactIcon src={<MdPreview className="w-6 h-6" />} color="black" />}
          <span className="text-[black]">{(previewMode) ? 'Вернутся к редактированию' : 'Превью'}</span>
        </Button>

        {(previewMode) ?
          <Button onClick={publishPost}>
            {(editablePostData) ?
              <ReactIcon src={<MdSave className="w-6 h-6" />} color="white" /> :
              <ReactIcon src={<MdPublish className="w-6 h-6" />} color="white" />}
            <span>{(editablePostData) ? 'Сохранить изменения' : 'Опубликовать пост'}</span>
          </Button> :
          <Button onClick={clearContent} error>
            <ReactIcon src={<MdClear className="w-6 h-6" />} color="white" />
            <span>Clear</span>
          </Button>}
      </div>
    </div>
  );
}

export default PostEditor;
