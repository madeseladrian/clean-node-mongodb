export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || '7836JBhJriBJ8He00+99EM1EGFzc4T5bHy0Q0TJpEVaal2WBKHyxn5encdQMpRjVzuiKvccjnVJmIdpYBR7g=='
}
