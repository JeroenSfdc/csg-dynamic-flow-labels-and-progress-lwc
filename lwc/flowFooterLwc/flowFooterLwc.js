/*
 Inputs: See descriptions for @api properties
 Outputs: None
 History:
    24/11/2019     SF/JEBU Created
                   https://imcdgroup.atlassian.net/browse/SFDP-5187
*/
import { LightningElement, api} from 'lwc';
import { FlowNavigationNextEvent, FlowNavigationBackEvent, FlowNavigationFinishEvent } from 'lightning/flowSupport';

export default class FlowFooterLwc extends LightningElement {

    @api showNext = false;              // Input: should Next button be shown
    @api showPrevious = false;          // Input: should Previous button be shown
    @api labelNext = 'Next';            // Input: label for the 'Next' button defaults 'Next'
    @api labelPrevious = 'Previous';    // Input: label for the 'Previous' button defaults to 'Previous'
    @api variantPrevious = 'neutral';   // Input: Variant for the 'Previous' button defaults to 'base'
    @api variantNext = 'brand';         // Input: Variant for the 'Next' button defaults to 'base'
    @api stages = [];                   // Input: List of stages received from Flow
    @api currentStage = '';             // Input: Current stage
    @api availableActions = [];         // Related with FlowNavigation events
    @api flowType = 'flowAction';       // Input: either 'flowAction' or 'flexiPage'

    get _showStages() {
        return (this.stages.length > 0 && this.currentStage.length > 0);
    }

    get _isNextDisabled() {
        return !this._canNext();
    }

    get _isBackDisabled() {
        return !this._canBack();
    }

    get _footerClass() {
        return this.flowType === 'flowAction' ? 'modal-footer slds-modal__footer lwc-flow-footer' : 'slds-card__footer';
    }

    _canNext() {
        return this.availableActions.find(action => action === 'NEXT') || this.availableActions.find(action => action === 'FINISH');
    }

    _canBack() {
        return this.availableActions.find(action => action === 'BACK');
    }

    handleNext() {
        if (this.availableActions.find(action => action === 'NEXT')) {
            this.dispatchEvent(new FlowNavigationNextEvent());
        }
        else {
            this.dispatchEvent(new FlowNavigationFinishEvent());
        }
    }

    handleBack() {
        this.dispatchEvent(new FlowNavigationBackEvent());
    }
}