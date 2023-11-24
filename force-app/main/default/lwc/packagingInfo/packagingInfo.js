import { LightningElement, wire, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
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
        this.packageVersions = result;
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

  showToast() {
    this.dispatchEvent(
      new ShowToastEvent({
        title: "Tip",
        message:
          "Click on a row radio button to display related package versions and package subscribers.",
        variant: "info"
      })
    );
  }

  connectedCallback() {
    this.showToast();
  }
}
