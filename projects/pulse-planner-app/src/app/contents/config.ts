export const settings = {
    tabs: ["Overview", "Tasks", "Team", "Files", "Activity"],
    dateFormat: 'DD/MM/YYYY',
    project: {
        groupsPerPage: 12,
        projectsPerPage: 6,
        ganttChart: {
            dayWidth: 40,
            todayIndicatorThickness: 4,
            dependency: {
                lineThickness: 2,
                popupWidth: 400
            },
            extraDays: 2,
            scrollbarWidth: 10,
            calenderMonthWidth: 4 // number of calender days taken to show month name with year

        },
        taskTable: {
            rowHeight: 30,
            headerHeight: 56,
            recordPerPage: 10
        },
        resourceManagement: {
            maxResource: 8, //maximum number of resources allowed to show in the Resource Management pane
            resouceDetailPopupWidth: 350
        },
        offDays: ['sa', 'su']   //saturday and sunday
    },
    noLoaderAPIs: [
        "Buckets",
        "Plan/GetPlanCategoryDescriptions",
        "Tasks/Details",
        "Tasks/AddTaskComments",
        "Tasks/DeleteDependancy",
        "Tasks/AddDependency",
        "Tasks/GetResource",

        "Group/MyGroupMember",
        "Group/GroupLogoById",
        "Group/UserPhotoById"
    ],
}

export const inputMaxLength = {
    maxLengthInput: 100,
    maxLengthTextArea: 300

}