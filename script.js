let chart;
let stockList = [];
const stockCache = {};

const fallbackStockList = [
  { name: "Reliance Industries", symbol: "RELIANCE.NS" },
  { name: "Reliance Industries", symbol: "RELIANCE.BO" },
  { name: "Tata Consultancy Services", symbol: "TCS.NS" },
  { name: "Tata Consultancy Services", symbol: "TCS.BO" },
  { name: "Infosys", symbol: "INFY.NS" },
  { name: "Infosys", symbol: "INFY.BO" },
  { name: "HDFC Bank", symbol: "HDFCBANK.NS" },
  { name: "HDFC Bank", symbol: "HDFCBANK.BO" },
  { name: "ICICI Bank", symbol: "ICICIBANK.NS" },
  { name: "ICICI Bank", symbol: "ICICIBANK.BO" },
  { name: "State Bank of India", symbol: "SBIN.NS" },
  { name: "State Bank of India", symbol: "SBIN.BO" },
  { name: "ITC", symbol: "ITC.NS" },
  { name: "ITC", symbol: "ITC.BO" },
  { name: "Axis Bank", symbol: "AXISBANK.NS" },
  { name: "Axis Bank", symbol: "AXISBANK.BO" },
  { name: "Wipro", symbol: "WIPRO.NS" },
  { name: "Wipro", symbol: "WIPRO.BO" },
  { name: "Vedanta", symbol: "VEDL.NS" },
  { name: "Vedanta", symbol: "VEDL.BO" },
  { name: "Larsen & Toubro", symbol: "LT.NS" },
  { name: "Larsen & Toubro", symbol: "LT.BO" },
  { name: "Tata Motors", symbol: "TATAMOTORS.NS" },
  { name: "Tata Motors", symbol: "TATAMOTORS.BO" },
  { name: "Bharti Airtel", symbol: "BHARTIARTL.NS" },
  { name: "Bharti Airtel", symbol: "BHARTIARTL.BO" },
  { name: "Maruti Suzuki", symbol: "MARUTI.NS" },
  { name: "Maruti Suzuki", symbol: "MARUTI.BO" },
  { name: "Sun Pharmaceutical", symbol: "SUNPHARMA.NS" },
  { name: "Sun Pharmaceutical", symbol: "SUNPHARMA.BO" },
  { name: "Cipla", symbol: "CIPLA.NS" },
  { name: "Cipla", symbol: "CIPLA.BO" },
  { name: "Dr Reddy's", symbol: "DRREDDY.NS" },
  { name: "Dr Reddy's", symbol: "DRREDDY.BO" },
  { name: "Mahindra & Mahindra", symbol: "M&M.NS" },
  { name: "Mahindra & Mahindra", symbol: "M&M.BO" },
  { name: "Tata Steel", symbol: "TATASTEEL.NS" },
  { name: "Tata Steel", symbol: "TATASTEEL.BO" },
  { name: "Subex", symbol: "SUBEX.NS" },
  { name: "Subex", symbol: "SUBEX.BO" },
  { name: "Deltacorp", symbol: "DELTACORP.NS" },
  { name: "Deltacorp", symbol: "DELTACORP.BO" },
  { name: "Rama Steel", symbol: "RAMASTEEL.NS" },
  { name: "Rama Steel", symbol: "RAMASTEEL.BO" },
  { name: "CESC", symbol: "CESC.NS" },
  { name: "CESC", symbol: "CESC.BO" },
  { name: "JSW Steel", symbol: "JSWSTEEL.NS" },
  { name: "JSW Steel", symbol: "JSWSTEEL.BO" },
  { name: "NTPC", symbol: "NTPC.NS" },
  { name: "NTPC", symbol: "NTPC.BO" },
  { name: "Power Grid", symbol: "POWERGRID.NS" },
  { name: "Power Grid", symbol: "POWERGRID.BO" },
  { name: "UltraTech Cement", symbol: "ULTRACEMCO.NS" },
  { name: "UltraTech Cement", symbol: "ULTRACEMCO.BO" },
  { name: "Hindustan Unilever", symbol: "HINDUNILVR.NS" },
  { name: "Hindustan Unilever", symbol: "HINDUNILVR.BO" },
  { name: "Kotak Mahindra Bank", symbol: "KOTAKBANK.NS" },
  { name: "Kotak Mahindra Bank", symbol: "KOTAKBANK.BO" },
  { name: "IndusInd Bank", symbol: "INDUSINDBK.NS" },
  { name: "IndusInd Bank", symbol: "INDUSINDBK.BO" },
  { name: "Asian Paints", symbol: "ASIANPAINT.NS" },
  { name: "Asian Paints", symbol: "ASIANPAINT.BO" },
  { name: "Bajaj Finance", symbol: "BAJFINANCE.NS" },
  { name: "Bajaj Finance", symbol: "BAJFINANCE.BO" },
  { name: "HCLTech", symbol: "HCLTECH.NS" },
  { name: "HCLTech", symbol: "HCLTECH.BO" },
  { name: "Tech Mahindra", symbol: "TECHM.NS" },
  { name: "Tech Mahindra", symbol: "TECHM.BO" },
  { name: "Oil & Natural Gas", symbol: "ONGC.NS" },
  { name: "Oil & Natural Gas", symbol: "ONGC.BO" },
  { name: "Indian Oil", symbol: "IOC.NS" },
  { name: "Indian Oil", symbol: "IOC.BO" },
  { name: "Bharat Electronics", symbol: "BEL.NS" },
  { name: "Bharat Electronics", symbol: "BEL.BO" },
  { name: "Titan Company", symbol: "TITAN.NS" },
  { name: "Titan Company", symbol: "TITAN.BO" }
];

