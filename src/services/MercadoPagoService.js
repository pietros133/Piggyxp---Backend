import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export const createPreference = async (product, user) => {
  const preference = {
    items: [
      {
        title: product.name,
        quantity: 1,
        currency_id: "BRL",
        unit_price: Number(product.priceBrl),
      },
    ],

    payer: {
      email: user.email,
    },

    external_reference: String(user.id),

    notification_url: process.env.MP_WEBHOOK_URL,
  };

  const response = await mercadopago.preferences.create(preference);

  return response.body;
};
