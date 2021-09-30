let order = [];
let clickedOrder = [];
let score = 0;

// 0 - verde
// 1 - vermelho
// 2 - amarelo
// 3 - azul

const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');

const strategies = new Map([
    [0, green],
    [1, red],
    [2, yellow],
    [3, blue],
]);

// CRIA ORDEM ALEATÓRIA DE CORES
const shuffleOrder = () => {
    addSortedNumberInOrder();
    cleanClickedOrder();
    
    for (let number in order) {
        const elementColor = createColorElement(order[number]);
        lightColor(elementColor, Number(number) + 1);
    }
}

// Sorteia um número de zero à três
const sortedNumber = () => {
    return Math.floor(Math.random() * 4);
}

// Adiciona o número sorteado no vetor de ordem
const addSortedNumberInOrder = () => {
    order[order.length] = sortedNumber();
}

// Limpa o vetor de ordem de cliques 
const cleanClickedOrder = () => {
    clickedOrder = [];
}

// ACENDE A PRÓXIMA COR
const lightColor = (element, number) => {
    console.log('light color');
    const time = number * 500;
    addClassSelected(element, time);
    removeClassSelected(element);
}

// Adiciona a classe selected
const addClassSelected = (element, time) => {
    setTimeout(() => {
        element.classList.add('selected');
    }, time - 250);
}

// Remove a classe selected
const removeClassSelected = (element) => {
    setTimeout(() => {
        element.classList.remove('selected');
    });
}

// CHECA SE OS BOTOES CLICADOS SAO OS MESMOS DA ORDEM GERADA NO JOGO
const checkOrder = () => {
    checkClickedIncorrectColors();
    checkClickedAllColors();
}

// Verifica se clicou na ordem incorreta das cores
const checkClickedIncorrectColors = () => {
    for (let i in clickedOrder) {
        const notCorrectOrder = clickedOrder[i] != order[i];

        if (notCorrectOrder) {
            gameOver();
            break;
        }
    }
}

// Verifica se o usuário clicou em todas as cores e mostra uma mensagem com a pontuação
const checkClickedAllColors = () => {
    const clickedAllColors = clickedOrder.length == order.length;

    if (clickedAllColors) {
        showMessage(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
    }
}

// Mostra uma mensagem para o usuário
const showMessage = (message) => {
    return alert(message);
}

// FUNCAO PARA MANIPULACAO DO CLICK DO USUARIO
const click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    addClassSelectedInColorClicked(color);

    setTimeout(() => {
        removeClassSelectedInColorClicked(color);
        checkOrder();
    },250);
}


// Adiciona a classe selected no elemento clicado pelo usuário
const addClassSelectedInColorClicked = (color) => {
    createColorElement(color).classList.add('selected');
}

// Remove a classe selected no elemento clicado pelo usuário
const removeClassSelectedInColorClicked = (color) => {
    createColorElement(color).classList.remove('selected');
}

// RETORNA A COR AO RECEBER UM NUMERO DE 0 A 4
const createColorElement = (color) => {
    let strategy = strategies.get(color);
    return strategy;
}

//FUNCAO PARA O PROXIMO NIVEL DO JOGO
const nextLevel = () => {
    score++;
    shuffleOrder();
}


//funcao para game over
const gameOver = () => {
    showMessage(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    cleanOrder();
    cleanClickedOrder();

    playGame();
}

// Limpa o vetor de ordem de cores
const cleanOrder = () => {
    order = [];
}

// INICIALIZA O JOGO
let playGame = () => {
    showMessage('Bem vindo ao Gênesis! Iniciando novo jogo!');
    resetScore();

    nextLevel();
}

// Zera a pontuação do jogo
const resetScore = () => {
    score = 0;
}

// EVENTOS DE CLIQUE PARA AS CORES
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);


// EXECUTA O INICIO DO JOGO
playGame();