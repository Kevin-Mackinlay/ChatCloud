import React, { useContext, useState } from 'react';
import Add from '../img/add.png';
import Attach from '../img/attach.png';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, updateDoc } from 'firebase/firestore';
import { v4 as uuid} from 'uuid';
import { db, storage } from '../firebase';
import { doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {
  const [ text, setText ] = useState('');
  const [ img, setImg ] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
       const storageRef = ref (storage, uuid());

       const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          (error) => {
            //setErr(true);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
             await updateDoc(doc(db, 'chats', data.chatId), {
               messages: arrayUnion({
                 id: uuid(),
                 text,
                 senderId: currentUser.uid,
                 date: Timestamp.now(),
                 img: downloadURL,
               }),
             });
            });
          }
        );

    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
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
