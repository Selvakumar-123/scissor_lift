function doGet() {
    return HtmlService.createTemplateFromFile('Index')
      .evaluate()
      .setTitle('Ladder Safety Form');
  }
  
  function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
  }
  
  
  
  function processForm(formData) {
    try {
      // 1) Store data in the Google Sheet
      const spreadsheetId = '1iUVpTCDWKhMjItIGhuSZh_Qdd2CQR-5tJ8afWIuFCpg';
      const sheetName = 'Sheet1'; // or whichever sheet
      const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  
      sheet.appendRow([
        new Date(),
        formData.name,
        formData.finNo,
        formData.company,
        formData.signatureData
      ]);
  
      // 2) Build your HTML content, including the ladder safety bullet points
      const htmlContent = `
        <h3>Ladder Safety Form Submission</h3>
        <p><b>Date:</b> ${new Date()}</p>
        <p><b>Name:</b> ${formData.name}</p>
        <p><b>Fin no.:</b> ${formData.finNo}</p>
        <p><b>Company:</b> ${formData.company}</p>
        <hr/>
        
        <h4>Ladder Safety Instructions</h4>
        <ul>
          <li><b>Use the right ladder:</b> Choose a ladder with the proper load capacity for the job. Using the wrong ladder is a leading cause of ladder accidents.</li>
          <li><b>Inspect the ladder:</b> Check for defects before and after each use. Look for loose or damaged parts.</li>
          <li><b>Set up the ladder correctly:</b> Follow the 4-to-1 rule: the base should be 1 ft away for every 4 ft of height.</li>
          <li><b>Maintain three-point contact:</b> Keep two hands and one foot, or two feet and one hand in contact with the ladder at all times.</li>
          <li><b>Face the ladder:</b> Always face the ladder when climbing or descending.</li>
          <li><b>Keep the body inside the side rails:</b> Avoid leaning outside the rails to minimize fall risks.</li>
          <li><b>Avoid carrying tools in your hands:</b> Use a tool belt or a hand line to lift them.</li>
          <li><b>Don't move the ladder while occupied:</b> Ensure the ladder is unoccupied and secure before repositioning.</li>
          <li><b>Keep ladders free of slippery materials:</b> Clean debris and slippery substances before use.</li>
        </ul>
        <hr/>
  
        <p><b>Signature:</b></p>
        <img src="${formData.signatureData}" style="border:1px solid #ccc; width:300px;" />
      `;
  
      // 3) Create an HTML blob
      const htmlBlob = Utilities.newBlob(htmlContent, 'text/html', 'temp.html');
  
      // 4) Create a temporary file in Drive
      const tempFile = DriveApp.createFile(htmlBlob);
  
      // 5) Convert to PDF by getting it as application/pdf
      let pdfBlob = tempFile.getAs('application/pdf');
      pdfBlob.setName('LadderSafetyTemp.pdf');
  
      // 6) Save the PDF into your desired folder
      const driveFolderId = '1ZgbbKOTj2VEaQR34EmpqQxyxx-L2jqIq';
      const folder = DriveApp.getFolderById(driveFolderId);
      const timestamp = new Date().toISOString().replace(/[^\d]/g, '').substring(0, 14);
      const pdfFileName = `LadderSafety_${formData.name}_${timestamp}.pdf`;
      const finalFile = folder.createFile(pdfBlob).setName(pdfFileName);
  
      // 7) Clean up temp file if desired
      tempFile.setTrashed(true);
  
      // 8) Return success info
      return {
        success: true,
        message: 'Form submitted successfully!',
        pdfUrl: finalFile.getUrl()
      };
    } catch (err) {
      return {
        success: false,
        message: 'Error: ' + err
      };
    }
  }
  