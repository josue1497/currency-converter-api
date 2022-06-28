import CoinGeckoService from '@/services/coinGecko.service';

import WebSocket from 'ws';

export default async expressServer => {
  const websocketServer = new WebSocket.Server({
    noServer: true,
    path: '/websockets',
  });

  expressServer.on('upgrade', (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, websocket => {
      websocketServer.emit('connection', websocket, request);
    });
  });

  websocketServer.on('connection', function connection(websocketConnection) {
    websocketConnection.on('message', async () => {
      const coinGeckoService = new CoinGeckoService();
      const isServiceConnected: any = await coinGeckoService.ping();
      websocketConnection.send(JSON.stringify({ connected: isServiceConnected.success }));
    });
  });

  return websocketServer;
};
