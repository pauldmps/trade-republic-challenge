import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const InputWrapper = styled.div`
  margin: 12px 12px;
`;
export const ButtonWrapper = styled.div`
  margin: 12px 16px;
`;

export const ListWrapper = styled.div`
`;

export const ListItemWrapper = styled.div`
  display: flex;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const IsinWrapper = styled.div`
  padding: 24px;
  font-size: 1.8rem;
`;

export const PriceWrapper = styled.div`
  padding: 24px;
  font-size: 1.8rem;
  width: 400px;
`;
