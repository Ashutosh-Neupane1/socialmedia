import axios from 'axios';
import { Navigate } from 'react-router-dom';

let _id = localStorage.getItem('_id');
let token = localStorage.getItem('token');

// const navigate = useNavigate();
const handleError = (err) => {
  if (err.response && err.response.status === 401) {
    <Navigate to="/SignOut" />;
  } else {
    console.log(err);
  }
};

const authorization = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const isFollowing = async (followingId) => {
  try {
    const user = await fetchAboutData();

    let a = user.following.some((following) => following._id === followingId);

    return a;
  } catch (error) {
    handleError(error);
    return false;
  }
};

export const follow = async (followId) => {
  try {
    await axios.put(
      'http://localhost:5000/api/users/follow',
      { userId: _id, followId },
      authorization
    );
  } catch (error) {
    handleError(error);
  }
};

export const unfollow = async (unfollowId) => {
  await axios.put(
    'http://localhost:5000/api/users/unfollow',
    { userId: _id, unfollowId },
    authorization
  );
};

export const remove = async () => {
  axios
    .delete(`http://localhost:5000/users/${_id}`, authorization)
    .then(() => {
      <Navigate to="/Login" />;
    })
    .catch((err) => {
      handleError(err);
    });
};

export const fetchAboutData = async () => {

  try {
    const response = await axios.get(`http://localhost:5000/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const findPeople = async () => {

  try {
    const following = fetchAboutData().following;
    const data = { following, _id };

    const response = await axios.post(
      'http://localhost:5000/userTofollow',
      data,
      authorization
    );
    return response.data;
  } catch (err) {
    handleError(err);
  }
};
export const fetchProfiledata = async (_id) => {


  try {
    const response = await axios.get(`http://localhost:5000/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

