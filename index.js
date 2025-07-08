require("dotenv").config();
const WebSocket = require("ws");
const chalk = require("chalk");
const boxen = require("boxen");
const bs58 = require("bs58");
const {
  Connection,
  Keypair,
  PublicKey, 
  Transaction,
  SystemProgram,
} = require("@solana/web3.js");
const { tradeAPI } = require("solana-trade-api-sdk");

// ========== CONFIG ==========
const pk = process.env.PRIVATE_KEY;
const BUY_THRESHOLD_SOL = process.env.BUY_THRESHOLD_SOL || 0.05;
const SELL_DELAY_MS = process.env.SELL_DELAY_MS || 10000; // Auto-sell after 10 seconds

// ========== FORMAT HELPERS ==========
function formatNumber(n) {
  return Number(n).toLocaleString("en-US", { maximumFractionDigits: 2 });
}

function displayToken(data) {
  const { name, symbol, marketCapSol, solAmount, uri, initialBuy } = data;
  const message = `
Name:        ${chalk.green(name)}
Symbol:      ${chalk.yellow(symbol)}
Initial Buy: ${chalk.blue(formatNumber(initialBuy))}
SOL Amount:  ${chalk.magenta(solAmount)}
Market Cap:  ${chalk.cyan(formatNumber(marketCapSol))} SOL
URI:         ${chalk.gray(uri)}
  `;
  console.log(
    boxen(message, { padding: 1, borderColor: "green", borderStyle: "round" })
  );
}
//

// ========= TRADING LOGIC ==========
async function autoBuy(tokenData) {
  const { solAmount, name } = tokenData;

  if (solAmount >= BUY_THRESHOLD_SOL) {
    console.log(chalk.green(`🚀 Buying ${name} for ${solAmount} SOL...`));

    // Simulate a buy (insert real buy logic here)
    console.log(chalk.green(`✅ Bought ${name}`));

    setTimeout(async () => {
      console.log(chalk.red(`💸 Selling ${name}...`));
      // Simulate a sell
      console.log(chalk.red(`✅ Sold ${name}`));
    }, SELL_DELAY_MS);
  } else {
    console.log(chalk.gray(`⏭️ Skipped ${name}, too low (${solAmount} SOL)`));
  }
}

// ========== WebSocket Listener ==========
const ws = new WebSocket("wss://pumpportal.fun/api/data");

ws.on("open", () => {
  ws.send(JSON.stringify({ method: "subscribeNewToken" }));
  console.log(chalk.blue("🟢 Connected to Pump.fun WebSocket..."));
});
(async () => {
  if (!pk) {
    console.error(chalk.red("❌ Private key not set in .env file!"));
    process.exit(1);
  }

  const connection = new Connection("https://api.mainnet-beta.solana.com");
  const wallet = Keypair.fromSecretKey(bs58.default.decode(pk));

  await tradeAPI(pk, connection, wallet, BUY_THRESHOLD_SOL, SELL_DELAY_MS);
})();
ws.on("message", async (data) => {
  try {
    const parsed = JSON.parse(data.toString());
    if (parsed.name && parsed.symbol && parsed.solAmount) {
      if (!pk) {
        console.error(chalk.red("❌ Private key not set in .env file!"));
      } else {
        displayToken(parsed);
        await autoBuy(parsed);
      }
    }
  } catch (err) {
    console.error("❌ Error:", err);
  }
});