const fallbackPriceMap = {
  "RELIANCE.NS": [2420, 2440, 2462, 2435, 2480, 2512, 2508, 2496, 2525, 2542, 2561, 2578, 2585, 2590, 2604, 2612, 2620, 2635, 2648, 2662, 2674, 2661, 2650, 2638, 2649, 2667, 2685, 2678, 2692, 2708],
  "TCS.NS": [3600, 3598, 3585, 3608, 3625, 3650, 3671, 3655, 3647, 3662, 3678, 3690, 3706, 3722, 3711, 3688, 3675, 3694, 3715, 3730, 3745, 3765, 3758, 3742, 3728, 3738, 3750, 3772, 3788, 3805],
  "INFY.NS": [1545, 1552, 1560, 1568, 1562, 1570, 1582, 1590, 1584, 1596, 1608, 1615, 1623, 1638, 1644, 1637, 1628, 1632, 1646, 1658, 1665, 1659, 1668, 1676, 1682, 1675, 1688, 1700, 1715, 1728],
  "HDFCBANK.NS": [1665, 1670, 1662, 1678, 1685, 1692, 1701, 1712, 1704, 1715, 1720, 1732, 1738, 1740, 1735, 1748, 1756, 1762, 1768, 1775, 1782, 1776, 1769, 1774, 1785, 1792, 1801, 1797, 1805, 1818],
  "ICICIBANK.NS": [1015, 1018, 1024, 1028, 1030, 1038, 1042, 1045, 1049, 1058, 1064, 1059, 1068, 1076, 1080, 1085, 1080, 1088, 1096, 1104, 1108, 1102, 1110, 1118, 1126, 1132, 1129, 1138, 1148, 1155],
  "SBIN.NS": [820, 822, 828, 834, 839, 845, 851, 858, 864, 868, 873, 882, 876, 870, 877, 884, 890, 896, 902, 908, 915, 922, 928, 931, 940, 947, 955, 949, 962, 974],
  "ITC.NS": [450, 452, 448, 456, 460, 464, 469, 472, 468, 470, 474, 478, 480, 483, 487, 491, 488, 486, 489, 494, 500, 497, 495, 499, 503, 508, 514, 510, 505, 512],
  "AXISBANK.NS": [1088, 1090, 1082, 1095, 1101, 1108, 1114, 1117, 1122, 1129, 1135, 1138, 1141, 1145, 1150, 1146, 1142, 1147, 1154, 1160, 1158, 1165, 1172, 1180, 1174, 1183, 1192, 1204, 1211, 1220],
  "WIPRO.NS": [420, 424, 427, 431, 429, 433, 436, 438, 440, 437, 442, 448, 451, 447, 445, 449, 454, 457, 461, 465, 469, 472, 468, 465, 470, 475, 482, 479, 485, 490],
  "VEDL.NS": [458, 462, 454, 447, 450, 455, 459, 463, 467, 470, 466, 461, 455, 448, 452, 459, 464, 468, 472, 476, 473, 469, 463, 470, 477, 481, 486, 492, 498, 505]
};

