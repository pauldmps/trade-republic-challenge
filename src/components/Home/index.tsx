import React, { useState } from 'react';
import Button from '../shared/Button';
import InputText from '../shared/InputText';
import { useAppContext, useConnectWebSocket } from '../utils/hooks';
import ListItem from './ListItem';
import { ButtonWrapper, InputWrapper, Wrapper, ListWrapper } from './styles';

const Home = () => {
  const [value, setValue] = useState<string>('');
  const { pricelist, setData, removeData } = useAppContext();

  const onMessage = ({ data }: MessageEvent) => {
    setData(JSON.parse(data));
  };

  const { subscribe, unsubscribe } = useConnectWebSocket(onMessage);

  const handleAddClick = () => {
    setValue('');
    value && subscribe(value);
  };

  const handleRemoveClick = (isin: string) => {
    removeData({ isin });
    unsubscribe(isin);
  };

  return (
    <>
      <Wrapper>
        <InputWrapper>
          <InputText
            placeholder='Enter ISIN'
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
          />
        </InputWrapper>
        <ButtonWrapper>
          <Button disabled={!value} onClick={handleAddClick}>Add</Button>
        </ButtonWrapper>
      </Wrapper>
      <ListWrapper>
        {pricelist.map((item) => (
          <ListItem key={item.isin} listItem={item} handleRemoveClick={handleRemoveClick} />
        ))}
      </ListWrapper>
    </>
  );
};

export default Home;
