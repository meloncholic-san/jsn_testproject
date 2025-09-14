export function normalizeSuperpowers(req) {
  if (typeof req.body.superpowers === 'string') {
    req.body.superpowers = req.body.superpowers
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  }
}