const defaultSignalPicks = [
  { type: "buy", stock: { name: "Reliance Industries", symbol: "RELIANCE.NS" }, signalText: "BUY at ₹2675.20 (Trend up, strong momentum)" },
  { type: "buy", stock: { name: "Infosys", symbol: "INFY.NS" }, signalText: "BUY at ₹1728.00 (Trend up, RSI support)" },
  { type: "buy", stock: { name: "Tata Consultancy Services", symbol: "TCS.NS" }, signalText: "BUY at ₹3805.00 (Trend up, MACD bullish)" },
  { type: "buy", stock: { name: "State Bank of India", symbol: "SBIN.NS" }, signalText: "BUY at ₹974.00 (Trend up, lower band support)" },
  { type: "buy", stock: { name: "ITC", symbol: "ITC.NS" }, signalText: "BUY at ₹512.00 (Trend up, volume confirmation)" },
  { type: "sell", stock: { name: "Tata Motors", symbol: "TATAMOTORS.NS" }, signalText: "SELL at ₹536.59 (Trend down, MACD bearish)" },
  { type: "sell", stock: { name: "Oil & Natural Gas", symbol: "ONGC.NS" }, signalText: "SELL at ₹232.25 (Trend down, RSI weak)" },
  { type: "sell", stock: { name: "Wipro", symbol: "WIPRO.NS" }, signalText: "SELL at ₹180.95 (Trend down, resistance zone)" },
  { type: "sell", stock: { name: "Vedanta", symbol: "VEDL.NS" }, signalText: "SELL at ₹505.00 (Trend down, MACD bearish)" },
  { type: "sell", stock: { name: "ICICI Bank", symbol: "ICICIBANK.NS" }, signalText: "SELL at ₹1155.00 (Trend down, upper band pressure)" }
];

function generateRecentDateLabels(length) {
  const labels = [];
  const today = new Date();

  for (let i = length - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    labels.push(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }));
  }

  return labels;
}

function dedupeStockList(list) {
  const uniqueMap = new Map();

  list.forEach(stock => {
    const key = `${stock.name.toLowerCase()}|${stock.symbol.toUpperCase()}`;
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, stock);
    }
  });

  return Array.from(uniqueMap.values());
}

function setSignal(message, type = "hold") {
  const signalBox = document.getElementById("signalBox");
  if (!signalBox) return;

  signalBox.className = `signalBox ${type}`;
  signalBox.innerText = message;
}

function setLoadingState() {
  const signalBox = document.getElementById("signalBox");
  if (!signalBox) return;

  signalBox.className = "signalBox loading";
  signalBox.innerText = "Loading stock signal...";
}

function fetchWithProxy(url) {
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  return fetch(proxyUrl);
}

function getLocalPriceSeries(symbol) {
  const key = symbol.toUpperCase();
  const fallback = fallbackPriceMap[key];
  if (fallback && fallback.length) {
    return {
      prices: fallback.slice(),
      labels: generateRecentDateLabels(fallback.length)
    };
  }

  const hash = Array.from(symbol).reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const base = 50 + (hash % 250);
  const prices = [];
  let value = base;

  for (let i = 0; i < 30; i++) {
    const drift = ((Math.sin(i + hash) + 1) * 6) + (i % 5) - 2;
    value += drift;
    prices.push(Number(value.toFixed(2)));
  }

  return {
    prices,
    labels: generateRecentDateLabels(prices.length)
  };
}

