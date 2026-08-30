const fallbackItems = [
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
  { name: 'JSW Steel', symbol: 'JSWSTEEL.NS' },
  { name: 'Tata Steel', symbol: 'TATASTEEL.NS' },
  { name: 'Bharat Electronics', symbol: 'BEL.NS' },
  { name: 'UltraTech Cement', symbol: 'ULTRACEMCO.NS' },
  { name: 'Apollo Hospitals', symbol: 'APOLLOHOSP.NS' },
  { name: 'Britannia Industries', symbol: 'BRITANNIA.NS' },
  { name: 'SBI Life Insurance', symbol: 'SBILIFE.NS' },
  { name: 'Coal India', symbol: 'COALINDIA.NS' },
  { name: 'GAIL India', symbol: 'GAIL.NS' },
  { name: 'BPCL', symbol: 'BPCL.NS' },
  { name: 'ONGC', symbol: 'ONGC.NS' }
];

async function fetchNseList() {
  const response = await fetch('https://nsearchives.nseindia.com/content/equities/sec_list.csv');
  if (!response.ok) throw new Error('NSE list fetch failed');

  const text = await response.text();
  const rows = text.split(/\r?\n/).slice(1);
  const list = [];

  rows.forEach(row => {
    const cols = row.split(',');
    if (cols.length > 2) {
      const symbol = cols[0].trim();
      const name = cols[2].trim();
      if (symbol && name && !symbol.includes('SYMBOL') && !list.some(item => item.symbol === `${symbol}.NS`)) {
        list.push({ name, symbol: `${symbol}.NS` });
      }
    }
  });

  return list;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const q = (req.query && req.query.q ? String(req.query.q) : '').trim().toLowerCase();

  try {
    const nseList = await fetchNseList();
    const merged = [...fallbackItems, ...nseList];
    const map = new Map();

    merged.forEach(item => {
      const key = `${item.name.toLowerCase()}|${item.symbol.toUpperCase()}`;
      if (!map.has(key)) map.set(key, item);
    });

    const items = Array.from(map.values())
      .filter(item => {
        if (!q) return true;
        const searchable = `${item.name} ${item.symbol.replace(/\.NS$/i, '')}`.toLowerCase();
        return searchable.includes(q);
      })
      .slice(0, 20);

    res.status(200).json({ items });
  } catch (err) {
    const items = !q
      ? fallbackItems.slice(0, 20)
      : fallbackItems.filter(item => {
          const searchable = `${item.name} ${item.symbol.replace(/\.NS$/i, '')}`.toLowerCase();
          return searchable.includes(q);
        }).slice(0, 20);

    res.status(200).json({ items, fallback: true });
  }
};
