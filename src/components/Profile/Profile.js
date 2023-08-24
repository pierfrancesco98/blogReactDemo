import React, {useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import {Button, Container, Paper, Typography, List, ListItem, ListItemText, Grid, Avatar, ListItemAvatar } from '@mui/material';
import { database, ref, onValue } from "../Firebase/Firebase";

function Profile({ user }) {
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    const userRef = ref(database, 'users/' + user.uid);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setUserData(data);
      const userPostsRef = ref(database, 'users/' + user.uid + '/posts');
      onValue(userPostsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const postArray = Object.values(data);
          setUserPosts(postArray);
        }
      });
    });
  }, [user.uid]);

  return (
    <>
      <Navbar user={user} />
      <Paper elevation={3} style={{ padding: "20px" }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={3} textAlign="center">
              <Avatar sx={{ width: 120, height: 120 }} src={user.photoURL} />
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="h5" gutterBottom>
                {userData?.username}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Email: {userData?.email}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Data di registrazione: {userData?.registrationDate}
              </Typography>
              <Button variant="contained" color="primary">
                Modifica profilo
              </Button>
            </Grid>
          </Grid>
        </Paper>
      <Container style={{ marginTop: "40px" }}>
        <List>
        <Typography variant="h4" gutterBottom>
          I Miei Post
        </Typography>
          {userPosts.map((post, index) => (
            <Paper key={index} style={{ marginBottom: "20px", padding: "10px" }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={user.photoURL}/>
                </ListItemAvatar>
                <ListItemText primary={post.content} />
              </ListItem>
                <img src={post.imageUrl} alt="Post" style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }} />
            </Paper>
          ))}
        </List>
      </Container>
    </>
  );
}

export default Profile;
