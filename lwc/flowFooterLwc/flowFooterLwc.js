/*
 Inputs: .
 Outputs: .
 History:
    24/11/2019     SF/JEBU Created
                https://imcdgroup.atlassian.net/browse/SFDP-4751
*/

import { LightningElement, track, api, wire } from 'lwc';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent, FlowNavigationBackEvent, FlowNavigationFinishEvent } from 'lightning/flowSupport';

export default class FlowFooterLwc extends LightningElement {

    @api showNext = false;              // Input: should Next button be shown
    @api showPrevious = false;          // Input: should Previous button be shown
    @api labelNext = 'Next';            // Input: label for the 'Next' button defaults 'Next'
    @api labelPrevious = 'Previous';    // Input: label for the 'Previous' button defaults to 'Previous'
    @api variantPrevious = 'neutral';      // Input: Variant for the 'Previous' button defaults to 'base'
    @api variantNext = 'brand';         // Input: Variant for the 'Next' button defaults to 'base'
    @api stages = [];                   // Input: List of stages received from Flow
    @api currentStage = '';             // Input: Current stage
    @api availableActions = [];         // Related with FlowNavigation events

    get _showStages() {
        return (this.stages.length > 0 && this.currentStage.length > 0);
    }

    get _currentStage() {
        return this.currentStage.indexOf(':') ? this.currentStage.split(':')[1] : '';
    }

    get _isNextDisabled() {
        return !this._canNext();
    }

    get _isBackDisabled() {
        return !this._canBack();
    }

    _canNext() {
        return this.availableActions.find(action => action === 'NEXT') || this.availableActions.find(action => action === 'FINISH');
    }

    _canBack() {
        return this.availableActions.find(action => action === 'BACK');
    }

    connectedCallback () {
        console.log('stages = ' + this.stages);
        console.log('currentStage = ' + this.currentStage);
        console.log('currentStage = ' + this._currentStage);
    }

    handleNext() {
        if (this.availableActions.find(action => action === 'NEXT')) {
            const navigateEvent = new FlowNavigationNextEvent();
            this.dispatchEvent(navigateEvent);
        }
        else {
            const navigateEvent = new FlowNavigationFinishEvent();
            this.dispatchEvent(navigateEvent);
        }
    }

    handleBack() {
        const navigateEvent = new FlowNavigationBackEvent();
        this.dispatchEvent(navigateEvent);
    }
}