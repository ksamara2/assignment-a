import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const ETHERSCAN_API_URL = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=9J66YJDKC4UDRPXPK2W9BRJPT2C2E7JDHT`;
async function fetchdata(): Promise<any>{
    const res = await fetch(ETHERSCAN_API_URL);
    let {result:{ethusd}} = await res.json();

    const roundedeth = Math.round(ethusd * 1000) / 1000
    
    return roundedeth.toString();
    
}
const ETHERSCAN_API_URLGAS = `https://api.etherscan.io/api?module=proxy&action=eth_gasPrice&apikey=9J66YJDKC4UDRPXPK2W9BRJPT2C2E7JDHT`
async function fetchgas(): Promise<any>{
    const ress = await fetch(ETHERSCAN_API_URLGAS);
    let {result} = await ress.json();
    result = parseInt(result,16);
    const gwei = result/ 1e9;
    return Math.round(gwei).toString();
    

}





wss.on('connection', async function connection(ws) {
    console.log('A new client connected');
    const eth = await fetchdata();
    const ethgas = await fetchgas();
    // Send a message to the connected client
    ws.send(JSON.stringify({etherprice:eth,ethergas:ethgas}));
    

    // Event listener for receiving messages from the client
    ws.on('message', function incoming(message) {
        console.log('Received message:', message);

        });
    });

  
  const port = 3001;
  server.listen(port, () => {
    console.log(`WebSocket server is running on http://localhost:${port}`);
  });