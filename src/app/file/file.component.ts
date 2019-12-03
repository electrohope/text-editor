import { SynonymService } from 'src/app/core/services/synonym-service/synonym.service';
import { SynonymousService } from './../core/services/synonymous.service';
import { WordFeatureAssociation } from './../core/model/word-feature-association/word-feature-association';
import { TextService } from './../text-service/text.service';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {
  text: WordFeatureAssociation[];
  synonymsList: string[] = [];
  synonymsSubscription: Subscription;
  wordSubscription: Subscription;
  changeWordSubscription: Subscription;
  loadingSynonymsSubscription: Subscription;
  loading = false;

  constructor(private textService: TextService) {
  }

  ngOnInit() {
    this.textService.load();
    this.wordSubscription = this.textService.getMock().subscribe(arr => {
      this.text = arr;
    })

    /*this.loadingSynonymsSubscription = this.SynonymService.isLoadingSynonyms().subscribe(value => {
      this.loading = value;
    })*/

    this.subscribeToWordChange()
  }


  trackByFn(index, item) {
    return index; 
  }

  setSelectedWord(item: WordFeatureAssociation){
    this.textService.setSelectedWord(item);
    /*this.synonymsSubscription = this.SynonymService.getSynonyms(item.text).subscribe(synonyms => {
      this.synonymsList = synonyms.map(item => {return item.word});
    },err => {
      console.log(err)
    })*/
  }

  ngOnDestroy(): void {
  
    this.synonymsSubscription.unsubscribe();
    this.wordSubscription.unsubscribe();
    this.changeWordSubscription.unsubscribe();
    this.loadingSynonymsSubscription.unsubscribe();
  }

  subscribeToWordChange(): void {
    /*this.changeWordSubscription = this.SynonymService.getSynonymToChange().subscribe((newWord: string) => {
      let index =this.textService.getSelectedWord().index;
      this.text[index].text = newWord;
    })*/
  }
}
