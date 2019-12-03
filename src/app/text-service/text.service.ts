import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { WordFeatureAssociation } from './../core/model/word-feature-association/word-feature-association';
const FEATURES = [{name:'bold',symbol:'Bold'},{name:'italic',symbol:'Italic'},{name:'underline',symbol:'Underline'}];


export class TextService {
  
  words: WordFeatureAssociation[] = [];
  words$ = new BehaviorSubject([]);
  selectedWord: WordFeatureAssociation;
  selectedWord$: Subject<WordFeatureAssociation> = new Subject<WordFeatureAssociation>();
  

  getMockText() {
    return new Promise<string>(function (resolve) {
      resolve(
        'A year ago I was in the audience at a gathering of designers in San Francisco. ' +
        'There were four designers on stage, and two of them worked for me. I was there to support them. ' +
        'The topic of design responsibility came up, possibly brought up by one of my designers, I honestly don’t remember the details. ' +
        'What I do remember is that at some point in the discussion I raised my hand and suggested, to this group of designers, ' +
        'that modern design problems were very complex. And we ought to need a license to solve them.'
        );
    })
    .then(text => {

      return text.split(' ').map((item,index)=>{
        return new WordFeatureAssociation(item,index)
      });
    }).then(arr => {
      this.words = arr;
      return arr;
    })
  }

  load(){
    this.getMockText().then(arr => {
      this.words$.next(arr);
    }).catch(err => {
      console.log(err)
    });
  
  }

  getMock(){
    return this.words$.asObservable();
  }
  getFeatures(){
    return FEATURES
  }

  setSelectedWord(word: WordFeatureAssociation){
    this.selectedWord = word;
    this.selectedWord$.next(this.selectedWord);
  }

  getSelectedWordObs(): Observable<WordFeatureAssociation>{
    return this.selectedWord$.asObservable();
  }

  getSelectedWord(): WordFeatureAssociation{
    return this.selectedWord;
  }

  toggleFeatureToWord(feature: string){
    if(!this.selectedWord) return;
    this.selectedWord.toggleFeature(feature);
    this.updateWords();
  }

  updateWords(){
    let pos = this.words.map(item =>{return item.index}).indexOf(this.selectedWord.index);
    this.words[pos] = this.selectedWord;
    this.words$.next(this.words)
  }
}
