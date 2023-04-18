import Back from '../../assets/functional/back-icon.svg';
import { useNavigate } from 'react-router-dom';

export default function BackIcon() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="back-icon">
      <img src={Back} alt="back" onClick={handleGoBack} />
    </div>
  );
}
