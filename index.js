var App = function(){
  var element = document.getElementById('corpo')
  var geraMensagemErro = '<div class="alert alert-danger" role="alert">'
   + 'Desculpe, não foi encontrado nenhum resultado para sua pesquisa no wikipedia'
   + '</div>'
  
  this.getWikiApi = function(pesquisa) {
    var self = this
    var request = new XMLHttpRequest()

    request.onload = function() {
      var response = JSON.parse(request.response)
      self.montaEstrtura(response)
    }
    
    request.onerror = function() {
      return console.log('Não foi encontrado nenhuma resposta referente a busca')
    }
    request.open('GET', 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + pesquisa + '&origin=*')
    request.send()
  }

  this.getSearch = function() {
    this.varSearch = document.getElementById('search').value

    if (this.varSearch == '') {
      return alert('Por favor, insira alguma pesquisa valida')
    } else {

    this.getWikiApi(this.varSearch)
    }
  }

  this.montaEstrtura = function(response) {
    var titulos = response[1]
    var conteudos = response[2]
    var links = response[3] 
    
    if (titulos.length == 0) {
      element.insertAdjacentHTML('beforeend', geraMensagemErro)
    } else {
      for (var i = 0; i < titulos.length; i++) {
       element.insertAdjacentHTML('beforeend', this.geraEstrutura(titulos[i], conteudos[i], links[i]))
      }
    }
  }
  
  this.geraEstrutura = function(title,content, link) {
    return  '<div class="row"><a class="card pesquisas" href="'+ link +'" target="_blank"><div class="card-body "><h4 class="card-title text-center">' + title + '</h4><p class="card-text">' + content
    + '</p></div></a></div>' 
  }

  this.clearResults = function() {
    element.innerHTML = ''
  }
}

document.addEventListener('DOMContentLoaded',function() {
  var app = new App()
  var formElement = document.getElementById('form');
  var status = 'anterior' 

  formElement.addEventListener('submit', function(event){

    if (status === 'anterior') {
      app.clearResults()
      event.preventDefault()
      app.getSearch()
      status = 'novo'
    } else {
      app.clearResults()
      event.preventDefault()
      app.getSearch()
      status = 'anterior'  
    }
  })
})
