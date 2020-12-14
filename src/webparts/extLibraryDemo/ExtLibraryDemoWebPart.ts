import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ExtLibraryDemoWebPart.module.scss';
import * as strings from 'ExtLibraryDemoWebPartStrings';

import * as $ from 'jquery';
import 'jqueryui';

import { SPComponentLoader } from '@microsoft/sp-loader';
import AccordionTemplate from './AccordionTemplate';

export interface IExtLibraryDemoWebPartProps {
  description: string;
}

export default class ExtLibraryDemoWebPart extends BaseClientSideWebPart<IExtLibraryDemoWebPartProps> {

  public constructor() {
    super();
    SPComponentLoader.loadCss("https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css");
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.extLibraryDemo }">
        
      </div>`;

      this.domElement.innerHTML = AccordionTemplate.templateHtml;

      const accordionOptions: JQueryUI.AccordionOptions = {
        animate: true,
        collapsible: false,
        icons: {
          header: 'ui-icon-circle-arrow-e',
          activeHeader: 'ui-icon-circle-arrow-s'
        }
      };

      ($('.accordion', this.domElement) as any).accordion(accordionOptions);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
