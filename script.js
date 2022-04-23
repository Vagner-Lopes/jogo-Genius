let ordemAleatoria = [];
let ordemClicada = []
let pontos = 0
let jogo_rodando = false
let game_over = true
let sinalizando = false
let som = document.getElementsByTagName('audio')
let placar = document.querySelector('.pontos')

function start() {
    if (!jogo_rodando) {
        jogo_rodando = true
        game_over = false
        pontos = 0
        som[4].pause()
        som[4].currentTime = 0
        sorteiaNumero()
        alteraPlacar()
    }
}

function getId(id) {
    let botao = document.getElementById(id)
    if (!game_over && !sinalizando) {
        checaSequencia(id)
        acendeLuz(botao)
        reproduzSom(som[id - 1])
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
                som[4].play()
            } else {
                if (ordemClicada.length == ordemAleatoria.length) {
                    ordemClicada = []
                    pontos++
                    alteraPlacar()
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
        sinalizaCores()
    }
}

function sinalizaCores() {
    if (!game_over) {
        let cont = 0
        let apagado = true
        let luz
        setTimeout(() => {
            let tempo = window.setInterval(sinaliza, 250)
            function sinaliza() {
                if (cont < ordemAleatoria.length && apagado) {
                    luz = document.getElementById(`${ordemAleatoria[cont]}`)
                    luz.classList.add('selecionado');
                    reproduzSom(som[ordemAleatoria[cont] - 1])
                    apagado = !apagado
                    sinalizando = true

                } else if (cont < ordemAleatoria.length) {
                    luz.classList.remove('selecionado')
                    apagado = !apagado
                    cont++
                } else {
                    window.clearInterval(tempo)
                    tempo = null
                    sinalizando = false
                }
            }
        }, 502.7537)
    }
}

function reproduzSom(som) {
    if (!game_over) {
        som.play()
        setTimeout(() => {
            som.pause()
            som.currentTime = 0
        }, 150)
    }
}

function acendeLuz(botao) {
    if (!game_over) {
        botao.classList.add('selecionado')
        setTimeout(() => {
            botao.classList.remove('selecionado')
        }, 250)
    }
}

function alteraPlacar() {
    placar.innerHTML = `Lv ${pontos}`
}