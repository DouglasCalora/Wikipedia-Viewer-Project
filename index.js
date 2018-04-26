var App = function() {
  var element = document.getElementById('corpo')

  this.getWikiApi = function(pesquisa) {
    var self = this
    var request = new XMLHttpRequest()

    request.onload = function() {
      var response = JSON.parse(request.response)
      self.buildStructure(response)
    }

    request.onerror = function() {
      return this.generateMessage('Erro na api')
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

  this.buildStructure = function(response) {
    var titles = response[1]
    var contents = response[2]
    var links = response[3] 
    
    if (titles.length == 0) {
      return element.insertAdjacentHTML('beforeend', this.generateMessage('Desculpe, não foi encontrado nenhum resultado para a sua pesquisa no wkipedia'))
    }

    for (var i = 0; i < titles.length; i++) {
      element.insertAdjacentHTML('beforeend', this.generateStructure(titles[i], contents[i], links[i]))
    }
  }
  
  this.generateStructure = function(title, content, link) {
    return '<div class="row"><a class="card pesquisas" href="'+ link +'" target="_blank"><div class="card-body ">'
    + '<h4 class="card-title text-center">' + title + '</h4> ' + (content ? '<p class="card-text">' + content
    + '</p>' : '') + '</div></a></div>' 
  }

  this.clearResults = function() {
    element.innerHTML = ''
  }

  this.generateMessage = function(message) {
    return '<div class="alert alert-danger" role="alert">' + msg + '</div>'
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var app = new App()
  var formElement = document.getElementById('form')

  formElement.addEventListener('submit', function(event) {
    event.preventDefault()
    app.clearResults()
    app.getSearch()
  })
})
