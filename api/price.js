module.exports = function handler(req, res) {
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

  res.status(200).json({
    prices,
    labels,
    localOnly: true,
    symbol
  });
};
