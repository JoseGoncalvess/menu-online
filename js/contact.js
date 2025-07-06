const form = document.getElementById('form-contato')
const feedback = document.getElementById('mensagem-feedback')

form.addEventListener('submit', function (e) {
  e.preventDefault() // Evita o envio padrão

  const nome = document.getElementById('nome').value.trim()
  const email = document.getElementById('email').value.trim()
  const mensagem = document.getElementById('mensagem').value.trim()

  // Validação simples
  if (!nome || !email || !mensagem) {
    feedback.textContent = 'Por favor, preencha todos os campos obrigatórios.'
    feedback.className = 'mensagem-feedback erro'
    return
  }

  if (!validarEmail(email)) {
    feedback.textContent = 'Digite um e-mail válido.'
    feedback.className = 'mensagem-feedback erro'
    return
  }

  // Sucesso
  feedback.textContent = 'Mensagem enviada com sucesso! Obrigado pelo contato.'
  feedback.className = 'mensagem-feedback sucesso'

  // Resetar formulário
  form.reset()
})

function validarEmail(email) {
  // Expressão regular simples para validar email
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
