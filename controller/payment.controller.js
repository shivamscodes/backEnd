import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

async function Gateway(req,res) {
  try {

    const { amount, email } = req.body;

     // ✅ validation
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // create product
    const product = await stripe.products.create({
      name: "Charity Donation",
      description: `Donation of ₹${amount}`,
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: amount * 100, // 100 INR
      currency: "inr",
    });

     // create session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/payment/${email}/${amount}`,
      cancel_url: "http://localhost:3000/cancel",
      customer_email: email,
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating payment session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default Gateway;
