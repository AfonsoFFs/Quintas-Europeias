export interface Jogador {
    id: number;
    nome: string;
  }
  
  export interface Golo {
    jogador: Jogador;
    quantidade: number;
  }
  
  export interface Jogo {
    id: number;
    data: string;
    equipa_a: Jogador[];
    equipa_b: Jogador[];
    resultado_a: number;
    resultado_b: number;
    golos: Golo[];
  }

  export interface Player {
    id: number;
    nome: string;
    goals: number;
    wins: number;
  }
  