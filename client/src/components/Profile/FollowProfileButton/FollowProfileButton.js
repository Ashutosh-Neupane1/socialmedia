import React, { useState, useEffect } from 'react';
import { unfollow, follow, isFollowing } from '../../../api/userapi.js';

export default function FollowProfileButton(props) {
  const [isFollowingProfile, setIsFollowingProfile] = useState(null);

  useEffect(() => {
    const fetchIsFollowing = async () => {
      const isFollowingResult = await isFollowing(props.followingId);
     
      setIsFollowingProfile(isFollowingResult);
    };

    fetchIsFollowing();
  }, [props.followingId]);
 

  const followClick = () => {
    follow(props.followingId);
    setIsFollowingProfile(true);
  };

  const unfollowClick = () => {
    unfollow(props.followingId);
    setIsFollowingProfile(false);
  };

  if (isFollowingProfile === null) {
    // Render a loading state or placeholder while the follow status is being fetched
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isFollowingProfile ? (
        <button variant="contained" color="secondary" onClick={unfollowClick}>
          Unfollow
        </button>
      ) : (
        <button variant="contained" color="primary" onClick={followClick}>
          Follow
        </button>
      )}
    </div>
  );
}
