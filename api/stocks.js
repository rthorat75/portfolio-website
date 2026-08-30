module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const q = (req.query && req.query.q ? String(req.query.q) : '').trim().toLowerCase();
  const base = [
    { name: 'Reliance Industries', symbol: 'RELIANCE.NS' },
    { name: 'Tata Consultancy Services', symbol: 'TCS.NS' },
    { name: 'Infosys', symbol: 'INFY.NS' },
    { name: 'HDFC Bank', symbol: 'HDFCBANK.NS' },
    { name: 'ICICI Bank', symbol: 'ICICIBANK.NS' },
    { name: 'State Bank of India', symbol: 'SBIN.NS' },
    { name: 'ITC', symbol: 'ITC.NS' },
    { name: 'Axis Bank', symbol: 'AXISBANK.NS' },
    { name: 'Wipro', symbol: 'WIPRO.NS' },
    { name: 'Tata Motors', symbol: 'TATAMOTORS.NS' },
    { name: 'Bharti Airtel', symbol: 'BHARTIARTL.NS' },
    { name: 'Maruti Suzuki', symbol: 'MARUTI.NS' },
    { name: 'CESC', symbol: 'CESC.NS' },
    { name: 'Deltacorp', symbol: 'DELTACORP.NS' },
    { name: 'Rama Steel', symbol: 'RAMASTEEL.NS' },
    { name: 'Subex', symbol: 'SUBEX.NS' },
    { name: 'Adani Enterprises', symbol: 'ADANIENT.NS' },
    { name: 'Adani Ports', symbol: 'ADANIPORTS.NS' },
    { name: 'NTPC', symbol: 'NTPC.NS' },
    { name: 'Power Grid', symbol: 'POWERGRID.NS' },
    { name: 'JSW Steel', symbol: 'JSWSTEEL.NS' }
  ];

  const items = !q ? base.slice(0, 10) : base.filter(stock => {
    const searchable = `${stock.name} ${stock.symbol.replace(/\.NS$/i, '')}`.toLowerCase();
    return searchable.includes(q);
  }).slice(0, 10);

  res.status(200).json({ items });
};
