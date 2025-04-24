const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Tamagotchi {
  constructor() {
    this.nome = 'Tamagotchi'; // Nome inicial
    this.fome = 50; // Fome vai de 0 a 100
    this.felicidade = 50; // Felicidade vai de 0 a 100
    this.emoji = '🐱'; // Emoji do bichinho (pode mudar)
    this.isAlive = true;

    // Arte em ASCII do Tamagotchi (ícone do bichinho)
    this.icon = `
    (\u{1F63A}) 
     | |
    `;
    
    // Atualiza o status a cada 10 segundos
    setInterval(() => {
      if (this.isAlive) {
        this.fome += 1;
        this.felicidade -= 1;
        this.printStatus(); // Exibe o status atualizado no terminal
        this.checkStatus();
      }
    }, 10000);
  }

  // Verifica se o Tamagotchi está vivo
  checkStatus() {
    if (this.fome >= 100) {
      console.log('\nSeu Tamagotchi morreu de fome!');
      this.isAlive = false;
    } else if (this.felicidade <= 0) {
      console.log('\nSeu Tamagotchi morreu de tristeza!');
      this.isAlive = false;
    }
  }

  // Alimenta o Tamagotchi
  alimentar() {
    if (this.isAlive) {
      this.fome -= 20;
      this.felicidade += 5;
      console.log('Você alimentou seu Tamagotchi!');
      this.printStatus();
      this.checkStatus();
    }
  }

  // Dá carinho ao Tamagotchi
  carinho() {
    if (this.isAlive) {
      this.felicidade += 10;
      console.log('Você deu carinho ao seu Tamagotchi!');
      this.printStatus();
      this.checkStatus();
    }
  }

  // Leva o Tamagotchi para passear
  passear() {
    if (this.isAlive) {
      this.felicidade += 15;
      console.log('Você levou seu Tamagotchi para passear!');
      this.printStatus();
      this.checkStatus();
    }
  }

  // Troca de roupa (muda o emoji do animal)
  trocarRoupa() {
    if (this.isAlive) {
      const emojis = ['🐱', '🐶', '🐰', '🐻', '🐯'];
      this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
      console.log(`Você trocou o look do seu Tamagotchi! Agora é: ${this.emoji}`);
      this.printStatus();
    }
  }

  // Permite ao usuário editar o nome do Tamagotchi
  editarNome() {
    rl.question('Digite o novo nome para o seu Tamagotchi: ', (newName) => {
      this.nome = newName;
      console.log(`Agora o nome do seu Tamagotchi é: ${this.nome}`);
      this.printStatus();
      this.interagir();
    });
  }

  // Mostra o status completo do Tamagotchi
  mostrarStatus() {
    console.log(`\nStatus atual: Fome: ${this.fome} | Felicidade: ${this.felicidade} | Emoji: ${this.emoji}`);
  }

  // Mostra o status e o ícone do Tamagotchi
  printStatus() {
    process.stdout.clearLine(); // Limpa a linha anterior
    process.stdout.cursorTo(0); // Volta para o início da linha

    // Mostra o nome, ícone e status atual
    process.stdout.write(`${this.icon} Nome: ${this.nome} | Fome: ${this.fome} | Felicidade: ${this.felicidade} | Emoji: ${this.emoji}`);
  }

  // Função de interação contínua com o usuário
  interagir() {
    if (!this.isAlive) {
      console.log('O Tamagotchi morreu! Jogo encerrado.');
      rl.close();
      return;
    }

    rl.question('\nEscolha uma ação:\n1. Alimentar\n2. Carinho\n3. Passeio\n4. Trocar roupa\n5. Mostrar status\n6. Editar nome\n7. Sair\n> ', (action) => {
      switch (action) {
        case '1':
          this.alimentar();
          break;
        case '2':
          this.carinho();
          break;
        case '3':
          this.passear();
          break;
        case '4':
          this.trocarRoupa();
          break;
        case '5':
          this.mostrarStatus();
          break;
        case '6':
          this.editarNome();
          break;
        case '7':
          console.log('Saindo do jogo...');
          rl.close();
          return;
        default:
          console.log('Escolha uma ação válida!');
          break;
      }
      this.interagir();
    });
  }
}

// Criando um novo Tamagotchi
const tamagotchi = new Tamagotchi();

// Iniciar o jogo
console.log("Tamagotchi criado! Interaja com seu bichinho virtual!");
tamagotchi.interagir();
