const {
    getAuthToken,
    getSpreadSheetValues
  } = require('./googleSheetsService.js');

  require('dotenv').config()
  const spreadsheetId = process.env.SPREADSHEET_ID;
  const sheetName = process.env.SHEET_NAME;


  let sem = []; //storing semester
  let phone = [];//array for storing phone number
  let names = [];//array for storing names
  let branch = [] // array for branch
  let girl = [];//array for girls
  async function testGetSpreadSheetValues() {
    try {
      const auth = await getAuthToken();
      const response = await getSpreadSheetValues({
        spreadsheetId,
        sheetName,
        auth
      })
      //[this prints phone number]
      const limit = response.data.values.length
      
      // console.log(limit)
      for(i=1;i<limit;++i){
        const members = response.data.values[i]
        names.push(members[0])
        phone.push(members[9] + '@c.us');
        sem.push(members[1])
        branch.push(members[2])
        girl.push(members[3])
      }
      let datas = [names,phone,sem,branch,girl]
       return datas;
      
    } catch(error) {
      console.log(error.message, error.stack);
    }
  }
  function main() {
    testGetSpreadSheetValues();
  }
  main()

  module.exports = {
    testGetSpreadSheetValues
  }