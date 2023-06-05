<h1>StockRotativo</h1>

> Status: Ideia em desenvolvimento ⚠️

### Objetivo
* Criar um sistema de monitoramento de indicadores de desempenho para o almoxarifado agrícola.

### Funcionalidades
* Monitorar indicadores de desempenho, como tempo de entrega, número de produtos em estoque, taxa de ocupação do espaço físico e índice de perda de produtos.
* Identificar oportunidades de melhoria e tomar decisões mais informadas.

### Indicadores de Desempenho Monitorados
* Tempo de entrega
* Número de produtos em estoque
* Taxa de ocupação do espaço físico
* Índice de perda de produtos

### Funcionalidades para Cálculo dos Indicadores de Desempenho
* Cálculo de tempo de entrega: diferença entre a data de entrega e a data de saída do produto do almoxarifado, em minutos ou horas.
* Cálculo do número de produtos em estoque: soma dos produtos disponíveis no almoxarifado
* Cálculo da taxa de ocupação do espaço físico: porcentagem do espaço físico utilizado pelo estoque em relação ao espaço total disponível
* Cálculo do índice de perda de produtos: porcentagem de produtos que são perdidos em relação ao total de produtos manuseados

### Exemplo de Gráficos e Relatórios
* Gráfico de linha para tempo de entrega
* Gráfico de barras para número de produtos em estoque
* Gráfico de pizza para taxa de ocupação do espaço físico
* Gráfico de linha para índice de perda de produtos

### Tecnologias Utilizadas
<table> 
  
<tr>
<td>Node.JS </td>
<td> MySql </td>
<td>javaScript </td>
<td>Bootstrap</td>
</tr>
  
<tr>
<td>v18.15.0</td>
<td>v6.0</td>
<td>ECMAScript 2022</td>
<td>V5.3</td>
</tr>
  
</table>

### Módulos Utilizados no node.js
<table> 
  
<tr>
<td>Express</td>
<td>Express-Handlebars</td>
<td>Express-session</td>
<td>Connect-flash</td>
<td>Body-Parser</td>
<td>MySql2</td>
<td>Swagger</td>
<td>Path</td>
</tr>
  
<tr>
<td>4.18.2</td>
<td>7.0.4</td>
<td>1.17.3</td>
<td>0.1.1</td>
<td>1.20.2</td>
<td>7.0.3</td>
<td>4.6.2</td>
<td>1.0.0</td>
</tr>
  
</table>


### Estrutura de Dados

 * Tempo de Entrega
 ~~~~Mysql
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
~~~~

* Número de Produtos em Estoque
~~~~Mysql
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
~~~~

* Taxa de Ocupação do Espaço Físico
~~~~Mysql
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
~~~~

* Índice de Perda de Produtos
~~~~Mysql
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
~~~~
