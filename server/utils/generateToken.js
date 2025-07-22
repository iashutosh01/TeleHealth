const crypto = require('crypto');

const generateResetToken = () => {
  const token = crypto.randomBytes(20).toString('hex');
  const hash = crypto.createHash('sha256').update(token).digest('hex');
  const expires = Date.now() + 3600000; // 1 hour
  return { token, hash, expires };
};

module.exports = generateResetToken;
