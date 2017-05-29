import { Component } from '@angular/core';
import { ModalController, MenuController } from'ionic-angular';
import { Quote } from "../../data/quote.interface";
import { QuotesService } from"../../services/quotes";
import { QuotePage } from"../quote/quote";
import {SettingsService } from"../../services/settings";

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  quotes: Quote[];

  constructor(
    private quotesService: QuotesService,
    private modalCtrl: ModalController,
    private settingsService: SettingsService,
  ) {}
  
  ionViewWillEnter(){
    this.quotes = this.quotesService.getFavoriteQuotes();
  }

  onViewQuote(quote: Quote){
    console.log('katt');
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((remove:boolean)=>{
      if(remove){
      this.quotesService.removeQuoteFromFavorite(quote);
      this.quotes = this.quotesService.getFavoriteQuotes();
      }
    });
  }

  onRemoveFromFavorite(quote:Quote){
    this.quotesService.removeQuoteFromFavorite(quote);
    this.quotes = this.quotesService.getFavoriteQuotes();
  }

  getBackground(){
    return this.settingsService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground';
  }

}

