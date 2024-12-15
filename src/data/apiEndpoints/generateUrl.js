const createParameter = (name, type, required, description) => ({
  name,
  type,
  required,
  description,
});

export const requestParams = [
  createParameter("transaction_id", "string", true, "İşlem numarası"),
  createParameter("amount", "number", true, "Ödenecek miktar"),
  createParameter("type", "string", true, "İşlem tipi (order)")
];

export const responseParams = [
  createParameter("status", "boolean", true, "İşlem durumu"),
  createParameter("url", "string", true, "Oluşturulan ödeme URL'i"),
  createParameter("transaction_id", "string", true, "İşlem numarası"),
  createParameter("type", "string", true, "İşlem tipi (order)"),
  createParameter("token", "string", true, "İşlem için oluşturulan token")
]; 