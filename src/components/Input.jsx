import React, { useContext, useState } from 'react';
import Add from '../img/add.png';
import Attach from '../img/attach.png';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, serverTimestamp, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { db, storage } from '../firebase';
import { doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const imageId = uuid();
      const storageRef = ref(storage, imageId);
      const uploadTask = uploadBytesResumable(storageRef, img);

      // Monitor state changes of the upload
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              console.log('Unexpected upload state: ', snapshot.state);
              break; // Log unexpected states. Maybe useful for debugging.
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error('Upload failed:', error);
          // Here, you could set an error state to display in the UI
        },
        async () => {
          // Handle successful uploads on complete
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File available at', downloadURL);

          // Update Firestore document with the new image URL and other message info
          await updateDoc(doc(db, 'chats', data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        }
      );
    } else {
      // No image is attached, just update Firestore with text data
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });
    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });
    setText('');
    setImg(null);
  };

  return (
    <div className="input">
      <input type="text" placeholder="Type a message..." onChange={(e) => setText(e.target.value)} value={text} />
      <div className="send">
        <img src={Attach} alt="" />
        <input type="file" id="file" style={{ display: 'none' }} onChange={(e) => setImg(e.target.files[0])} />
        <label htmlFor="file">
          <img src={Add} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
