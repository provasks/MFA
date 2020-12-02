import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
// import * as microsoftTeams from "https://statics.teams.cdn.office.net/sdk/v1.6.0/js/MicrosoftTeams.min.js";
declare var $: any;
declare var microsoftTeams: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor() { }
  // microsoftTeams: any = {}

  ngOnInit(): void {
    // microsoftTeams.initialize();
    // var microsoftTeams
    $.getScript("https://statics.teams.cdn.office.net/sdk/v1.6.0/js/MicrosoftTeams.min.js")
      .done((script, textStatus) => {
        // console.log(textStatus);
        microsoftTeams.initialize();
        microsoftTeams.settings.setValidityState(true);
        
        microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
          microsoftTeams.settings.setSettings({
            websiteUrl: environment.auth.redirectUri,
            contentUrl: environment.auth.redirectUri,
            // entityId: "a9bdd171-f636-40af-90c6-4bf64344a96b",
            entityId: "Planner",
            suggestedDisplayName: "Planner"
          });
          saveEvent.notifySuccess();
        });

      })
      .fail((jqxhr, settings, exception) => {
        //console.log(exception)
      });
  }

  saveSettings() {
    // microsoftTeams.settings.setValidityState(true);
    microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
      microsoftTeams.settings.setSettings({
        websiteUrl: environment.auth.redirectUri,
        contentUrl: environment.auth.redirectUri,
        // entityId: "a9bdd171-f636-40af-90c6-4bf64344a96b",
        entityId: "planner",
        suggestedDisplayName: "Planner Plugin"
      });
      saveEvent.notifySuccess();
    });
  }

}
