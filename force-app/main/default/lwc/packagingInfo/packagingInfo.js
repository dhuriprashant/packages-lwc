import { LightningElement, wire, track } from "lwc";
import getPackageInfo from "@salesforce/apex/PackageController.getPackageInfo";
import getPackageVersions from "@salesforce/apex/PackageController.getPackageVersions";
import getPackageSubscribers from "@salesforce/apex/PackageController.getPackageSubscribers";

const COLS = [
  { label: "Package ID", fieldName: "Id", hideDefaultActions: true },
  { label: "Package Name", fieldName: "Name", hideDefaultActions: true },
  {
    label: "Namespce Prefix",
    fieldName: "NamespacePrefix",
    hideDefaultActions: true
  },
  {
    label: "Package Category",
    fieldName: "PackageCategory",
    hideDefaultActions: true
  }
];

const VCOLS = [
  {
    label: "Version Name",
    fieldName: "Name",
    hideDefaultActions: true
  },
  {
    label: "Version",
    fieldName: "VersionNumber",
    hideDefaultActions: true
  },
  {
    label: "Subscriber Package Version ID",
    fieldName: "Id",
    hideDefaultActions: true
  },
  {
    label: "Release State",
    fieldName: "ReleaseState",
    hideDefaultActions: true
  },
  {
    label: "Is Deprecated",
    fieldName: "IsDeprecated",
    hideDefaultActions: true
  }
];

const SCOLS = [
  {
    label: "Package Version",
    fieldName: "MetadataPackageVersionId",
    hideDefaultActions: true
  },
  { label: "Org ID", fieldName: "OrgKey", hideDefaultActions: true },
  { label: "Org Name", fieldName: "OrgName", hideDefaultActions: true },
  { label: "Org Type", fieldName: "OrgType", hideDefaultActions: true },
  { label: "Org Status", fieldName: "OrgStatus", hideDefaultActions: true },
  {
    label: "Instance Name",
    fieldName: "InstanceName",
    hideDefaultActions: true
  },
  {
    label: "Installed Status",
    fieldName: "InstalledStatus",
    hideDefaultActions: true
  }
];

export default class PackagingInfo extends LightningElement {
  @track packageVersions;
  @track packageSubscribers;

  columns = COLS;
  vColumns = VCOLS;
  sColumns = SCOLS;

  @wire(getPackageInfo)
  packages;

  onRowSelection(event) {
    const selectedRowId = event.detail.selectedRows[0].Id;

    // Fetch related package versions and package subscribers
    getPackageVersions({ metadataPackageid: selectedRowId })
      .then((result) => {
        this.packageVersions = result.map((row) => ({
          ...row,
          VersionNumber:
            row.MajorVersion +
            "." +
            row.MinorVersion +
            "." +
            row.PatchVersion +
            "." +
            row.BuildNumber
        }));
      })
      .catch((error) => {
        console.error("Error fetching package versions:", error);
      });

    getPackageSubscribers({ metadataPackageid: selectedRowId })
      .then((result) => {
        this.packageSubscribers = result;
      })
      .catch((error) => {
        console.error("Error fetching package subscribers:", error);
      });
  }
}