function getCurrentPriceOverride(data) {
  if (!data) return null;

  if (typeof data.currentPrice === 'number' && Number.isFinite(data.currentPrice)) {
    return data.currentPrice;
  }

  if (typeof data.latestPrice === 'number' && Number.isFinite(data.latestPrice)) {
    return data.latestPrice;
  }

  const chartMeta = data?.chart?.result?.[0]?.meta || {};
  const candidate = Number(chartMeta.regularMarketPrice ?? chartMeta.currentPrice ?? chartMeta.previousClose ?? NaN);
  return Number.isFinite(candidate) ? candidate : null;
}

async function fetchChartData(symbol) {
  const key = symbol.toUpperCase();

  if (location.hostname.includes("github.io") || location.protocol === "file:") {
    return { localOnly: true, data: getLocalPriceSeries(key) };
  }

  if (location.hostname.includes("vercel.app") || location.hostname.includes("netlify.app")) {
    try {
      const response = await fetch(`/api/price?symbol=${encodeURIComponent(symbol)}`, { cache: "no-store" });
      if (!response.ok) throw new Error(`Backend price request failed: ${response.status}`);
      const data = await response.json();
      if (Array.isArray(data.prices) && Array.isArray(data.labels)) {
        return { localOnly: data.localOnly === true, data };
      }
      throw new Error('Backend response missing price arrays');
    } catch (err) {
      console.warn("Backend price API unavailable. Falling back to local data.", err);
      return { localOnly: true, data: getLocalPriceSeries(key) };
    }
  }

  const directUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=3mo`;

  try {
    const response = await fetch(directUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`Direct request failed: ${response.status}`);
    return { localOnly: false, data: await response.json() };
  } catch (directError) {
    console.warn("Direct Yahoo fetch failed; trying proxy.", directError);
    try {
      const proxyResponse = await fetchWithProxy(directUrl);
      if (!proxyResponse.ok) throw new Error(`Proxy request failed: ${proxyResponse.status}`);
      return { localOnly: false, data: await proxyResponse.json() };
    } catch (proxyError) {
      console.warn("Proxy fetch also failed. Falling back to local prices.", proxyError);
      return { localOnly: true, data: getLocalPriceSeries(key) };
    }
  }
}

async function fetchBackendStockMatches(query) {
  try {
    const response = await fetch(`/api/stocks?q=${encodeURIComponent(query)}`);
    if (!response.ok) return [];
    const result = await response.json();
    return Array.isArray(result.items) ? result.items : [];
  } catch (err) {
    console.warn("Backend stock lookup unavailable.", err);
    return [];
  }
}

async function loadStockList() {
  try {
    stockList = fallbackStockList.slice();

    try {
      const localResponse = await fetch("stocks.json", { cache: "no-store" });
      if (localResponse.ok) {
        const localData = await localResponse.json();
        if (Array.isArray(localData) && localData.length) {
          stockList = dedupeStockList([...stockList, ...localData]);
        }
      }
    } catch (_) {
      // Local JSON may be blocked when opened as a file; fallback to built-in list.
    }

    if (location.protocol !== "file:" && stockList.length < 200) {
      try {
        const response = await fetchWithProxy("https://nsearchives.nseindia.com/content/equities/sec_list.csv");
        const text = await response.text();
        const rows = text.split(/\r?\n/).slice(1);

        rows.forEach(row => {
          const cols = row.split(",");
          if (cols.length > 2) {
            const symbol = cols[0].trim();
            const name = cols[2].trim();
            if (symbol && name && !symbol.includes("SYMBOL")) {
              const found = stockList.some(item => item.symbol.toUpperCase() === (symbol + ".NS").toUpperCase());
              if (!found) {
                stockList.push({ name: name, symbol: symbol + ".NS" });
              }
            }
          }
        });
      } catch (err) {
        console.warn("Remote NSE list unavailable; using built-in and local list.", err);
      }
    }

    stockList = dedupeStockList(stockList);

    if (!stockList.length) {
      stockList = fallbackStockList.slice();
    }

    console.log("Loaded stock list:", stockList.length);
  } catch (err) {
    console.error("Error loading stock list", err);
    stockList = fallbackStockList.slice();
    setSignal("Using local stock list because remote stock data is blocked in this browser.", "hold");
  }
}

function normalizeSearchText(text) {
  return String(text || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getStockSearchScore(stock, query) {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return 0;

  const rawSymbol = stock.symbol.replace(/\.(NS|BO)$/i, "").toUpperCase();
  const symbol = rawSymbol.toUpperCase();
  const name = stock.name.toLowerCase();
  const normalizedQuery = normalizeSearchText(trimmedQuery);
  const normalizedSymbol = normalizeSearchText(symbol);
  const normalizedName = normalizeSearchText(name);

  if (symbol === trimmedQuery.toUpperCase()) return 1000;
  if (symbol.startsWith(trimmedQuery.toUpperCase())) return 950;
  if (normalizedSymbol.includes(normalizedQuery)) return 800;
  if (name === trimmedQuery.toLowerCase()) return 700;
  if (name.startsWith(trimmedQuery.toLowerCase())) return 650;
  if (normalizedName.includes(normalizedQuery)) return 500;

  const words = name.split(/\s+/);
  const keywordMatch = words.some(word => word.toLowerCase().startsWith(trimmedQuery.toLowerCase()));
  if (keywordMatch) return 350;

  return 0;
}

function selectStock(stock) {
  const stockInput = document.getElementById("stockInput");
  const suggestions = document.getElementById("suggestions");

  if (!stock || !stock.symbol) return;

  const normalized = {
    name: stock.name,
    symbol: stock.symbol.toUpperCase().endsWith('.NS') || stock.symbol.toUpperCase().endsWith('.BO')
      ? stock.symbol.toUpperCase()
      : `${stock.symbol.toUpperCase()}.NS`
  };

  if (!stockList.some(item => item.symbol.toUpperCase() === normalized.symbol)) {
    stockList.push(normalized);
  }

  if (stockInput) {
    stockInput.value = normalized.symbol.replace(/\.(NS|BO)$/i, "");
  }

  if (suggestions) {
    suggestions.innerHTML = "";
  }

  loadStock();
}

function setupStockSearch() {
  const stockInput = document.getElementById("stockInput");
  const suggestions = document.getElementById("suggestions");

  if (!stockInput || !suggestions) return;

  stockInput.addEventListener("input", async function () {
    const input = this.value.trim();
    suggestions.innerHTML = "";

    if (!input) return;

    let matches = [];

    if (location.hostname.includes("vercel.app") || location.hostname.includes("netlify.app")) {
      const backendMatches = await fetchBackendStockMatches(input);
      matches = backendMatches.map(item => ({ stock: item }));
    }

    if (!matches.length) {
      matches = stockList
        .map(stock => ({ stock, score: getStockSearchScore(stock, input) }))
        .filter(item => item.score > 0)
        .sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return a.stock.name.localeCompare(b.stock.name);
        })
        .slice(0, 8);
    }

    if (!matches.length) {
      const empty = document.createElement("div");
      empty.className = "empty-item";
      empty.textContent = "No matching stock found";
      suggestions.appendChild(empty);
      return;
    }

    matches.forEach(({ stock }) => {
      const div = document.createElement("div");
      div.className = "suggestion-item";
      const symbolText = stock.symbol.replace(/\.(NS|BO)$/i, "");
      div.innerHTML = `
        <div class="suggestion-main">
          <span class="suggestion-symbol">${symbolText}</span>
          <span class="suggestion-name">${stock.name}</span>
        </div>
      `;
      div.onclick = () => selectStock(stock);
      suggestions.appendChild(div);
    });
  });

  stockInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      loadStock();
    }
  });
}

function renderSignalSidebar(items) {
  const sidebar = document.getElementById("signalSidebar");
  if (!sidebar) return;

  const buyItems = items.filter(item => item.type === "buy").slice(0, 5);
  const sellItems = items.filter(item => item.type === "sell").slice(0, 5);
  const visible = [...buyItems, ...sellItems];

  if (!visible.length) {
    sidebar.innerHTML = '<div class="sidebar-text">No strong signals right now.</div>';
    return;
  }

  const renderGroup = (title, groupItems) => `
    <div class="sidebar-section">
      <div class="sidebar-title">${title}</div>
      ${groupItems.map(item => `
        <div class="sidebar-item ${item.type}" data-symbol="${item.stock.symbol}">
          <div class="sidebar-topline">
            <span class="sidebar-symbol">${item.stock.symbol.replace(/\.(NS|BO)$/i, "")}</span>
            <span class="sidebar-tag ${item.type}">${item.type.toUpperCase()}</span>
          </div>
          <div class="sidebar-text">${item.signalText}</div>
        </div>
      `).join("")}
    </div>
  `;

  sidebar.innerHTML = `${renderGroup("BUY", buyItems)}${renderGroup("SELL", sellItems)}`;

  sidebar.querySelectorAll(".sidebar-item").forEach(node => {
    node.addEventListener("click", () => {
      const symbol = node.dataset.symbol;
      const stock = stockList.find(item => item.symbol.toUpperCase() === symbol.toUpperCase()) || { symbol, name: symbol };
      if (stock) {
        const input = document.getElementById("stockInput");
        if (input) {
          input.value = symbol.replace(/\.(NS|BO)$/i, "");
        }
        loadStock();
      }
    });
  });
}

async function populateSignalSidebar() {
  const sidebar = document.getElementById("signalSidebar");
  if (!sidebar) return;

  sidebar.innerHTML = '<div class="sidebar-text">Scanning strong setups...</div>';

  const results = [];
  const shortlist = dedupeStockList(stockList)
    .filter(stock => stock.symbol && (stock.symbol.toUpperCase().endsWith('.NS') || stock.symbol.toUpperCase().endsWith('.BO')))
    .slice(0, 18);

  for (const stock of shortlist) {
    try {
      const response = await fetchChartData(stock.symbol);
      const result = response.data;
      let prices = [];

      if (response.localOnly || (Array.isArray(result.prices) && Array.isArray(result.labels))) {
        prices = result.prices;
      } else if (result && result.chart && result.chart.result && result.chart.result[0]) {
        const rawClose = result.chart.result[0].indicators.quote[0].close || [];
        prices = rawClose.filter(price => typeof price === 'number' && !Number.isNaN(price));
      }

      if (!prices.length) continue;

      const signal = evaluateTechnicalSignal(prices);
      if (signal.type !== 'hold' && signal.strength >= 2) {
        results.push({ stock, type: signal.type, signalText: signal.text });
      }
    } catch (err) {
      console.warn("Sidebar signal scan failed for", stock.symbol, err);
    }
  }

  const buyResults = results.filter(item => item.type === "buy").slice(0, 5);
  const sellResults = results.filter(item => item.type === "sell").slice(0, 5);

  const fallbackBuy = defaultSignalPicks.filter(item => item.type === "buy").slice(0, 5 - buyResults.length);
  const fallbackSell = defaultSignalPicks.filter(item => item.type === "sell").slice(0, 5 - sellResults.length);

  renderSignalSidebar([
    ...buyResults,
    ...sellResults,
    ...fallbackBuy,
    ...fallbackSell
  ]);
}

window.addEventListener("DOMContentLoaded", () => {
  setupStockSearch();
  loadStockList().finally(() => {
    populateSignalSidebar();
  });
});

function evaluateTechnicalSignal(validPrices) {
  if (!validPrices || !validPrices.length) {
    return { type: 'hold', text: 'No price data', strength: 0 };
  }

  const latestPrice = validPrices[validPrices.length - 1];
  const rsi = calculateRSI(validPrices);
  const ma20 = movingAverage(validPrices, 20);
  const ma10 = movingAverage(validPrices, 10);
  const ema12 = calculateEMA(validPrices, 12);
  const ema26 = calculateEMA(validPrices, 26);
  const { macd, signalLine } = calculateMACD(validPrices);
  const bollinger = calculateBollingerBands(validPrices, 20);
  const vwap = calculateVWAP(validPrices.slice(-20));

  const priceAboveMA = latestPrice > ma20;
  const priceBelowMA = latestPrice < ma20;
  const shortTrendUp = ma10 > ma20;
  const shortTrendDown = ma10 < ma20;
  const emaTrendUp = ema12 > ema26;
  const emaTrendDown = ema12 < ema26;
  const macdBullish = macd > signalLine;
  const macdBearish = macd < signalLine;
  const priceNearLowerBand = latestPrice <= bollinger.lower;
  const priceNearUpperBand = latestPrice >= bollinger.upper;
  const priceAboveVWAP = latestPrice > vwap;
  const priceBelowVWAP = latestPrice < vwap;

  const recentWindow = Math.max(5, Math.min(10, validPrices.length - 1));
  const previousValue = validPrices[validPrices.length - recentWindow] || validPrices[0];
  const recentPercent = previousValue === 0 ? 0 : ((latestPrice - previousValue) / previousValue) * 100;

  const bullishTrend = latestPrice > ma10 && ma10 > ma20 && ema12 > ema26 && priceAboveMA;
  const bearishTrend = latestPrice < ma10 && ma10 < ma20 && ema12 < ema26 && priceBelowMA;
  const bullishMomentum = macdBullish && ((rsi >= 45 && rsi <= 75) || rsi < 35);
  const bearishMomentum = macdBearish && ((rsi <= 55 && rsi >= 25) || rsi > 65);

  const strongBuy = (bullishTrend && bullishMomentum) || (recentPercent > 1.5 && priceAboveMA && macdBullish) || (rsi < 35 && macdBullish && priceAboveMA && priceAboveVWAP);
  const strongSell = (bearishTrend && bearishMomentum) || (recentPercent < -1.5 && priceBelowMA && macdBearish) || (rsi > 65 && macdBearish && priceBelowMA && priceBelowVWAP);

  if (strongBuy) {
    return {
      type: 'buy',
      text: `BUY at ₹${latestPrice.toFixed(2)} (Trend up, RSI ${rsi.toFixed(1)}, MACD bullish)`,
      strength: 3
    };
  }

  if (strongSell) {
    return {
      type: 'sell',
      text: `SELL at ₹${latestPrice.toFixed(2)} (Trend down, RSI ${rsi.toFixed(1)}, MACD bearish)`,
      strength: 3
    };
  }

  if (priceNearLowerBand && macdBullish && rsi < 50) {
    return {
      type: 'buy',
      text: `BUY at ₹${latestPrice.toFixed(2)} (Lower band support, RSI ${rsi.toFixed(1)})`,
      strength: 2
    };
  }

  if (priceNearUpperBand && macdBearish && rsi > 50) {
    return {
      type: 'sell',
      text: `SELL at ₹${latestPrice.toFixed(2)} (Upper band resistance, RSI ${rsi.toFixed(1)})`,
      strength: 2
    };
  }

  return {
    type: 'hold',
    text: `HOLD at ₹${latestPrice.toFixed(2)} (RSI ${rsi.toFixed(1)}, mixed trend)`,
    strength: 0
  };
}

function calculateRSI(prices, period = 14) {
  if (prices.length < 2) return 50;

  let gains = 0;
  let losses = 0;

  const totalPeriods = Math.min(period, prices.length - 1);
  for (let i = 1; i <= totalPeriods; i++) {
    const diff = prices[prices.length - totalPeriods + i - 1] - prices[prices.length - totalPeriods + i - 2];
    if (diff >= 0) gains += diff; else losses += Math.abs(diff);
  }

  const avgGain = gains / Math.max(1, totalPeriods);
  const avgLoss = losses / Math.max(1, totalPeriods);
  const rs = avgLoss === 0 ? 1 : avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
}

function movingAverage(prices, period = 20) {
  const data = prices.slice(-period);
  return data.reduce((a, b) => a + b, 0) / Math.max(1, data.length);
}

function calculateEMA(prices, period = 12) {
  if (!prices.length) return 0;
  if (prices.length === 1) return prices[0];

  const multiplier = 2 / (period + 1);
  let ema = prices[0];

  for (let i = 1; i < prices.length; i++) {
    ema = (prices[i] - ema) * multiplier + ema;
  }

  return ema;
}

function calculateMACD(prices, short = 12, long = 26, signal = 9) {
  const emaShort = calculateEMA(prices.slice(-short), short);
  const emaLong = calculateEMA(prices.slice(-long), long);
  const macd = emaShort - emaLong;
  const recentPrices = prices.slice(-signal);
  const signalLine = recentPrices.length ? calculateEMA(recentPrices, signal) : macd;
  return { macd, signalLine };
}

function calculateBollingerBands(prices, period = 20, stdDevMultiplier = 2) {
  const values = prices.slice(-period);
  const mid = movingAverage(values, period);
  const variance = values.reduce((sum, price) => sum + (price - mid) ** 2, 0) / Math.max(1, values.length);
  const stdDev = Math.sqrt(variance);
  return {
    middle: mid,
    upper: mid + (stdDevMultiplier * stdDev),
    lower: mid - (stdDevMultiplier * stdDev)
  };
}

function calculateVWAP(prices) {
  if (!prices.length) return 0;
  return prices.reduce((sum, price) => sum + price, 0) / prices.length;
}

async function loadStock() {
  const stockInput = document.getElementById("stockInput");
  const signalBox = document.getElementById("signalBox");

  if (!stockInput || !signalBox) return;

  const input = stockInput.value.trim().toUpperCase().replace(/\.(NS|BO)$/i, "");

  if (!input) {
    setSignal("Please enter a stock symbol.", "hold");
    return;
  }

  let stock = stockList.find(s => s.symbol.toUpperCase() === input + ".NS")
    || stockList.find(s => s.symbol.toUpperCase() === input + ".BO");

  if (!stock) {
    stock = stockList.find(s => s.symbol.toUpperCase().includes(input + ".NS"))
      || stockList.find(s => s.symbol.toUpperCase().includes(input + ".BO"));
  }

  if (!stock) {
    const fallback = fallbackStockList.find(s => s.symbol.toUpperCase().includes(input));
    if (fallback) {
      stock = fallback;
    }
  }

  if (!stock) {
    setSignal("Invalid symbol. Try again.", "hold");
    return;
  }

  setLoadingState();

  const cacheKey = stock.symbol.toUpperCase();
  let validPrices = null;
  let labels = null;
  const forceFresh = true;

  if (!forceFresh && stockCache[cacheKey]) {
    validPrices = stockCache[cacheKey].prices;
    labels = stockCache[cacheKey].labels;
  } else {
    try {
      const response = await fetchChartData(stock.symbol);
      const result = response.data;

      if (response.localOnly || (Array.isArray(result.prices) && Array.isArray(result.labels))) {
        validPrices = result.prices;
        labels = result.labels;
      } else if (!result.chart || !result.chart.result || !result.chart.result[0]) {
        setSignal("No data found for this symbol.", "hold");
        return;
      } else {
        const prices = result.chart.result[0].indicators.quote[0].close;
        validPrices = prices.filter(price => typeof price === "number" && !Number.isNaN(price));
        labels = result.chart.result[0].timestamp.map(ts => new Date(ts * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }));
      }

      const currentMarketPrice = getCurrentPriceOverride(result);
      if (currentMarketPrice !== null && validPrices.length) {
        validPrices[validPrices.length - 1] = Number(currentMarketPrice);
      }

      stockCache[cacheKey] = { prices: validPrices, labels };
    } catch (err) {
      console.error("Error loading data", err);
      validPrices = fallbackPriceMap[cacheKey] || null;
      labels = validPrices ? generateRecentDateLabels(validPrices.length) : null;

      if (!validPrices) {
        const localData = getLocalPriceSeries(stock.symbol);
        validPrices = localData.prices;
        labels = localData.labels;
      }

      stockCache[cacheKey] = { prices: validPrices, labels };
    }
  }

  if (!validPrices || !validPrices.length) {
    setSignal("No valid price data available for this symbol.", "hold");
    return;
  }

  if (!labels || labels.length !== validPrices.length) {
    labels = generateRecentDateLabels(validPrices.length);
  }

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("stockChart"), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: stock.symbol,
        data: validPrices,
        borderColor: 'blue',
        fill: false
      }]
    }
  });

  const signal = evaluateTechnicalSignal(validPrices);
  signalText = signal.text;
  signalType = signal.type;

  setSignal(`Signal: ${signalText}`, signalType);
}
