const RolesAndPermissions = {
  ADMIN: [
    "viewDashboard",
    "manageEmployee",
    "manageDepartments",
    "approveLeave",
    "leaveManagement",
    "applyLeave",
    "viewLeave",
    "selfReview",
    "staffReview",
    "viewPerformance",
    "performanceManagement",
  ],
  HR_MANAGER: ["viewDashboard", "manageEmployee", "approveLeave"],
  DepartmentHead: [
    "viewDepartment",
    "reviewDepartmentAppraisals",
    "approveLeave",
  ],
  EMPLOYEE: [
    "viewDashboard",
    "leaveManagement",
    "applyLeave",
    "performanceManagement",
    "selfReview",
  ],
};

// RolesAndPermissions["ADMIN"] = [
//   ...RolesAndPermissions["HR_MANAGER"],
//   ...RolesAndPermissions["DepartmentHead"],
// ];

export { RolesAndPermissions };
