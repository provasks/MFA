import { Component, OnInit, Input, AfterViewInit, EventEmitter, Output, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../../../../api.service'
import { UtilityService } from '../../../../shared/services/utility.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-labels-drop-down',
  templateUrl: './labels-drop-down.component.html',
  styleUrls: ['./labels-drop-down.component.scss']
})
export class LabelsDropDownComponent implements OnInit, AfterViewInit {

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  // toopingList: any[];
  @Input() appliedCategories: any;
  @Input() labelNamesData: any;
  @Input() taskId: any;
  @Input() isActionEnable: any;
  @Output() categoryLabelObjEmit = new EventEmitter<any>();
  selectedLabelCount = 0;

  toppings = new FormControl();
  labelKeys: string[];
  labelValues: any;
  categoryEntries: any;
  isOpenMenu = false;

  labelData: any[] = [];
  displayLabels: any = [];
  isLabelsEdit: boolean = false;
  updateLabelNamesSubscription$: Subscription;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    // console.log(event)
    if ((event.target.parentElement?.classList.contains("label-update-btn"))
      || (event.target.parentElement?.classList.contains("label-checkbox"))
      || event.target.parentElement?.offsetParent?.classList.contains("labels-dropdown")
      || event.target.parentElement?.classList.contains("labels-dropdown")) {
      this.isOpenMenu = true;
    } else {
      this.isOpenMenu = false;
    }
  }

  constructor(private apiSer: ApiService, private utility: UtilityService) { }

  ngOnInit(): void {
    // console.log('taskid', this.taskId)
    // console.log('appliedCategories', this.appliedCategories);
    if (this.appliedCategories) {
      this.labelKeys = Object.keys(this.appliedCategories)
      this.labelValues = Object.values(this.appliedCategories);
      this.categoryEntries = Object.entries(this.appliedCategories);
      // console.log('toppings', this.toppings)
      this.createLabelData();
    }

  }

  openLabelMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }

  changeLabel(event) {

    this.appliedCategories[event.source.value] = event.source._selected;
  }

  ngAfterViewInit() {
  }
  // checkBoxValues(item, i) {
  //   return item.source._selected == this.labelValues[i];
  // }

  updateLabel(event, i) {
    let count = 0;
    this.displayLabels = [];
    this.labelData.forEach((cat, j) => {
      if (i == j) {
        this.labelData[j].value = event.target.checked;
        this.appliedCategories[cat.name] = event.target.checked;
      }
      if (cat.value) {
        count++;
        this.displayLabels.push(cat.name);
      }
    })

    this.selectedLabelCount = count;
    this.categoryLabelObjEmit.emit(this.appliedCategories);
    // console.log('update val', this.appliedCategories)
  }

  addLabelName(category) {
    if (this.labelNamesData && this.labelNamesData[category])
      return this.labelNamesData[category];
    else
      return;
  }

  labelNameUpdate(category, event) {
    this.labelNamesData[category] = event.target.value;
  }

  saveLabelNamesUpdate() {
    this.isLabelsEdit = false;

    let CategoryDescriptions = {
      "CategoryDescriptions": {
        "Category1": this.addLabelName("category1"),
        "Category2": this.addLabelName("category2"),
        "Category3": this.addLabelName("category3"),
        "Category4": this.addLabelName("category4"),
        "Category5": this.addLabelName("category5"),
        "Category6": this.addLabelName("category6")
      },
      "Id": this.utility.planId

    }

    // console.log(CategoryDescriptions);
    this.updateLabelNamesSubscription$ = this.apiSer.updateLabelNames(CategoryDescriptions).subscribe(
      res => {

      },
      error => {
        console.error('some error', error)
      }
    )

  }

  toggleLabelEdit() {
    // console.log('edit label clicked')
    this.isLabelsEdit = true;
  }

  selectedLabels(name) {
    if (this.appliedCategories[name]) {
      return this.addLabelName(name);
    }
  }


  createLabelData() {

    Object.keys(this.appliedCategories).forEach(x => {
      let formatObj = {
        "name": x,
        "value": this.appliedCategories[x]
      }
      this.labelData.push(formatObj)
    });


    let count = 0;
    this.labelData.forEach((cat, j) => {
      if (cat.value) {
        count++;
        this.displayLabels.push(cat.name);
      }
    });
    this.selectedLabelCount = count;

  }

  ngOnDestroy() {
    this.utility.unsubscribe(this.updateLabelNamesSubscription$);
  }

}
