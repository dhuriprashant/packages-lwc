public with sharing class PackageController {
  @AuraEnabled(cacheable=true)
  public static List<MetadataPackage> getPackageInfo() {
    try {
      String query = 'SELECT+Id,Name,NamespacePrefix,Description+FROM+Package2';
      Map<String, Object> responseMap = executeToolingApiQuery(query);

      // Parse the JSON response into a MetadataPackageResult instance
      MetadataPackageResult metadataPackageResult = (MetadataPackageResult) JSON.deserialize(
        JSON.serialize(responseMap),
        MetadataPackageResult.class
      );

      // Return the list of MetadataPackage instances
      return metadataPackageResult.records;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled(cacheable=true)
  public static List<MetadataPackageVersion> getPackageVersions(
    String metadataPackageid
  ) {
    try {
      String query =
        'SELECT+Id,Name,MajorVersion,MinorVersion,PatchVersion,BuildNumber+FROM+Package2Version+WHERE+Package2Id=\'' +
        metadataPackageid +
        '\'';
      Map<String, Object> responseMap = executeToolingApiQuery(query);

      // Parse the JSON response into a MetadataPackageVersionResult instance
      MetadataPackageVersionResult metadataPackageVersionResult = (MetadataPackageVersionResult) JSON.deserialize(
        JSON.serialize(responseMap),
        MetadataPackageVersionResult.class
      );

      // Return the list of MetadataPackageVersion instances
      return metadataPackageVersionResult.records;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled(cacheable=true)
  public static List<PackageSubscriber> getPackageSubscribers(
    String metadataPackageid
  ) {
    try {
      String query = 'SELECT Id, MetadataPackageVersionId, OrgKey, OrgName, OrgStatus, OrgType, InstanceName, InstalledStatus FROM PackageSubscriber ORDER BY SystemModStamp DESC';
      Map<String, Object> responseMap = executeRestApiQuery(query);

      // Parse the JSON response into a PackageSubscriberResult instance
      PackageSubscriberResult packageSubscriberResult = (PackageSubscriberResult) JSON.deserialize(
        JSON.serialize(responseMap),
        PackageSubscriberResult.class
      );

      // Return the list of PackageSubscriber instances
      return packageSubscriberResult.records;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  private static Map<String, Object> executeToolingApiQuery(String query) {
    HttpRequest req = new HttpRequest();
    req.setEndpoint(
      'callout:Tooling_API_Credential/services/data/v52.0/tooling/query/?q=' +
      query
    );
    req.setMethod('GET');
    Http http = new Http();
    HTTPResponse res = http.send(req);
    String responseBody = res.getBody();

    // Parse the JSON response into a Map
    return (Map<String, Object>) JSON.deserializeUntyped(responseBody);
  }

  private static Map<String, Object> executeRestApiQuery(String query) {
    // URL encode the query
    String encodedQuery = EncodingUtil.urlEncode(query, 'UTF-8');

    // Create the HTTP request
    HttpRequest req = new HttpRequest();
    req.setEndpoint(
      'callout:Tooling_API_Credential/services/data/v52.0/query/?q=' +
      encodedQuery
    );
    req.setMethod('GET');

    // Send the request
    Http http = new Http();
    HttpResponse res = http.send(req);

    // Parse the JSON response
    Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(
      res.getBody()
    );

    return responseMap;
  }

  public class MetadataPackage {
    @AuraEnabled
    public String Id;
    @AuraEnabled
    public String Name;
    @AuraEnabled
    public String NamespacePrefix;
    @AuraEnabled
    public String Description;
    // Add other fields as needed
  }

  public class MetadataPackageResult {
    public List<MetadataPackage> records;
  }

  public class MetadataPackageVersion {
    @AuraEnabled
    public String Id;
    @AuraEnabled
    public String Name;
    @AuraEnabled
    public String MajorVersion;
    @AuraEnabled
    public String MinorVersion;
    @AuraEnabled
    public String PatchVersion;
    @AuraEnabled
    public String BuildNumber;
    // Add other fields as needed
  }

  public class MetadataPackageVersionResult {
    public List<MetadataPackageVersion> records;
  }

  public class PackageSubscriber {
    @AuraEnabled
    public String Id;
    @AuraEnabled
    public String MetadataPackageVersionId;
    @AuraEnabled
    public String OrgKey;
    @AuraEnabled
    public String OrgName;
    @AuraEnabled
    public String OrgStatus;
    @AuraEnabled
    public String OrgType;
    @AuraEnabled
    public String InstanceName;
    @AuraEnabled
    public String InstalledStatus;
    // Add other fields as needed
  }

  public class PackageSubscriberResult {
    public List<PackageSubscriber> records;
  }
}
