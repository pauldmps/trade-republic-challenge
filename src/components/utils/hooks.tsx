import { useState, useEffect, useContext } from 'react';
import { AppContext } from './context';

const SOCKET_URL = 'ws://159.89.15.214:8080/';

export const useConnectWebSocket = (onMessage: (e: MessageEvent) => void) => {
  const [connection, setConnection] = useState<WebSocket | null>(null);

  const onConnect = (e: Event) => {
    console.log('socket connected');
  };
  const onDisconnect = () => {
    console.log('socket disconnected');
    setConnection(null);
  };
  const onError = (error: any) => {
    console.log('socket error', error);
    setConnection(null);
  };

  const connect = () => {
    const newConnection = new WebSocket(SOCKET_URL);
    newConnection.onopen = onConnect;
    newConnection.onmessage = onMessage;
    newConnection.onclose = onDisconnect;
    newConnection.onerror = onError;
    setConnection(newConnection);
  }

  useEffect(() => {
    if (!connection) {
      connect()
    }
    return () => {
      if (connection) {
        connection.close();
      }
    };
  }, []);

  const subscribe = (isin: string) => {
    connection?.send(JSON.stringify({ subscribe: isin }));
  };

  const unsubscribe = (isin: string) => {
    connection?.send(JSON.stringify({ unsubscribe: isin }));
  };

  return { subscribe, unsubscribe };
};

export const useAppContext = () => {
  const appContext = useContext(AppContext);
  if (appContext === undefined) {
    throw new Error('AppContext must be used inside AppContextProvider');
  }

  return appContext;
};
