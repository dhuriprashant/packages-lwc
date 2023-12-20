// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents

// https://developer.salesforce.com/docs/atlas.en-us.api_tooling.meta/api_tooling/tooling_api_objects_metadatapackage.htm

HttpRequest req = new HttpRequest();
req.setEndpoint('callout:Tooling_API_Credential/services/data/v52.0/tooling/query/?q=SELECT+Package2Id+FROM+Package2Version+WHERE+Id=\'05iHn000000kCKPIA2\'');
req.setMethod('GET');
Http http = new Http();
HTTPResponse res = http.send(req);
System.debug(res.getBody());

//services/data/v52.0/tooling/sobjects/MetadataPackage/033Hn0000007JkrIAE
//services/data/v52.0/tooling/query/?q=SELECT+Id,Name,NamespacePrefix,PackageCategory+FROM+MetadataPackage