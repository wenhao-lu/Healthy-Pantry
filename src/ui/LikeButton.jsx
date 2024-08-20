import { useState } from 'react';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';

function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div>
      {isLiked ? (
        <IoHeartSharp
          className="w-8 cursor-pointer text-red-500"
          onClick={() => setIsLiked(false)}
        />
      ) : (
        <IoHeartOutline
          className="w-8 cursor-pointer"
          onClick={() => setIsLiked(true)}
        />
      )}
    </div>
  );
}

export default LikeButton;
