// hooks
import useAuth from '../hooks/useAuth';
//
import { MAvatar } from './@material-extend';
import createAvatar from '../utils/createAvatar';
import img from '../assets/profile-user.png';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  return (
    <MAvatar
      src={img}
      alt={user.displayName}
      color={user.photoURL ? 'default' : createAvatar(user.displayName).color}
      {...other}
    >
      {createAvatar(user.displayName).name}
    </MAvatar>
  );
}
