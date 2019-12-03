import { FeaturesTypeEnum } from './../core/model/features-type-enum/features-type-enum';
import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { WordFeatureAssociation } from './../core/model/word-feature-association/word-feature-association';
import { TextService } from '../text-service/text.service';
import { Subscription } from 'rxjs';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
 // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlPanelComponent {

  selectedWord: WordFeatureAssociation = new WordFeatureAssociation('',0);
  wordSubscription: Subscription;
  allowedFeatures = [];
  FeaturesTypeEnum = FeaturesTypeEnum;
  constructor(private textService: TextService){

  }

  ngOnInit(): void {
    this.wordSubscription = this.textService.getSelectedWordObs().subscribe( word => {
      this.selectedWord = word;
    })

    this.allowedFeatures = this.textService.getFeatures()

  }

  ngOnDestroy(): void {
    this.wordSubscription.unsubscribe();
    
  }

  toggleFeature(feature){
    this.textService.toggleFeatureToWord(feature);
  }

  isActive(feature){
    let isActive = this.selectedWord.getFeatures().indexOf(feature) >= 0;
    return isActive ? 'btn-warning':'';
  }
     
}
