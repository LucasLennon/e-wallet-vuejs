export default {
  required: e => !!e || "Campo vazio",
  emailFormat: e => !!e && !!e.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i) || "E-mail fora de formato.",
  tooSmall: e => !!e && e.length > 6 || "Deve ser maior que 6 caracteres.",
  oneLowerCase: e =>
    !!e && !!e.match(/[a-z]/g) || "Deve conter uma letra minuscula.",
  oneUppercase: e =>
    !!e && !!e.match(/[A-Z]/g) || "Deve conter uma letra maiuscula.",
  oneNumber: e => !!e && !!e.match(/[\d]/g) || "Deve conter um numero.",
  cpfLength: e => !!e && e.replace(/\D/g, '').length === 11 || 'CPF está incorreto',
}