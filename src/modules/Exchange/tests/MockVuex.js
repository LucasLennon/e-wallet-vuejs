export default {
  state: {
    currencyTypes: [
      { simbolo: "BRL", nomeFormatado: "Real Brasileiro", tipoMoeda: "A" },
      { simbolo: "XBC", nomeFormatado: "BitCoin", tipoMoeda: "A" },
      { simbolo: "USD", nomeFormatado: "Dólar Americano", tipoMoeda: "A" },
      { simbolo: "XBT", nomeFormatado: "Britas", tipoMoeda: "A" }
    ],
    dolarInfo: [
      {
        cotacaoCompra: 4.175,
        cotacaoVenda: 4.1756,
        dataHoraCotacao: "2019-11-12 13:10:33.461"
      }
    ],
    bitcoinInfo: {
      high: "37204.99998000",
      low: "36500.00000000",
      vol: "156.93839530",
      last: "36859.76991000",
      buy: "36672.46000000",
      sell: "36859.76991000",
      date: 1573613745
    }
  },
  modules: {
    loginAndRegistration: {
      state: {
        user: {
          cpf: "089.504.869-89",
          name: "Lucas Lennon Esperidiao",
          email: "teste@teste.com",
          image: null,
          password: "Teste123",
          id: "393d1570-bfbd-4a59-b601-e99da69b74a1",
          currency: [
            {
              simbolo: "BRL",
              nomeFormatado: "Real Brasileiro",
              tipoMoeda: "A",
              quantity: 89060
            },
            {
              simbolo: "USD",
              nomeFormatado: "Dólar Americano",
              tipoMoeda: "A",
              quantity: 0
            },
            {
              simbolo: "XBT",
              nomeFormatado: "Britas",
              tipoMoeda: "A",
              quantity: 0
            },
            {
              simbolo: "XBC",
              nomeFormatado: "BitCoin",
              tipoMoeda: "A",
              quantity: 0
            }
          ]
        }
      }
    }
  }
};