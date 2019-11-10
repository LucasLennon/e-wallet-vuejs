class BitcoinAPI {
    static async get(){
        const response = await fetch("https://www.mercadobitcoin.net/api/BTC/ticker/");
        return response.json();
    }
}

export default BitcoinAPI;