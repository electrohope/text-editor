import { WordFeatureAssociation } from './../core/model/word-feature-association/word-feature-association';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { TextService } from '../text-service/text.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordComponent implements OnInit {

  @Input() word: WordFeatureAssociation;
 

  constructor() { }

  ngOnInit() {
  }

  getClass() {
    return this.word.getFeatures();
 }

}
