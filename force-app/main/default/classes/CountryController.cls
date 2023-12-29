/**
 * Created by Prashant on 12/22/2023.
 */

public with sharing class CountryController {
  @AuraEnabled(Cacheable=true)
  public static List<Country__c> getCountries(
    Integer limitSize,
    Integer offsetSize
  ) {
    return [
      SELECT
        Id,
        Country_ID__c,
        Name,
        CreatedById,
        LastModifiedById,
        OwnerId,
        Region__c
      FROM Country__c
      ORDER BY Name ASC
      LIMIT :limitSize
      OFFSET :offsetSize
    ];
  }

  @AuraEnabled(Cacheable=true)
  public static Integer getTotalCountries() {
    try {
      return [SELECT COUNT() FROM Country__c];
    } catch (Exception e) {
      throw new AuraHandledException(
        'Unable to retrieve total number of countries: ' + e.getMessage()
      );
    }
  }
}
