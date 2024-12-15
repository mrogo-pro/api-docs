const createParameter = (name, type, required, description) => ({
  name,
  type,
  required,
  description,
});

export const requestParams = [
  createParameter("username", "string", true, "Kullanıcı adı"),
  createParameter("password", "string", true, "Şifre")
];

export const responseParams = [
  createParameter("status", "boolean", true, "İşlem durumu"),
  createParameter("token", "string", true, "Kullanım için token")
]; 