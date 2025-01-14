function doPost(e) {
    if (!e || !e.parameter) {
        return ContentService.createTextOutput(JSON.stringify({status: 'error', message: 'No parameters received'}))
                             .setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = SpreadsheetApp.openById('15XcqYky9dDGhFGOIzDGHmdiEdb3l307-rZLnILjWtDE').getSheetByName('Sheet1');
    const data = e.parameter;

    const row = [
        new Date(),
        data.name,
        data.company,
        data.lift_number,
        data.operating_controls,
        data.emergency_lowering,
        data.override_controls,
        data.protected_controls,
        data.control_panel,
        data.switch_guards,
        data.indicator_lights,
        data.drive_controls,
        data.motion_alarms,
        data.guard_rails,
        data.platform_extension,
        data.platform_clean,
        data.lift_defects,
        data.tires_condition,
        data.oil_level,
        data.hydraulic_oil_level,
        data.fuel_level,
        data.coolant_level,
        data.battery_charged,
        data.ppe_in_use,
        data.traffic_watch,
        data.signature
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({status: 'success'})).setMimeType(ContentService.MimeType.JSON);
}
