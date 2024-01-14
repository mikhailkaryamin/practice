import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { BiSolidUser } from 'react-icons/bi';
import { MdEdit, MdDelete } from 'react-icons/md';
import { setAddEditPostMode, showNotification } from '../../store';
import ReactIcon from '../other/ReactIcon';

function Post({ post, editButtons, data }) {
  const [showFullContent, setShowFullContent] = useState(0);
  const dispatch = useDispatch();

  const postContentRef = useRef();

  useEffect(() => {
    if (postContentRef) {
      if (postContentRef.current.getBoundingClientRect().height > 500) {
        setShowFullContent(1);
      }
    }
  }, [postContentRef]);

  const editPost = () => {
    dispatch(setAddEditPostMode({
      addEditPostMode: 2, editablePostData: post
    }));
  }

  const deletePost = () => {
    const notificationId = nanoid();

    dispatch(showNotification({
      id: notificationId, type: 'Confirm', text: 'Удалить пост?', post
    }));
  }

  const formatDate = (date) => {
    const newDate = new Date(date);
    const dateString = `${String(newDate.getDate()).padStart(2, '0')}.${String(newDate.getMonth() + 1).padStart(2, '0')}.${newDate.getFullYear()}`;
    const timeString = `${String(newDate.getHours()).padStart(2, '0')}:${String(newDate.getMinutes()).padStart(2, '0')}`;

    return `${timeString} ${dateString}`
  }

  return (
    <div className="flex flex-col space-y-2 p-4 bg-neutral-2 rounded-lg shadow-md">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center space-x-4 cursor-pointer">
          <ReactIcon src={<BiSolidUser className="w-16 h-16" />} color="" />
          <p className="text-2xl">{data.name}</p>
        </div>

        <p className="break-words">{formatDate(data.publishDate)}</p>

        {editButtons && <div className="flex space-x-2">
          <ReactIcon src={<MdEdit className="w-8 h-8 cursor-pointer duration-150 hover:opacity-75" onClick={editPost} />} color="#127be3" />
          <ReactIcon src={<MdDelete className="w-8 h-8 cursor-pointer duration-150 hover:opacity-75" onClick={deletePost} />} color="#e32e12" />
        </div>}
      </div>

      <p className="text-2xl font-bold">{data.title}</p>

      <div ref={postContentRef} className="relative overflow-hidden" style={(showFullContent === 1) ? { 'height': '500px' } : {}}>
        Изображения мест:
        <br />
        <div className='flex flex-wrap'>
          {data.images.map((el) => {
            return (
              <div className="mb-4">
                <img
                    src={el}
                    className="w-32 h-32 rounded-full ml-4"
                    alt="" />
              </div> )
          })}
        </div>
          Оценка удобства: <strong>{data.convenience}</strong>
          <br/>
          Оценка безопасности:<strong>{data.safety}</strong>
          <br/>
          Оценка безопасности: <strong>{data.safety}</strong>
          <br/>
          Оценка населенности: <strong>{data.population}</strong>
          <br/>
          Оценка растительности: <strong>{data.nature}</strong>
          <br/>
          Стоимость: <strong>{data.cost}</strong>
          <br/>
          Места посещения: <strong>{data.places}</strong>
      </div>

    </div>
  );
}

export default Post;
