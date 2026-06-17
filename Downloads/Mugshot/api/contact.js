export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  console.log('New contact:', { name, email, message });

  res.json({
    success: true,
    message: 'Thank you for your message. We will get back to you within 24 hours.'
  });
}
