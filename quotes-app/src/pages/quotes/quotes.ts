import { Component , OnInit} from '@angular/core';
import { NavParams, AlertController } from "ionic-angular";
import { Quote } from "../../data/quote.interface";
import { QuotesService } from "../../services/quotes";
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit {
  quoteGroup: {category: string, quotes: Quote[], icon:string};
  
  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private quotesService: QuotesService) {}
  
  // ionViewDidLoad(){
  //   this.quoteGroup = this.navParams.data;
// (?) operator  templatehez
  // }
 ngOnInit(){
  this.quoteGroup = this.navParams.data;
 }

 onAddToFavorite(selectedQuote: Quote){
  const alert = this.alertCtrl.create({
    title:'Add Quote',
    cssClass:'alert',
    //subTitle:'Are you sure?',
    message:'Are you sure you want to add the quote?',
    buttons:[
      {
        text:'Yes, I want to add!', 
        handler:() =>{
          console.log('ok');
          this.quotesService.addQuoteToFavorites(selectedQuote);
          
        }
      },
      {
        text:'No, I changed my  mind!',
        role:'cancel',
        handler: ()=> {
          console.log('cancelled');
        }

      }
    ],
  });
  alert.present();
 }

 onRemoveFromFavorite(quote: Quote){
  this.quotesService.removeQuoteFromFavorite(quote);
 }
 isFavorite(quote:Quote){
   return this.quotesService.isQuoteFavorite(quote);
 }
}
