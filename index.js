const express = require('express');
const dotenv = require('dotenv');
const { verifySecret } = require('./middleware/authMiddleware')
const prisma = require('./db/config').prisma

dotenv.config();

const app = express();
app.use(express.json());

app.post('/api/shipping/create', verifySecret, async (req, res)=>{
  const {userId, productId, count} = req.body
  if (!userId || !productId || !count){
    return res.status(404).json({"error": "All fields required"})
  }
  const order = await prisma.shipping.create({
    data: {
      userId,
      productId,
      count
    }
  })
  return res.status(201).json(order)
})

app.put('/api/shipping/cancel', verifySecret, async(req, res)=>{
  const {shippingId} = req.body
  if (!shippingId) {
    return res.status(404).json({"error": "Missing shippingId"})
  }
  const order = await prisma.shipping.delete({
    where: {
      id: shippingId,
    }
  })

  return res.status(200).json(order)
})

app.get('/api/shipping/get', verifySecret, async (req, res)=>{
  const userId = req.query.userId
  if (userId) {
    const order = await prisma.shipping.findMany({
      where: {
        userId: parseInt(userId)
      }
    })
    return res.status(200).json(order)
  }
  const orders = await prisma.shipping.findMany()
  return res.status(200).json(orders)
})

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 
module.exports = app;