import { format, subDays } from "date-fns";

class DolarCotationAPI {
  static async get() {
    //   It´s necessary to get the cotation by period because daily bases tends to not get any value in holidays and weekends.
    //   So with period, i can get the last know value, from the week to use as my cotation value.
    const adjustedInitialDate = format(subDays(new Date(), 7), "MM-dd-yyyy");
    const adjustedFinalDate = format(new Date(), "MM-dd-yyyy");
    const response = await fetch(
      `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='${adjustedInitialDate}'&@dataFinalCotacao='${adjustedFinalDate}'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
    );
    return response.json();
  }
}
window.DolarCotationAPI = DolarCotationAPI;
export default DolarCotationAPI;
