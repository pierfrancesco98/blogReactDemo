import React, {useState, useEffect} from "react";
import Navbar from "../Navbar/Navbar";
import { TextField, Button, Container, Paper, List, ListItem, ListItemText,  Avatar, ListItemAvatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {  database,set, ref,  push,  onValue, storage, uploadBytes, sRef, getDownloadURL } from "../Firebase/Firebase";

function Home ({user}) {
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const handlePostChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };


  const handlePostSubmit = async () => {
    if (!postContent.trim()) {
      console.log('Il contenuto del post è vuoto.');
      return;
    }
  
    let imageUrl = null;
  
    if (selectedImage) {
      const storageRef = sRef(storage, 'images/' + selectedImage.name);
      
      await uploadBytes(storageRef, selectedImage);
      imageUrl = await getDownloadURL(storageRef);
    } else {
      imageUrl = 'https://firebasestorage.googleapis.com/v0/b/blogreactdemos.appspot.com/o/images%2Freact.png?alt=media&token=8a9519c9-0154-481d-8af6-534d5a1c63c0'; 
    }
  
    const postsRef = ref(database, 'Home');
    const newPostRef = push(postsRef);
    var data = new Date();
    var gg, mm, aaaa;
    gg = data.getDate() + "/";
    mm = data.getMonth() + 1 + "/";
    aaaa = data.getFullYear();
    const newPostData = {
      content: postContent,
      imageUrl: imageUrl,
      userId: user.uid,
      author: user.displayName,
      timestamp: gg + mm + aaaa,
      userPhoto: user.photoURL
    };
    
    set(newPostRef, newPostData);

    const userPostsRef = ref(database, 'users/' + user.uid + '/posts');
    const newUserPostRef = push(userPostsRef);
    set(newUserPostRef, newPostData);
  
    setPostContent('');
    setSelectedImage(null);
  };
  useEffect(() => {
    const homePostsRef = ref(database, 'Home');
    onValue(homePostsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const postArray = Object.values(data);
        setPosts(postArray);
      }
    });
  }, []);
    return (
     <>
     <Navbar  user={user} />
     <Container style={{marginTop: "40px"}}>
     <TextField
        label="A cosa stai pensando?"
        multiline
        minRows={3}
        value={postContent}
        onChange={handlePostChange}
        fullWidth
        id="fullWidth" 
      />
      <input type="file" accept="image/*" id="image-upload" onChange={handleImageChange} style={{ display: 'none' }} />
      <label htmlFor="image-upload">
        <IconButton color="primary" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      <Button variant="contained" color="primary" onClick={handlePostSubmit}>
        Pubblica
      </Button>
        <List>
          {posts.map((post, index) => (
            <Paper key={index} style={{ marginBottom: "20px", marginTop: "40px" }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar  src={post.userPhoto}/>
                </ListItemAvatar>
                <ListItemText
                  primary={post.author}
                  secondary={post.content}
                />
              </ListItem>
                <img src={post.imageUrl} alt="Post" style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }} />
            </Paper>
          ))}
        </List> 
      </Container>
     </>
    );
}

export default Home;