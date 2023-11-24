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
    label: "Package Version Name",
    fieldName: "Name",
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
    label: "Version Number",
    fieldName: "BuildNumber",
    hideDefaultActions: true
  }
];

const SCOLS = [
  { label: "Org Name", fieldName: "OrgName", hideDefaultActions: true },
  {
    label: "Package Version",
    fieldName: "MetadataPackageVersionId",
    hideDefaultActions: true
  },
  { label: "Org Type", fieldName: "OrgType", hideDefaultActions: true },
  { label: "Org Status", fieldName: "OrgStatus", hideDefaultActions: true }
];

export default class PackagingInfo extends LightningElement {
  @track metadataPackageId = "";
  @track packageVersions;
  @track packageSubscribers;
  @track defaultSelectedRows = [];

  columns = COLS;
  vColumns = VCOLS;
  sColumns = SCOLS;

  @wire(getPackageInfo)
  packages;

  renderedCallback() {
    if (
      this.packages.data &&
      this.packages.data.length > 0 &&
      this.defaultSelectedRows.length === 0
    ) {
      this.defaultSelectedRows = [this.packages.data[0].Id];
      this.metadataPackageId = this.packages.data[0].Id;
      console.log("defaultSelectedRows:", this.defaultSelectedRows);
    }
    console.log("packages.data:", this.packages.data);
  }

  onRowSelection(event) {
    const selectedRows = event.detail.selectedRows;
    if (selectedRows.length > 0) {
      this.metadataPackageId = selectedRows[0].Id;
    }
  }

  @wire(getPackageVersions, { metadataPackageid: "$metadataPackageId" })
  wiredPackageVersions({ data, error }) {
    if (data) {
      this.packageVersions = data;
    } else if (error) {
      this.packageVersions = undefined;
      console.error("Error fetching package versions:", error);
    }
  }

  @wire(getPackageSubscribers, { metadataPackageid: "$metadataPackageId" })
  wiredPackageSubscribers({ data, error }) {
    if (data) {
      this.packageSubscribers = data;
    } else if (error) {
      this.packageSubscribers = undefined;
      console.error("Error fetching package subscribers:", error);
    }
  }
}
