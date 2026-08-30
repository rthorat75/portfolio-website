function buildFallbackSeries(symbol) {
  const base = 100 + (symbol.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % 400);
  const prices = [];
  let value = base;

  for (let i = 0; i < 30; i++) {
    const drift = ((Math.sin(i + symbol.length) + 1) * 8) + (i % 5) - 2;
    value += drift;
    prices.push(Number(value.toFixed(2)));
  }

  const labels = [];
  const today = new Date();
  for (let i = prices.length - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    labels.push(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }));
  }

  return { prices, labels };
}

async function fetchYahooSeries(symbol) {
  const normalized = symbol.toUpperCase().endsWith('.NS') || symbol.toUpperCase().endsWith('.BO') ? symbol.toUpperCase() : `${symbol.toUpperCase()}.NS`;
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(normalized)}?interval=1d&range=3mo`;
  const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });

  if (!response.ok) throw new Error(`Yahoo fetch failed: ${response.status}`);

  const json = await response.json();
  const chart = json?.chart?.result?.[0];
  if (!chart) throw new Error('Chart result missing');

  const closes = chart.indicators?.quote?.[0]?.close || [];
  const timestamps = chart.timestamp || [];
  const validPrices = closes.filter(price => typeof price === 'number' && !Number.isNaN(price));

  if (!validPrices.length) throw new Error('No valid close prices found');

  const labels = timestamps.map(ts => new Date(ts * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }));

  return { prices: validPrices, labels, symbol: normalized };
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const symbol = (req.query && req.query.symbol ? String(req.query.symbol) : '').trim();
  if (!symbol) {
    res.status(400).json({ error: 'symbol is required' });
    return;
  }

  try {
    const data = await fetchYahooSeries(symbol);
    res.status(200).json({
      prices: data.prices,
      labels: data.labels,
      localOnly: false,
      symbol: data.symbol
    });
  } catch (err) {
    const fallback = buildFallbackSeries(symbol);
    res.status(200).json({
      prices: fallback.prices,
      labels: fallback.labels,
      localOnly: true,
      symbol,
      fallback: true
    });
  }
};
