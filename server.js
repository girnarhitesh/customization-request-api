const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// ===============================
// TEST API
// ===============================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Customization Request API is running."
  });
});

// ===============================
// CUSTOMIZATION REQUEST API
// ===============================
app.post("/submit", async (req, res) => {
  try {
    const {
      product_name,
      product_id,
      quantity,
      customization,
      customer_name,
      customer_email,
      product_price
    } = req.body;

    // Product validation
    if (!product_name) {
      return res.status(400).json({
        success: false,
        message: "Product name is required."
      });
    }

    // Quantity validation
    if (!quantity || Number(quantity) < 1) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid quantity."
      });
    }

    // Customization validation
    if (!customization || !customization.trim()) {
      return res.status(400).json({
        success: false,
        message: "Customization instructions are required."
      });
    }

    // Customer email validation
    if (!customer_email) {
      return res.status(400).json({
        success: false,
        message: "Customer email is required."
      });
    }

    // Request object
    const request = {
      id: `REQ-${Date.now()}`,
      product_name: product_name,
      product_id: product_id || null,
      quantity: Number(quantity),
      product_price: product_price || null,
      customization: customization.trim(),
      customer_name: customer_name || "",
      customer_email: customer_email,
      status: "pending",
      created_at: new Date().toISOString()
    };

    // Console mein request dikhegi
    console.log("--------------------------------");
    console.log("NEW CUSTOMIZATION REQUEST");
    console.log(request);
    console.log("--------------------------------");

    // Success response
    return res.status(200).json({
      success: true,
      message:
        "Aapka customization request successfully submit ho gaya hai. Aapko 1–2 days ke andar call back kiya jayega taaki hum aapke product aur customization details confirm kar sakein.",
      request_id: request.id
    });

  } catch (error) {
    console.error("API ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Request submit nahi ho paayi. Please try again."
    });
  }
});

// ===============================
// START SERVER
// ===============================
app.listen(PORT, () => {
  console.log(`Customization API running on port ${PORT}`);
});