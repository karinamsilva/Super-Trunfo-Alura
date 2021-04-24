var carta1 = {
  nome: "Seiya de Pégaso",
  imagem:
    "https://static.wikia.nocookie.net/ssu/images/a/ac/Seiya_AD_GB_card_2.png",
  audio: "https://www.myinstants.com/media/sounds/mteoro-de-pegaso.mp3",
  atributos: {
    ataque: 89,
    defesa: 78,
    magia: 95
  }
};

var carta2 = {
  nome: "Hyoga de Cisne",
  imagem: "https://static.wikia.nocookie.net/ssu/images/f/f6/1957.jpg",
  audio:
    "https://www.myinstants.com/media/sounds/whatsapp-audio-2020-03-01-at-16.mp3",
  atributos: {
    ataque: 92,
    defesa: 75,
    magia: 90
  }
};

var carta3 = {
  nome: "Shiryu de Dragão",
  imagem:
    "https://static.wikia.nocookie.net/ssu/images/c/c9/Shiryu_AD_GB_card.png",
  audio:
    "https://www.myinstants.com/media/sounds/mytone-shiryu-colera-do-dragao.mp3",
  atributos: {
    ataque: 89,
    defesa: 91,
    magia: 91
  }
};
var carta4 = {
  nome: "Shun de Andrômeda",
  imagem: " https://static.wikia.nocookie.net/ssu/images/5/54/1955.jpg",
  audio: "https://www.myinstants.com/media/sounds/shun.mp3",
  atributos: {
    ataque: 90,
    defesa: 80,
    magia: 94
  }
};
var carta5 = {
  nome: "Ikki de Fênix",
  imagem: "https://static.wikia.nocookie.net/ssu/images/0/0d/1150.jpg",
  audio: "https://www.myinstants.com/media/sounds/queime.mp3",
  atributos: {
    ataque: 95,
    defesa: 90,
    magia: 98
  }
};
var carta6 = {
  nome: "Athena - Super Trunfo",
  imagem:
    "https://i.pinimg.com/originals/02/37/53/023753ceb7f8ad20b1fa4e520436d898.jpg",
  audio: "https://www.myinstants.com/media/sounds/saori-san.mp3",
  atributos: {
    ataque: 100,
    defesa: 100,
    magia: 100
  }
};
var empate = {
  audio:
    "https://www.myinstants.com/media/sounds/02-sanctuary-precept-of-death-mp3cut.mp3"
};

var cartas = [carta1, carta2, carta3, carta4, carta5, carta6];

var cartaMaquina;
var cartaJogador;

//            0           1           2          3         4            5            6           7

var pontosJogador = 0;
var pontosMaquina = 0;

atualizaPlacar();
atualizaQuantidadeDeCartas();

function atualizaQuantidadeDeCartas() {
  var divQuantidadeCartas = document.getElementById("quantidade-cartas");
  var html = "Quantidade de cartas no jogo: " + cartas.length;
  divQuantidadeCartas.innerHTML = html;
}

function atualizaPlacar() {
  var divPlacar = document.getElementById("placar");
  var html = "Jogador " + pontosJogador + "/" + pontosMaquina + " Máquina";
  divPlacar.innerHTML = html;
}

function sortearCarta() {
  var numeroCartaMaquina = parseInt(Math.random() * cartas.length);
  cartaMaquina = cartas[numeroCartaMaquina];
  cartas.splice(numeroCartaMaquina, 1);
  var numeroCartaJogador = parseInt(Math.random() * cartas.length);

  cartaJogador = cartas[numeroCartaJogador];
  cartas.splice(numeroCartaJogador, 1);

  document.getElementById("btnSortear").disabled = true;
  document.getElementById("btnJogar").disabled = false;

  exibeCartaJogador();
}
function proximaRodada() {
  var divCartas = document.getElementById("cartas");
  divCartas.innerHTML = `<div id="carta-jogador" class="carta"></div> <div id="carta-maquina" class="carta"></div>`;

  document.getElementById("btnSortear").disabled = false;
  document.getElementById("btnJogar").disabled = true;
  document.getElementById("btnProximaRodada").disabled = true;

  var divResultado = document.getElementById("resultado");
  divResultado.innerHTML = "";
}

