function main() {
    // Init spreadsheet
    var spreadsheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1vGKpaMOWz6RokCpVfNY_WWRr0qKUhWn4Li6sypVuVi8/edit?usp=sharing');
    var sheet = spreadsheet.getSheets()[0];

    var accountSelector = MccApp
        .accounts()
        // .withIds(['539-494-4175','349-536-3598','496-666-4570','904-523-4400'])
        .withCondition("LabelNames CONTAINS 'SR-HP'")
        .forDateRange("LAST_30_DAYS");
    
    var accountIterator = accountSelector.get();

    while(accountIterator.hasNext()) {
        var account = accountIterator.next();
        var accountName = account.getName();
      Logger.log("Account being processed: " + accountName);
        MccApp.select(account);

    // Conditional check to see if impressions are != 0
      // Flag if 0 - notify (Pause FB campaigns)
      var campaignSelector = AdWordsApp
      .campaigns()
      .withCondition("LabelNames = 'SR-HP'")
      .forDateRange("LAST_30_DAYS");

      var campaignIterator = campaignSelector.get();
      while (campaignIterator.hasNext()) {
        var campaign = campaignIterator.next();
        var campaignName = campaign.getName();
        Logger.log("Campaign Name: " + campaignName);
        var stats = campaign.getStatsFor("LAST_30_DAYS");
        var impressions = stats.getImpressions();
        Logger.log("Impressions: " + impressions);

        if(impressions != 0) {
            Logger.log("Campaign: " + campaignName + " Impressions: " + impressions);
        }
        else {
            Logger.log("Campaign at 0! Notify!: " + campaignName+ " Impressions: " + impressions);
        }
        
      }
    }

  }



  // AQL Query to generate the report.

//   // Conditional check inside query string to see if it is an active campaign
//   var reportString = "SELECT AccountDescriptiveName, CampaignName, StartDate, EndDate, Impressions, Clicks, Cost, AverageCpm, Ctr FROM CAMPAIGN_PERFORMANCE_REPORT WHERE Impressions != 0 AND LabelNames = SR-HP DURING LAST_7_DAYS";
        
//   var report = AdWordsApp.report(reportString);
//   var iter = report.rows();
      
//   while(iter.hasNext()) {
//       var reportRow = iter.next();
  
//       sheet.appendRow([
//           reportRow["AccountDescriptiveName"],
//           reportRow["CampaignName"],
//           reportRow["StartDate"],
//           reportRow["EndDate"],
//           reportRow["Impressions"],
//           reportRow["Clicks"],
//           reportRow["Cost"],
//           reportRow["AverageCpm"],
//           reportRow["Ctr"]
//       ]);
//   }
  
  