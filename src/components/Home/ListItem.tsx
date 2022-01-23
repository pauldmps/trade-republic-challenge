import Button from '../shared/Button';
import { IStateItems } from '../utils/reducer';
import { ListItemWrapper, IsinWrapper, PriceWrapper, ButtonWrapper } from './styles';

interface IListItemProps {
  listItem: IStateItems;
  handleRemoveClick: (isin: string) => void;
}

const ListItem: React.FC<IListItemProps> = ({ listItem, handleRemoveClick}) => {
  const { isin, price } = listItem;
  return (
    <ListItemWrapper data-testid="list-item">
      <IsinWrapper>{isin}</IsinWrapper>
      <PriceWrapper>{price}</PriceWrapper>
      <ButtonWrapper><Button secondary={true} onClick={() => handleRemoveClick(isin)}>Remove</Button></ButtonWrapper>
    </ListItemWrapper>
  );
};

export default ListItem;
