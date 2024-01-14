import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { TEInput } from "tw-elements-react";
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { MdPreview, MdClear, MdArrowBack, MdPublish, MdSave } from 'react-icons/md';
import { addPost, showNotification, updatePost } from '../../store';
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

  const clearContent = () => {
    dispatch(showNotification({
      id: nanoid(), type: 'Confirm', text: 'Очистить текст?'
    }));
  }

  return (
    <div className="flex flex-col space-y-4 grow w-full p-6 border-b-2 border-neutral-3 overflow-auto">
      {(previewMode) ?
        <MarkdownPreviewRef className="grow border-b-2 border-neutral-3" source={postContent} /> :
        <><Input value={postTitle} onChange={(text) => { setPostTitle(text) }} type="text" placeholder="Заголовок" largeFont />
          <h6 className="mb-2 mt-0 text-base font-medium leading-tight text-primary">
            Загрузите изображения мест где ты был
          </h6>
          <div className="mb-3 w-96">
            <input
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
              type="file"
              id="formFile"
              multiple
            />
          </div>
          <h6 className="mb-2 mt-0 text-base font-medium leading-tight text-primary">
            Оценка удобства передвижения
          </h6>
          <div className="flex mb-3 w-96">
            { Array.from({length: 5}, (_, i) => {
              return (
                <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                <input
                    className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="radio"
                    name={`inlineRadioOptions${Math.random()}`}
                    id="inlineRadio1"
                    value="option1"
                />
                <label
                    className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="inlineRadio1"
                >
                    {i + 1}
                </label>
                </div>
              )
            }) }
          </div>
          <h6 className="mb-2 mt-0 text-base font-medium leading-tight text-primary">
              Оценка безопасности
          </h6>
          <div className="flex mb-3 w-96">
            { Array.from({length: 5}, (_, i) => {
              return (
                <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                <input
                    className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="radio"
                    name={`inlineRadioOptions${Math.random()}`}
                    id="inlineRadio1"
                    value="option1"
                />
                <label
                    className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="inlineRadio1"
                >
                    {i + 1}
                </label>
                </div>
              )
            }) }
          </div>
          <h6 className="mb-2 mt-0 text-base font-medium leading-tight text-primary">
              Оценка населенности
          </h6>
          <div className="flex mb-3 w-96">
            { Array.from({length: 5}, (_, i) => {
              return (
                <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                <input
                    className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="radio"
                    name={`inlineRadioOptions${Math.random()}`}
                    id="inlineRadio1"
                    value="option1"
                />
                <label
                    className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="inlineRadio1"
                >
                    {i + 1}
                </label>
                </div>
              )
            }) }
          </div>
          <h6 className="mb-2 mt-0 text-base font-medium leading-tight text-primary">
              Оценка растительности
          </h6>
          <div className="flex mb-3 w-96">
            { Array.from({length: 5}, (_, i) => {
              return (
                <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                <input
                    className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="radio"
                    name={`inlineRadioOptions${Math.random()}`}
                    id="inlineRadio1"
                    value="option1"
                />
                <label
                    className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="inlineRadio1"
                >
                    {i + 1}
                </label>
                </div>
              )
            }) }
          </div>
          <div className="flex mb-3 w-96">
            <div className="mb-2 mr-5 mt-1.5 text-base font-medium leading-tight text-primary">
                Стоимость
            </div>
            <TEInput
              type="number"
              id="cost"
              placeholder="Стоимость"
            />
          </div>

          <h6 className="mb-2 mt-0 text-base font-medium leading-tight text-primary">
              Места посещения
          </h6>
          <TEInput
              type="text"
              id="places"
              placeholder="Места посещения"
            />

</>}

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
