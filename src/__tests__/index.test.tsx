import { render, fireEvent } from '@testing-library/react';
import WS from 'jest-websocket-mock';

import Home from '../components/Home';
import { mockSocketData } from './__mocks__/mockData';
import { AppContextProvider } from '../components/utils/context';

const MOCK_WS_URL = 'ws://localhost:1234';
const mockServer = new WS(MOCK_WS_URL);
const mockClient = new WebSocket(MOCK_WS_URL);

jest.mock('../components/utils/hooks', () => ({
  ...jest.requireActual('../components/utils/hooks'),
  useConnectWebSocket: (onMessage: (e: MessageEvent) => void) => {
    const subscribe = (isin: string) => {
      const data = mockSocketData.find((item) => item.isin === isin);
      mockServer.send(JSON.stringify(data));
    };

    mockClient.onmessage = (e) => onMessage(e);

    const unsubscribe = jest.fn();
    return { subscribe, unsubscribe };
  },
}));

const setup = () =>
  render(
    <AppContextProvider>
      <Home />
    </AppContextProvider>
  );

describe('application tests', () => {
  it('renders initial application correctly', () => {
    const { getByText, getByPlaceholderText } = setup();

    const inputField = getByPlaceholderText('Enter ISIN');
    const addButton = getByText('Add');

    expect(inputField).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(addButton).toBeDisabled();
    expect(inputField).toHaveTextContent('');

    fireEvent.change(inputField, { target: { value: mockSocketData[0].isin } });

    expect(addButton).toBeEnabled();
  });

  it('add single stock to list', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = setup();

    const inputField = getByPlaceholderText('Enter ISIN');
    const addButton = getByText('Add');

    fireEvent.change(inputField, { target: { value: mockSocketData[0].isin } });
    fireEvent.click(addButton);

    await mockServer.connected;

    const listItem = getByTestId('list-item');

    expect(listItem).toHaveTextContent(String(mockSocketData[0].price));

    mockServer.send(JSON.stringify(mockSocketData[1]));
    expect(listItem).toHaveTextContent(String(mockSocketData[1].price));
  });

  it('add another stock to the list', async () => {
    const { getByText, getByPlaceholderText, getAllByTestId } = setup();

    const inputField = getByPlaceholderText('Enter ISIN');
    const addButton = getByText('Add');

    fireEvent.change(inputField, { target: { value: mockSocketData[0].isin } });
    fireEvent.click(addButton);
    fireEvent.change(inputField, { target: { value: mockSocketData[2].isin } });
    fireEvent.click(addButton);

    const listItem = getAllByTestId('list-item');
    expect(listItem).toHaveLength(2);

    expect(listItem[0]).toHaveTextContent(String(mockSocketData[0].price));
    expect(listItem[1]).toHaveTextContent(String(mockSocketData[2].price));

    mockServer.send(JSON.stringify(mockSocketData[4]));
    mockServer.send(JSON.stringify(mockSocketData[5]));

    expect(listItem[0]).toHaveTextContent(String(mockSocketData[4].price));
    expect(listItem[1]).toHaveTextContent(String(mockSocketData[5].price));
  });

  it('delete stock from list', () => {
    const { getByText, getByPlaceholderText, getAllByTestId, getAllByText } =
      setup();

    const inputField = getByPlaceholderText('Enter ISIN');
    const addButton = getByText('Add');

    fireEvent.change(inputField, { target: { value: mockSocketData[0].isin } });
    fireEvent.click(addButton);
    fireEvent.change(inputField, { target: { value: mockSocketData[2].isin } });
    fireEvent.click(addButton);

    const listItem = getAllByTestId('list-item');
    expect(listItem).toHaveLength(2);

    const deleteButton = getAllByText('Remove');
    fireEvent.click(deleteButton[0]);
    expect(getAllByTestId('list-item')).toHaveLength(1);
  });
});
