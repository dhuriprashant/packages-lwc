/**
 * Created by Prashant on 12/22/2023.
 */

import { LightningElement, track, wire } from "lwc";
import getCountries from "@salesforce/apex/CountryController.getCountries";
import getTotalCountries from "@salesforce/apex/CountryController.getTotalCountries";

const columns = [
  { label: "Country ID", fieldName: "Country_ID__c" },
  { label: "Country Name", fieldName: "Name" },
  { label: "Created By", fieldName: "CreatedById" },
  { label: "Last Modified By", fieldName: "LastModifiedById" },
  { label: "Owner", fieldName: "OwnerId" },
  { label: "Region", fieldName: "Region__c" }
];

export default class CountryList extends LightningElement {
  data = [];
  columns = columns;
  loadMoreStatus;
  @track totalNumberOfRows;
  rowLimit = 25;
  rowOffSet = 0;

  connectedCallback() {
    this.loadData();
  }

  loadData() {
    getCountries({ limitSize: this.rowLimit, offsetSize: this.rowOffSet })
      .then((result) => {
        this.data = result;
        //this.totalNumberOfRows = 100;
      })
      .catch((error) => {
        this.error = error;
      });
  }

  @wire(getTotalCountries)
  wiredTotal({ error, data }) {
    if (data) {
      this.totalNumberOfRows = data;
    } else if (error) {
      console.error(error);
    }
  }

  loadMoreData(event) {
    // Check if all rows are loaded
    if (this.data.length >= this.totalNumberOfRows) {
      event.target.enableInfiniteLoading = false;
      this.loadMoreStatus = "No more data to load";
      return;
    }

    //Display "Loading" when more data is being loaded
    this.loadMoreStatus = "Loading";

    this.rowOffSet = this.rowOffSet + this.rowLimit;
    getCountries({ limitSize: this.rowLimit, offsetSize: this.rowOffSet }).then(
      (data) => {
        const currentData = this.data;
        //Appends new data to the end of the table
        const newData = currentData.concat(data);
        this.data = newData;
        this.loadMoreStatus = "";
      }
    );
  }
}
