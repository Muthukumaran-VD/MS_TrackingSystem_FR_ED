import formatDate from "./DateFormat";

// The convertToCSV function transforms user data into a CSV string with headers and formatted date fields.
// The handleExport function fetches user data, converts it to CSV, and triggers a file download for the user.

const convertToCSV = (users) => {
  const headers = [
    "BGV ID",
    "Request ID",
    "Position Type",
    "PO Number",
    "Project",
    "MS Employee ID",
    "V Account",
    "First Name",
    "Last Name",
    "Middle Name",
    "Resource Name",
    "Legal Name",
    "VueData Employee ID",
    "VueData Email",
    "Phone Number",
    "Client Partner",
    "Client Partner Email",
    "Client Manager",
    "Client Manager Email",
    "Client Lead",
    "Client Lead Email",
    "BGV Submission Date",
    "BGV Completion Date",
    "ECA Submission Date",
    "ECA Completion Date",
    "Expiry Date",
    "Max Policy Expiry Date",
    "Work Start Date",
    "OnSite Offshore",
    "Employment Type",
    "Primary Skills",
    "Secondary Skills",
    "Resource Status",
    "Billing Status"
  ];

  const escapeCSVValue = (value) => {
    if (typeof value === 'string' && value.includes(',')) {
      return `"${value}"`;
    }
    return value;
  };

  const rows = users.map(user => [
    escapeCSVValue(user.BGV_ID),
    escapeCSVValue(user.Request_ID),
    escapeCSVValue(user.Position_Type),
    escapeCSVValue(user.PO_Number),
    escapeCSVValue(user.Project),
    escapeCSVValue(user.MS_Employee_ID),
    escapeCSVValue(user.V_Account),
    escapeCSVValue(user.First_Name),
    escapeCSVValue(user.Last_Name),
    escapeCSVValue(user.Middle_Name),
    escapeCSVValue(user.Resource_Name),
    escapeCSVValue(user.Legal_Name),
    escapeCSVValue(user.VueData_Employee_ID),
    escapeCSVValue(user.VueData_Email),
    escapeCSVValue(user.Phone_Number),
    escapeCSVValue(user.Client_Partner),
    escapeCSVValue(user.Client_Partner_Email),
    escapeCSVValue(user.Client_Manager),
    escapeCSVValue(user.Client_Manager_Email),
    escapeCSVValue(user.Client_Lead),
    escapeCSVValue(user.Client_Lead_Email),
    user.BGV_Submission_Date ? escapeCSVValue(formatDate(user.BGV_Submission_Date)) : '',
    user.BGV_Completion_Date ? escapeCSVValue(formatDate(user.BGV_Completion_Date)) : '',
    user.ECA_Submission_Date ? escapeCSVValue(formatDate(user.ECA_Submission_Date)) : '',
    user.ECA_Completion_Date ? escapeCSVValue(formatDate(user.ECA_Completion_Date)) : '',
    user.Expiry_Date ? escapeCSVValue(formatDate(user.Expiry_Date)) : '',
    user.Max_Policy_Expiry_Date ? escapeCSVValue(formatDate(user.Max_Policy_Expiry_Date)) : '',
    user.Work_Start_Date ? escapeCSVValue(formatDate(user.Work_Start_Date)) : '',
    escapeCSVValue(user.OnSite_Offshore),
    escapeCSVValue(user.Employment_Type),
    escapeCSVValue(user.Primary_Skills),
    escapeCSVValue(user.Secondary_Skills),
    escapeCSVValue(user.Resource_Status),
    escapeCSVValue(user.Billing_Status)
  ]);

  const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
  return csvContent;
};



async function handleExport() {
  try {
    const res = await fetch(`http://localhost:5001/users?all=true`);
    const data = await res.json();
    const csvData = convertToCSV(data.users);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'VD_InternalEmployeesForMS_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error('Error exporting data:', err);
  }
}

export default handleExport;
