import './share.css';
import Person1img from '../assets/Person/img.png';
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from '@mui/icons-material';
import { useContext, useRef, useState } from 'react';
import { Authcontext } from '../../context/Authcontext';
import axios from 'axios';
import { getDownloadURL, uploadBytesResumable, ref, storage } from '../../firebaseConfig';

export default function Share({setchecknewPost}) {
  const { user } = useContext(Authcontext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!file && !desc.current.value) {
      console.error("No file selected");
      return;
    }

    const files = file;

    const metadata = {
      contentType: 'image/jpeg',
    };

    const storageRef = ref(storage, 'images/' + files.name);
    const uploadTask = uploadBytesResumable(storageRef, files, metadata);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
      }
    },
      (error) => {
        switch (error.code) {
            case 'storage/unauthorized':
                break;
            case 'storage/canceled':
                break;
            case 'storage/unknown':
                break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(async (downloadURL) => {
            console.log('File available at', downloadURL);

            const newPost = {
              userId: user._id,
              desc: desc.current.value,
              image: downloadURL,
            };

            try {
              const res = await axios.post('http://localhost:5500/api/post/', newPost);
              console.log("Post successfully created.");
              console.log(res);
              setchecknewPost(true)
            //   window.location.reload()
            } catch (error) {
              console.error("Post creation error:", error);
            }
            desc.current.value = '';
            setFile(null);
          });
      }
    );
  };

  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className='shareprofileImg'
            src={user?.profilePicture || Person1img || 'https://img.freepik.com/free-vector/gamer-playing-with-computer_52683-16730.jpg?size=626&ext=jpg&uid=R119851894&ga=GA1.2.1922389197.1677510164&semt=ais'}
            alt="img"
          />
          <input
            style={{textTransform:"capitalize"}}
            placeholder={"What's on your mind, " + user?.username + '?'}
            className='shareInput'
            ref={desc}
          />
        </div>
        <hr className='sharehr' />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)}  alt="" />
            <Cancel className='sharecancelImg' onClick={()=>setFile(null)}/>
          </div>
        )}
        <form onSubmit={submitHandler} className="shareBottom">
          <div className="shareOptions">
            <label htmlFor='file' className="shareOption">
              <PermMedia htmlColor='tomato' className='shareIcon' />
              <span  className='shareOptionText'>Photo or Video</span>
              <input
                style={{ cursor: 'pointer', display: 'none' }}
                type="file"
                id='file'
                accept='.png,.jpg,.jpeg'
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor='blue' className='shareIcon' />
              <span className='shareOptionText'>Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor='green' className='shareIcon' />
              <span className='shareOptionText'>Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor='gold' className='shareIcon' />
              <span className='shareOptionText'>Feelings</span>
            </div>
          </div>
          <button type='submit' className="sharebutton">POST</button>
        </form>
      </div>
    </div>
  );
}
