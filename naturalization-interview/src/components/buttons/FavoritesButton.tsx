import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { QnA } from "../../app/types/types";
import { toggleFavorite } from "../questions/questionsSlice";

function FavoriteButton(props: { qna: QnA }) {
  const { qna } = props;
  const dispatch = useDispatch();

  return (
    <>
      {qna.isFavorite ? (
        <Tooltip
          key={`unfavorite-${qna.id}`}
          title="Unfavorite question"
          placement="bottom"
        >
          <IconButton
            aria-label="remove from favorite questions' list"
            onClick={() => dispatch(toggleFavorite(qna.id))}
          >
            <FavoriteIcon color="error" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip
          key={`favorite-${qna.id}`}
          title="Favorite question"
          placement="bottom"
        >
          <IconButton
            aria-label="add to favorite questions' list"
            onClick={() => dispatch(toggleFavorite(qna.id))}
          >
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
}
export default FavoriteButton;
