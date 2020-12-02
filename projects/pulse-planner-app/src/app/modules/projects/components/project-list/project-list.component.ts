import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import * as d3 from "d3";
import { DialogService } from '../task-table/dialog.service';
import { Group } from '../../../../models/group.model';
import { UtilityService } from '../../../../shared/services/utility.service';
import { settings } from '../../../../contents/config';
import { Assignee } from '../../../../models/assignee.model';
declare var $: any;

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectListComponent implements OnInit {

  projectList = [];
  groupMemberList: any;
  projects: any = [];
  groupId: any;
  assigneeData: any = [];
  assigneePhoto: any;
  chartList: any = [];
  loading: boolean;
  projectCount: number = 0; //project count
  isAllProjectsLoaded: boolean = false;
  groupCount: number = 0; //Group count
  isAllGroupsLoaded: boolean = false;
  distinctGroupIds: any[];
  groups: Group[] = [];
  selectedGroup: Group;

  clonedGroups: Group[] = [];
  settings: any;
  txtSearch: string = "";
  filterBox: boolean = false;

  @ViewChild("projectListContainer") projectListContainer: ElementRef;
  groupsSubscription$: Subscription;
  groupLogoSubscriptions: Subscription[] = [];
  groupMemberPhotoSubscriptions: Subscription[] = [];
  confirmDialogSubscription$: Subscription;
  groupMemberSubscription$: Subscription;
  projectSubscription$: Subscription;
  errorSubscription$: Subscription;


  // @HostListener('window:scroll', ['$event'])
  // scrollHandler(event) {
  //   if (this.isAllProjectsLoaded || this.loading) return;
  //   const totalPageHeight = document.body.scrollHeight;
  //   const scrollPoint = window.scrollY + window.innerHeight;
  //   // check if we hit the bottom of the page
  //   if (scrollPoint >= totalPageHeight) {
  //     this.getProjectList(this.selectedGroup);
  //   }
  // }


  scrollHandler(event) {
    if (this.isAllProjectsLoaded || this.loading) return;
    if (this.projectListContainer.nativeElement.scrollTop === (this.projectListContainer.nativeElement.scrollHeight - this.projectListContainer.nativeElement.offsetHeight)) {
      this.getProjectList(this.selectedGroup.id);
    }
  }

  logout() {
  
  }

  constructor(
    private apiService: ApiService,
    public router: Router,
    public domSanitizer: DomSanitizer,
    public utility: UtilityService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.settings = settings;
    this.selectedGroup = new Group();
    this.selectedGroup.id = "";
  }

  ngOnInit(): void {
    this.errorSubscription$ = this.utility.triggerError().subscribe(err => {
      if (!Object.keys(err).length) return;
      const message = err as string
      if (message.includes("Plan/PlansAssociatedByGroup"))
        this.loading = false;
    });

    this.activatedRoute.params.subscribe(params => {
      const groupId = params["groupId"];
      if (groupId) {
        this.groupCount = 0;
        this.groups.length = 0;
        this.clonedGroups.length = 0;
        this.loadAllGroups(groupId);
      }
      else
        this.loadAllGroups("");
    })
  }

  loadAllGroups(selectedGroupId: string = "") {
    // const staticPhoto = "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";
    this.groupsSubscription$ = this.apiService.getMyGroups(this.groupCount + 1, settings.project.groupsPerPage).subscribe(
      resp => {
        /**** Group Info ****/
        const groups = resp as Group[];
        groups.forEach(group => {
          this.groups.push(group)
        })
        const clone = [...groups];
        clone.forEach(group => {
          this.clonedGroups.push(group)
        });
        this.groupCount = this.groupCount + groups.length;
        this.isAllGroupsLoaded = groups.length < settings.project.groupsPerPage;

        /**** Group Logo ****/
        this.clonedGroups.forEach(group => {
          if (!group.photo)
            this.groupLogoSubscriptions.push(this.apiService.getGroupLogoById(group.id).subscribe(photo => {
              group.photo = photo;
            }))
        });


        /**** Group Selection ****/
        this.isAllProjectsLoaded = false;
        this.projectCount = 0;
        if (selectedGroupId)
          this.selectGroup(selectedGroupId);
        else
          this.navigate(this.groups[0].id);
      }
    )
  }

  onProjectAdded(event) {
    if (event) {
      $("#addProject").modal("hide");
      this.getProjectList(this.selectedGroup.id);
    }
  }

  reloadPage(groupId: string, event) {
    // $('[data-toggle=tooltip]').on('click', function () {
    //   $(this).tooltip('hide')
    // })
    $(event.target.parentElement).tooltip('hide')
    this.navigate(groupId);
  }

  private navigate(groupId: string) {
    this.router.navigate([
      `/planner/projects/${groupId}`
    ]);
  }


  selectGroup(groupId: string) {
    this.groups.forEach(g => g.selected = false); //unselect all
    this.selectedGroup = this.groups.find(g => g.id === groupId);
    this.projectList.length = 0;
    this.projectCount = 0;
    this.utility.groupId = groupId;

    if (this.selectedGroup) {
      this.selectedGroup.selected = true; //select group
      this.getProjectList(groupId);
    }
    else
      console.log(`Group id '${groupId}' does not exists.`)
  }

  onGroupChange(group) {
    this.isAllProjectsLoaded = false;
    this.projectCount = 0;
    this.getProjectList(group);
  }

  applyFilter(filterText: string) {
    this.clonedGroups = this.groups
      .filter(group => group.displayName.toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1);
  }

  clearFilter() {
    this.txtSearch = "";
    this.applyFilter(this.txtSearch);
    this.filterBox = false;
  }

  getProjectList(groupId: string) {
    this.loading = true;
    // this.projectList.length = 0;
    this.projectSubscription$ = this.apiService.getProjectList(groupId, this.projectCount + 1, settings.project.projectsPerPage).subscribe(
      (data) => {
        this.projects = data;

        this.isAllProjectsLoaded = this.projects.length < settings.project.projectsPerPage;
        // console.log('pie chart data',data)
        this.projects?.forEach((project, index: number) => {
          project.groupId = groupId;
          let allResultData = {
            'desc': '', 'title': project.title,
            'id': project.id,
            'groupId': project.groupId,
            'percentComplete': project.percentComplete,
            'completedTasks': project.completedTasks,
            'totalTasks': project.totalTasks,
            'daysLeft': project.daysLeft
          };
          this.projectList.push(allResultData);
          this.chartList.push(project);
          this.loading = false;
          // console.log('chartList', this.chartList);

          setTimeout(() => {
            this.animationpieChart(`chart${this.projectCount}`, project, this.projectCount);
            this.projectCount++;
          }, 50);
        });
        // const uniqueList = [...new Set(this.projects.map(project => project.groupId))];
        // this.distinctGroupIds = [...(this.distinctGroupIds || []), ...uniqueList];
        this.getGroupMembers(groupId);
      },
      (error) => {
        console.log("projects not found")
        this.loading = false;
        // this.projects = [];
      }
    );
  }


  navigateToProjects(planId, groupId, title) {
    this.router.navigate([
      'planner/projects',
      groupId,
      planId,
      'Tasks',
      title
    ]);
  }

  /* chart section start */
  animationpieChart(selector, project, count) {

    // console.log("value of selector", selector)
    let dataset = {
      data: [],
    };
    let prepareData = [];
    prepareData.push(project.completedTasks);
    prepareData.push(project.pendingTasks);
    prepareData.push(project.notStartedTasks);
    prepareData.push(project.lateTasks);
    let tooltipData = [];
    tooltipData.push({ 'taskName': 'Completed', 'count': project.completedTasks });
    tooltipData.push({ 'taskName': 'In Progress', 'count': project.pendingTasks });
    tooltipData.push({ 'taskName': 'Not Started', 'count': project.notStartedTasks });
    tooltipData.push({ 'taskName': 'Late', 'count': project.lateTasks });

    dataset.data = prepareData;
    // console.log(prepareData);
    var width = 100, //width of the pie chart
      height = 100, radius;
    var color = d3.scaleOrdinal().domain(dataset).range(['#418040', '#327eaa', '#605e5c', '#d13438']);
    let elementId = '#' + selector;
    const center = {
      x: width / 2 + 20,
      y: height / 2
    }
    //  console.log(elementId);

    var svg = d3.select(elementId)
      .append('svg')
      .attr('width', '100%');

    var g = svg.attr('height', height)
      .append('g')
      .attr('transform', `translate(${center.x}, ${center.y})`);

    radius = Math.min(width, height) / 2;
    var pie = d3.pie()
      .value(function (d) {
        return d;
      }).sort(null);

    var arc = d3.arc()
      .innerRadius(radius - 8)
      .outerRadius(radius - 20);

    // const rx = 12;
    // const ry = 12;

    g.selectAll("path")
      .data(pie(prepareData))
      .enter().append("path")
      .attr("fill", function (d, idx) { return color(idx); })
      .style("stroke", "#FFF")
      .style("stroke-width", "5")
      .style("stroke-opacity", "1")
      .style("stroke-linejoin", "round")
      .on("mouseover", function (d) {
        d3.select(this).attr('class', 'pathshow');
        d3.select(elementId).selectAll("path").style('opacity', '0.5');
        d3.select(this).attr('data-toggle', 'tooltip');
        d3.select(this).attr('title', tooltipData[d.index].taskName + ': ' + tooltipData[d.index].count);
      })
      .on("mouseout", function (d) {
        d3.select(this).attr('class', '');
        d3.select(elementId).selectAll("path").style('opacity', '1');
      }) // hover should call before transition
      .transition()
      .duration(function (d, k) {
        return k * 1000;
      })
      .attrTween('d', function (d) {
        let u = d3.interpolate(d.startAngle, d.endAngle);
        return function (t) {
          d.endAngle = u(t);
          return arc(d);
        }
      });
    const taskLeft = project.totalTasks - project.completedTasks;

    svg.append("g")
      .append("text").text(("0" + taskLeft).slice(-2))
      .style("font-size", "20px")
      .attr("class", "task-left")
      .attr("alignment-baseline", "middle")
      .attr('transform', `translate(${center.x - 13}, ${center.y - 10})`);

    svg.append("g")
      .append("text").text("Tasks left")
      .style("font-size", "12px")
      .attr("class", "task-left")
      .attr("alignment-baseline", "middle")
      .attr('transform', `translate(${center.x - 28}, ${center.y + 10})`);

  }
  /* chart section end */

  intToRGB(i) {
    var c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();
    return "00000".substring(0, 6 - c.length) + c;
  }

  hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  showGroupMember(members) {
    this.projectList.forEach(p => { p.groupMembers = members })
  }


  getGroupMembers(groupId: string) {
    this.groupMemberSubscription$ = this.apiService.getAllGroupMembers(groupId).subscribe(
      res => {
        this.showGroupMember(res as Assignee[]);
        this.showGroupMembersPhoto(res as Assignee[]);
      },
      error => {
        console.error(error);
      }
    );
  }

  showGroupMembersPhoto(groupMembers: Assignee[]) {
    if (this.projectList) {
      const firstProject = this.projectList[0];
      const groupMembers = firstProject.groupMembers as Assignee[];
      if (!groupMembers.some(member => member.photo))
        groupMembers.forEach(member => {
          // if (!member.photo)
          this.groupMemberPhotoSubscriptions.push(this.apiService.getGroupMembersPhotoById(firstProject.groupId, member.id).subscribe(photo => {
            member.photo = photo as string;
            // console.log(member.id, member.photo);
          }))
        })
    }
  }


  ngOnDestroy() {
    this.utility.unsubscribe(this.groupsSubscription$);
    this.utility.unsubscribe(this.projectSubscription$);
    this.utility.unsubscribe(this.groupMemberSubscription$);
    this.groupLogoSubscriptions.forEach(sub => { this.utility.unsubscribe(sub); });
    this.groupMemberPhotoSubscriptions.forEach(sub => { this.utility.unsubscribe(sub); });
    this.utility.unsubscribe(this.confirmDialogSubscription$);
    this.utility.unsubscribe(this.errorSubscription$);
    $('.tooltip').hide();
  }
}