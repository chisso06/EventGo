import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CollectingComments = ({eventId, randomNum}) => {
	console.log("CollectingComments");

  const navigate = useNavigate();
  function createImage() {
    console.log("createImage");
  }

  return (
    <div>
      <Typography>感想収集用QRコード{randomNum}</Typography>
      <div>
          <Button
            sx={{top: 20}}
            variant="text"
            onClick={createImage}
          >感想の収集を中断して画像を生成する</Button>
      </div>
    </div>
  );
}

export default CollectingComments;