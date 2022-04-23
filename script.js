let ordemAleatoria = [];
let ordemClicada = []
let pontos = 0
let contador = 0
let jogo_rodando = false
let game_over = false

let l1 = document.getElementById('1')
let l2 = document.getElementById('2')
let l3 = document.getElementById('3')
let l4 = document.getElementById('4')
let som = document.getElementById('somBotao')
let somGameOver = document.getElementById('somGameOver')

function getId(id) {

    switch (id) {
        case "1":
            acendeLuz(l1)
            checaSequencia(1)
            break;
        case "2":
            //amarelho
            acendeLuz(l2)
            checaSequencia(2)
            break;
        case "3":
            //vermelho
            acendeLuz(l3)
            checaSequencia(3)
            break;
        case "4":
            //verde
            acendeLuz(l4)
            checaSequencia(4)
            break;

        default:
            if (!jogo_rodando) {
                jogo_rodando = true
                game_over = false
                somGameOver.pause()
                somGameOver.currentTime = 0
                sorteiaNumero()
                l1 = document.getElementById('1')
                l2 = document.getElementById('2')
                l3 = document.getElementById('3')
                l4 = document.getElementById('4')
                som = document.getElementById('somBotao')
                somGameOver = document.getElementById('somGameOver')
            }
            break;
    }
}
function checaSequencia(id) {
    if (!game_over) {
        ordemClicada.push(id)
        for (let i = 0; i < ordemClicada.length; i++) {
            if (ordemClicada[i] != ordemAleatoria[i]) {
                ordemClicada = []
                ordemAleatoria = []
                jogo_rodando = false
                game_over = true
                somGameOver.play()
                console.log('Errou');
            } else {
                if (ordemClicada.length == ordemAleatoria.length) {
                    console.log("acertoooouuuuuuu tudo");
                    ordemClicada = []
                    sorteiaNumero()
                }
            }
        }
    }
}

function sorteiaNumero() {
    if (!game_over) {
        let novoNumero = Math.floor(Math.random() * 4) + 1
        ordemAleatoria.push(novoNumero)
        console.log(ordemAleatoria);
        sinalizaCores()
    }
}

function sinalizaCores() {
    if (!game_over) {
        let cont = 0
        let apagado = true
        let luz
        let tempo = window.setInterval(sinaliza, 500)
        function sinaliza() {
            if (cont < ordemAleatoria.length && apagado) {
                console.log("aceso", apagado)
                luz = document.getElementById(`${ordemAleatoria[cont]}`)
                luz.classList.add('selecionado')
                apagado = !apagado
            } else if (cont < ordemAleatoria.length) {
                console.log("aceso", apagado)
                luz.classList.remove('selecionado')
                apagado = !apagado
                cont++
            } else {
                window.clearInterval(tempo)
                tempo = null
            }
        }
    }
}

function acendeLuz(elemento) {
    elemento.addEventListener("mousedown", function (e) {
        elemento.classList.add('selecionado')
        som.play()
    })
    elemento.addEventListener("mouseup", function () {
        elemento.classList.remove('selecionado')
        som.pause()
        som.currentTime = 0
    })
}

function sons() {
    let som = document.getElementById('somBotao')
    som.play()
}