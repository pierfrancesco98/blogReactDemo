import React from "react";
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { auth, GoogleAuthProvider, signInWithPopup, database,set, ref, update,  onValue  } from "../Firebase/Firebase";

const provider = new GoogleAuthProvider();

const image = {
  url: 'https://th.bing.com/th/id/R.911b0a6d2ff16326cf6401ce900fde73?rik=pmmtlpkaGNrANw&pid=ImgRaw&r=0',
  title: 'Login',
  width: '40%',
};

const CenteredButton = styled(ButtonBase)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100vh',
  [theme.breakpoints.down('sm')]: {
    height: '100vh',
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));
function Login () {
  const handleLogin = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    console.log(user)
    const userRef = ref(database,'users/' + user.uid);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
         var dataDatabase = new Date();
        var gg, mm, aaaa;
        gg = dataDatabase.getDate() + "/";
        mm = dataDatabase.getMonth() + 1 + "/";
        aaaa = dataDatabase.getFullYear();
      if (data) {
        update(userRef, {
          lastLogin: gg + mm + aaaa
        });
      } else {
        
        set(userRef, {
          username: user.displayName,
          email: user.email,
          registrationDate:  gg + mm + aaaa,
          lastLogin: gg + mm + aaaa
        });
      }
    });
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
  };
    return (
      <CenteredButton focusRipple onClick={handleLogin}>
      <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
      <ImageBackdrop className="MuiImageBackdrop-root" />
      <Image>
        <Typography
          component="span"
          variant="subtitle1"
          color="inherit"
          sx={{
            position: 'relative',
            p: 4,
            pt: 2,
            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
          }}
        >
          {image.title}
          <ImageMarked className="MuiImageMarked-root" />
        </Typography>
      </Image>
    </CenteredButton>
    );
}

export default Login;