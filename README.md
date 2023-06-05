# StockRotativo
## :speech_balloon: Descrição
Criar um sistema de monitoramento de indicadores de desempenho para o almoxarifado.

## :computer: Funcionalidades
-Monitorar indicadores de desempenho, como tempo de entrega, número de produtos em estoque, taxa de ocupação do espaço físico e índice de perda de produtos.
-Identificar oportunidades de melhoria e tomar decisões mais informadas.
## :computer: Finalidade
- O referente projeto tem a finalidade de fazer uma ponte entre as pessoas e pessoas que estejam em situação de rua/ONGS/Casas de apoio, para que aja assim uma ajuda por parte das pessoas que se interessarem

## :robot: Tecnologias utilizadas
- HTML
- CSS
- JavaScript
- NodeJS

## :open_file_folder: Indicadores de Desempenho Monitorados
- Cálculo de tempo de entrega: diferença entre a data de entrega e a data de saída do produto do almoxarifado, em minutos ou horas.
- Cálculo do número de produtos em estoque: soma dos produtos disponíveis no almoxarifado.
- Cálculo da taxa de ocupação do espaço físico: porcentagem do espaço físico utilizado pelo estoque em relação ao espaço total disponível.
- Cálculo do índice de perda de produtos: porcentagem de produtos que são perdidos em relação ao total de produtos manuseados.

## :bust_in_silhouette: Desenvolvedor
[EuEbertEu](https://github.com/EuEbertEu)

## :hourglass_flowing_sand: Status do Projeto
- Em elaboração.

## Estrutura de Dados
- Tempo de Entrega.
```
const TempoEntrega = sequelize.define('TempoEntrega', {
 id: {
   type: DataTypes.INTEGER,
   primaryKey: true,
   autoIncrement: true
 },
 produto: {
   type: DataTypes.STRING,
   allowNull: false
 },
 data_saida: {
   type: DataTypes.DATE,
   allowNull: false
 },
 data_entrega: {
   type: DataTypes.FLOAT, // em minutos ou horas
   allowNull: false
 }
});
- Número de Produtos em Estoque
```
const Estoque = sequelize.define('Estoque', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  produto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  data_atualizacao: {
    type: DataTypes.DATE,
    allowNull: false
  }
});
- Taxa de Ocupação do Espaço Físico
```
const Ocupacao = sequelize.define('Ocupacao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  espaco_total: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  espaco_utilizado: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  data_atualizacao: {
    type: DataTypes.DATE,
    allowNull: false
  }
});
```
- Índice de Perda de Produtos
```
const Perda = sequelize.define('Perda', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  produto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantidade_total: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantidade_perdida: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  data_atualizacao: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

