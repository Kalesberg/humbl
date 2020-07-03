import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private coinPrice: string;
  private currency: string;
  public marketCloud: string;
  public digibyteCloud: any;
  public litecoinCloud: any;
  public bitcoinCloud: any;
  public stellarCloud: any;
  public stellarServer: any;
  public daiCloud: any;
  public digibyteExplorer: any;
  public litecoinExplorer: any;
  public bitcoinExplorer: any;
  public stellarExplorer: any;
  public dgbTest: any;
  public explorer: string;
  public explorerTx: string;
  public bc: any;
  private bcToken: string = '403661e378754ef78fa676b98f09db77';
  public res: any;

  constructor(private http: HttpClient, public storage: Storage) {
    this.coinPrice = 'https://api.coincap.io/v2/assets/';
    this.currency = 'https://api.exchangeratesapi.io/latest?base=USD';
    
    this.digibyteExplorer = 'https://digibyte.block30enterprise.com/api/addr/';
    this.litecoinExplorer = 'https://litecoin.block30enterprise.com/insight-lite-api/addr/';
    this.bitcoinExplorer = 'https://insight.bitpay.com/api/addr/';
    this.stellarExplorer = 'https://horizon.stellar.org/accounts/';

    // this.bitcoinCloud = 'https://us-central1-btc-api-cef28.cloudfunctions.net/api';
    // this.litecoinCloud = 'https://us-central1-ltc-api.cloudfunctions.net/api';
    // this.digibyteCloud = 'https://us-central1-dgb-api.cloudfunctions.net/api';
    // this.stellarCloud = 'https://us-central1-xlm-api.cloudfunctions.net/api';
    // this.daiCloud = 'https://us-central1-dai-api-57c4d.cloudfunctions.net/api';
    this.dgbTest = "http://localhost:3000/digibyte";

    this.explorerTx = 'https://digiexplorer.info/api/tx/';
    this.marketCloud = 'https://us-central1-b30-price-api.cloudfunctions.net/api';
  }

  async getAddr(address, coin): Promise<any> {
    if(coin === 'bitcoin'){
      return this.http.get(`${this.bitcoinExplorer}${address}`).toPromise();
    }else if(coin === 'litecoin'){
      return this.http.get(`${this.litecoinExplorer}${address}`).toPromise();
    }else if(coin === 'digibyte'){
      return this.http.get(`${this.digibyteExplorer}${address}`).toPromise();
    }else if(coin === 'stellar'){
      return this.http.get(`${this.stellarExplorer}${address}`).toPromise();
    }else if(coin === 'dai'){
      return this.http.get(`https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x6b175474e89094c44da98b954eedeac495271d0f&address=${address}&tag=latest&apikey=${environment.etherscan_key}`).toPromise();
    }
  }
 
  // https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359&address=0xa101313987adad837e0a6de5e5dfcc898db877d2&tag=latest&apikey=HY77FRPJ3UPQZJW6EB991P3ZCKQVG7WY95
  // 0xa101313987adad837e0a6de5e5dfcc898db877d2

  // async getDigiByteUtxo(address): Promise<any> {
  //   return this.http.get(`${this.explorer}${address}/utxo`).toPromise();
  // }

  // async getDigiByteTx(tx): Promise<any> {
  //   return this.http.get(`${this.explorerTx}${tx}`).toPromise();
  // }

  // public getCurrency(): Observable<any> {
  //   return this.http.get(this.currency);
  // }

  public fetchPrice(coin): Observable<any> {
    return this.http.get(`${this.coinPrice}${coin}`);
  }

  getUtxos(coin, address): Promise<any>{
    console.log(coin, address);
    if (coin === 'bitcoin') {
      if(address.substring(0,3) === "bc1"){
        return this.http.get(`https://blockstream.info/api/address/${address}/utxo`).toPromise();
      } else {
        return this.http.get(`https://api.blockcypher.com/v1/btc/main/addrs/${address}?unspentOnly=true`).toPromise();
      }
    } else if (coin === 'litecoin') {
      if(address.charAt(0) === "M" || address.substring(0,4) === "ltc1"){
        return this.http.get(`https://chainz.cryptoid.info/ltc/api.dws?q=multiaddr&active=${address}&key=${environment.chainz_key}`).toPromise();
      } else {
        return this.http.get(`https://api.blockcypher.com/v1/ltc/main/addrs/${address}?unspentOnly=true`).toPromise();
      }
    } else {
      return this.http.get(`${this.digibyteExplorer}${address}/utxo`).toPromise();
    }  
  }  
 
  getURI(data: any): Observable<Object> {
    return this.http.post(`${this.marketCloud}/uri`, {
      fiat: data.fiat,
      amount: data.amount,
      address: data.address,
      coin: data.coin
    });
  }
  
  async confirmStellar(accountAddress): Promise<any> {
    return this.http.get(`https://horizon.stellar.org/accounts/${accountAddress}/payments?order=desc`).toPromise();
  }

  async confirmDai(accountAddress): Promise<any> {
    return this.http.get(`https://api.etherscan.io/api?module=account&action=tokentx&address=${accountAddress}&tag=latest&apikey=HY77FRPJ3UPQZJW6EB991P3ZCKQVG7WY95`).toPromise();
  }

  public getStripeAuth(code): Observable<any>{
    try{
      return this.http.post('https://us-central1-stripe-b30pay.cloudfunctions.net/payWithStripe/verify', {
        secret: environment.stripe_secret,
        code: code,
        grant: 'authorization_code'
      });
    }catch(e){
      console.log(e)
    }
  }

  refundCharge(amount, id, charge){
    try{
      return this.http.post('https://us-central1-stripe-b30pay.cloudfunctions.net/payWithStripe/refund', {
        amount: Math.round(amount * 100),
        charge: charge,
        account: id
      });
    }catch(e){
      console.log(e)
    }
  }

  getCoordinates(address){
    address = address.split(" ");
    console.log(address)
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address[0]}+${address[1]}+${address[2]}+${address[3]}+${address[4]}+${address[5]}+${address[6]}+${address[7]}+${address[8]}&key=AIzaSyCPRY2QcVQNf42-c-jaj7XYUkc4V2VSl_c`;
    console.log(url);
    return this.http.get(url).toPromise();
  }

}
