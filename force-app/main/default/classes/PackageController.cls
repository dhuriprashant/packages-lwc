public with sharing class PackageController {

    @AuraEnabled(cacheable=true)
    public static List<MetadataPackage> getPackageInfo(){
        try {
                List<MetadataPackage> packages = [SELECT Id, Name, NamespacePrefix, PackageCategory FROM MetadataPackage ORDER BY SystemModStamp DESC];
                return packages;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<MetadataPackageVersion> getPackageVersions(String metadataPackageid){
        try {

            List<MetadataPackageVersion> packageVersions = [SELECT BuildNumber, Id, IsDeprecated, MajorVersion, MetadataPackageid, MinorVersion, Name, PatchVersion, ReleaseState, SystemModStamp FROM MetadataPackageVersion 
            where MetadataPackageid = :metadataPackageid ORDER BY SystemModStamp DESC];
            return packageVersions;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<PackageSubscriber> getPackageSubscribers(String metadataPackageid){
        try {

            List<PackageSubscriber> packageSubscribers = [SELECT Id, InstanceName, MetadataPackageId, MetadataPackageVersionId, OrgKey, OrgName, OrgStatus, OrgType, ParentOrg, SystemModStamp FROM PackageSubscriber 
            where MetadataPackageId = :metadataPackageid ORDER BY SystemModStamp DESC];
            return packageSubscribers;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public class MetadataPackageInfo {
        public Id Id;
        public String Name;
        public String NamespacePrefix;
        public String PackageCategory;
        public Datetime SystemModStamp;
    }

    public class MetadataPackageVersionInfo {
        public Decimal BuildNumber;
        public Id Id;
        public Boolean IsDeprecated;
        public Decimal MajorVersion;
        public String MetadataPackageId;
        public Decimal MinorVersion;
        public String Name;
        public Decimal PatchVersion;
        public String ReleaseState;
        public Datetime SystemModStamp;
    }

    public class PackageSubscriberInfo {
        public Id Id;
        public String InstanceName;
        public Id MetadataPackageVersionId;
        public Id OrgKey;
        public String OrgName;
        public String OrgStatus;
        public String OrgType;
        public Id ParentOrg;
        public Datetime SystemModStamp;
    }

}