function exibeCartaJogador() {
  var divCartaJogador = document.getElementById("carta-jogador");
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
  divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`;
  var nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`;
  var opcoesTexto = "";

  for (var atributo in cartaJogador.atributos) {
    opcoesTexto +=
      "<input type='radio' name='atributo' value='" +
      atributo +
      "'>" +
      atributo +
      " " +
      cartaJogador.atributos[atributo] +
      "<br>";
  }

  var html = "<div id='opcoes' class='carta-status'>";

  divCartaJogador.innerHTML = moldura + nome + html + opcoesTexto + "</div>";
}

function obtemAtributoSelecionado() {
  var radioAtributo = document.getElementsByName("atributo");
  for (var i = 0; i < radioAtributo.length; i++) {
    if (radioAtributo[i].checked) {
      return radioAtributo[i].value;
    }
  }
}

function jogar() {
  var divResultado = document.getElementById("resultado");
  var atributoSelecionado = obtemAtributoSelecionado();

  if (cartaJogador == carta6) {
    pontosJogador += 5;
    cartas.length = 0;
    var som = new Audio(cartaJogador.audio);
    som.play();
    document.getElementById("btnProximaRodada").disabled = true;
    document.getElementById("btnJogar").disabled = true;
    document.getElementById("btnSortear").disabled = true;
  }
  if (cartaMaquina == carta6) {
    pontosMaquina += 5;
    cartas.length = 0;
    var som = new Audio(cartaMaquina.audio);
    som.play();
    document.getElementById("btnProximaRodada").disabled = true;
    document.getElementById("btnJogar").disabled = true;
    document.getElementById("btnSortear").disabled = true;
  }

  if (
    cartaJogador.atributos[atributoSelecionado] >
    cartaMaquina.atributos[atributoSelecionado]
  ) {
    htmlResultado = '<p class="resultado-final">Venceu</p>';
    var som = new Audio(cartaJogador.audio);
    som.play();
    pontosJogador++;
  } else if (
    cartaJogador.atributos[atributoSelecionado] <
    cartaMaquina.atributos[atributoSelecionado]
  ) {
    htmlResultado = '<p class="resultado-final">Perdeu</p>';
    var som = new Audio(cartaMaquina.audio);
    som.play();
    pontosMaquina++;
  } else {
    htmlResultado = '<p class="resultado-final">Empatou</p>';
  }

  if (cartas.length == 0) {
    alert("Fim de Jogo");
    if (pontosJogador > pontosMaquina) {
      htmlResultado = '<p class="resultado-final">Venceu</p>';
    } else if (pontosMaquina > pontosJogador) {
      htmlResultado = '<p class="resultado-final">Perdeu</p>';
    } else {
      htmlResultado = '<p class="resultado-final">Empatou</p>';
    }
  } else {
    document.getElementById("btnProximaRodada").disabled = false;
  }

  divResultado.innerHTML = htmlResultado;
  exibeCartaMaquina();

  document.getElementById("btnJogar").disabled = true;
  atualizaPlacar();
  atualizaQuantidadeDeCartas();
}

function exibeCartaMaquina() {
  var divCartaMaquina = document.getElementById("carta-maquina");
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
  divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`;
  var nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`;
  var opcoesTexto = "";

  for (var atributo in cartaMaquina.atributos) {
    console.log(atributo);
    opcoesTexto +=
      "<p type='text' name='atributo' value='" +
      atributo +
      "'>" +
      atributo +
      " " +
      cartaMaquina.atributos[atributo] +
      "<br>";
  }

  var html = "<div id='opcoes' class='carta-status --spacing'>";

  divCartaMaquina.innerHTML = moldura + nome + html + opcoesTexto + "</div>";
}