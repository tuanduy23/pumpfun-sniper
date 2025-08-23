# 🎯 Pump.fun Auto-Trading Sniper
 
A powerful, terminal-based Pump.fun auto-trading bot built with Node.js. It monitors newly launched tokens in real time, auto-buys based on your custom SOL threshold, and auto-sells after a delay.

## 📌 Features 
  
✅ Real-time token tracking via WebSocket  
 
✅ Auto-buy based on your defined SOL threshold

✅ Auto-sell after configurable delay

✅ Supports .env private key (no hardcoding)

![Bot Output Preview](output.png)
 
## 🛠 Installation
```
git clone https://github.com/tuanduy23/pumpfun-sniper.git
cd pumpfun-sniper

# Install required packages 
npm install
```




## 🛠 Configuration

### Load .env file
```
PRIVATE_KEY=
BUY_THRESHOLD_SOL=0.05
SELL_DELAY_MS=100
SUBSCRIBE_ADDRESS=
RPC_URL=https://api.mainnet-beta.solana.com
WS_URL=wss://api.mainnet-beta.solana.com
```

### ▶️ Run the Bot
```
npm start
```
### Built by Tuan Tran
Twitter: @tuandev.aglietech
Email: tuandev@aglietech.com
