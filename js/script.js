// função usada para carregaar os dados do produto
function loadData() {
  return fetch(
    'https://raw.githubusercontent.com/JoseGoncalvess/menu-online/refs/heads/main/assets/data.json'
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o JSON: ' + response.statusText)
      }
      return response.json()
    })
    .then(data => {
      return data
    })
}
// função que criar o modelo de pordutos para ser usando em tela
function createdProd(title, description, img, altText) {
  var titleProd = document.createElement('h3')
  titleProd.textContent = title

  var descriProd = document.createElement('p')
  descriProd.textContent = description
  var imgProd = document.createElement('img')
  imgProd.src = img
  imgProd.alt = altText
  imgProd.width = '400px'

  var produto = document.createElement('div')
  produto.appendChild(imgProd)
  produto.appendChild(titleProd)
  produto.appendChild(descriProd)

  produto.classList.add('produto')

  return produto
}
// função que criar os destaques dos produtos em promoção
async function createdProdDestaque() {
  var prods = await loadData()
  var destaqeuPod = document.getElementById('produtos-destaque')
  prods.forEach(p => {
    if (p.pricePromotion != '') {
      var newprod = createdProd(p.name, p.description, p.img, p.name)
      destaqeuPod.appendChild(newprod)
    }
  })
}

document.querySelectorAll('.produto img').forEach(img => {
  img.addEventListener('mouseenter', () => {
    console.log(`Mouse sobre: ${img.alt}`)
  })
})

// carregando os produtos em promoção
createdProdDestaque()
