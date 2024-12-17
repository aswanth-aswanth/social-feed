import { useNavigate } from 'react-router-dom';

const CreatePostHeader = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className="flex items-center gap-2">
      <img src="/HiArrowSmLeftBlack.png" alt="Back" className="w-8 h-6" />
      <h3 className="font-bold text-xl">New post</h3>
    </button>
  );
};

export default CreatePostHeader;
