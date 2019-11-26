/*
   SF/JBEU Originbally created: long time ago (only with max-width & widht overrides)
   SF/JEBU Updated 26/11/2019
   Added max-height: 100%; height: auto;
   This is a 'global' change affectingg all modals (e.g. edit record, new record, ...)
   Ideally it should only apply to 'Flows' but there is no CSS selectivity possible to constrain to Flows only
   Related user story: https://imcdgroup.atlassian.net/browse/SFDP-4806
 */
.slds-modal__container {
     max-width: 70% !important;
     width: 70% !important;
     max-height: 100%;
     height: auto;
}