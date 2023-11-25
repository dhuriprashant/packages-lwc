public with sharing class PackageController {

    @AuraEnabled(cacheable=true)
    public static List<MetadataPackage> getPackageInfo(){
        if (!Schema.sObjectType.MetadataPackage.isAccessible()) {
            throw new AuraHandledException('You do not have the necessary permissions to perform this operation.');
        }
        try {
            List<MetadataPackage> packages = [SELECT Id, Name, NamespacePrefix, PackageCategory FROM MetadataPackage ORDER BY SystemModStamp DESC];
            return packages;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<MetadataPackageVersion> getPackageVersions(String metadataPackageid){
        if (!Schema.sObjectType.MetadataPackageVersion.isAccessible()) {
            throw new AuraHandledException('You do not have the necessary permissions to perform this operation.');
        }
        try {
            List<MetadataPackageVersion> packageVersions = [SELECT Id, MetadataPackageid, Name, MajorVersion, MinorVersion, PatchVersion, BuildNumber, ReleaseState, IsDeprecated FROM MetadataPackageVersion 
            where MetadataPackageid = :metadataPackageid ORDER BY SystemModStamp DESC];
            return packageVersions;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<PackageSubscriber> getPackageSubscribers(String metadataPackageid){
        if (!Schema.sObjectType.PackageSubscriber.isAccessible()) {
            throw new AuraHandledException('You do not have the necessary permissions to perform this operation.');
        }
        try {
            List<PackageSubscriber> packageSubscribers = [SELECT Id, InstanceName, MetadataPackageId, MetadataPackageVersionId, OrgKey, OrgName, OrgStatus, OrgType, ParentOrg, SystemModStamp FROM PackageSubscriber 
            where MetadataPackageId = :metadataPackageid ORDER BY SystemModStamp DESC];
            return packageSubscribers;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}