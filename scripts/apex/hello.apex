// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents

HttpRequest req = new HttpRequest();
req.setEndpoint('callout:My_Named_Credential/services/data/v52.0/tooling/query/?q=SELECT+Id,Name,NamespacePrefix,PackageCategory+FROM+MetadataPackage');
req.setMethod('GET');
Http http = new Http();
HTTPResponse res = http.send(req);
System.debug(res.getBody());