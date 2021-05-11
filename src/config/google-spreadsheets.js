const loadSpreadsheetInfo = () => {
  const spreadsheet = {
    id: process.env.GOOGLE_SPREADSHEET_ID,
    tabs: {
      foodPlan: process.env.GOOGLE_SPREADSHEET_FOOD_PLAN_TAB,
      ditaData: process.env.GOOGLE_SPREADSHEET_DITA_DATA_TAB,
      foodData: process.env.GOOGLE_SPREADSHEET_FOOD_DATA_TAB,
      foodAnalysis: process.env.GOOGLE_SPREADSHEET_FOOD_ANALYSIS_TAB,
    },
  };

  return spreadsheet;
};

module.exports = {
  loadSpreadsheetInfo,
};
