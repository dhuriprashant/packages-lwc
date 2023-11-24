import { LightningElement, wire, track } from 'lwc';
import getPackageInfo from '@salesforce/apex/PackageController.getPackageInfo';
import getPackageVersions from '@salesforce/apex/PackageController.getPackageVersions';
import getPackageSubscribers from '@salesforce/apex/PackageController.getPackageSubscribers';

const actions = [
    { label: 'Show versions', name: 'show_versions' },
    { label: 'Show subscribers', name: 'show_subscribers' }
];

const COLS = [
    { label: 'Package ID', fieldName: 'Id', hideDefaultActions: true },
    { label: 'Package Name', fieldName: 'Name', hideDefaultActions: true},
    { label: 'Namespce Prefix', fieldName: 'NamespacePrefix', hideDefaultActions: true},
    { label: 'Package Category', fieldName: 'PackageCategory', hideDefaultActions: true},
    { label: 'SystemModStamp', fieldName: 'SystemModStamp', hideDefaultActions: true, type: 'date'},
    { type: 'action', typeAttributes: { rowActions: actions, menuAlignment: 'right' } }
];

const VCOLS = [
    { label: 'Package Version Name', fieldName: 'Name', hideDefaultActions: true },
    { label: 'Subscriber Package Version ID', fieldName: 'Id', hideDefaultActions: true},
    { label: 'Release State', fieldName: 'ReleaseState', hideDefaultActions: true},
    { label: 'Version Number', fieldName: 'BuildNumber', hideDefaultActions: true},
];

const SCOLS = [
    { label: 'Org Name', fieldName: 'OrgName', hideDefaultActions: true },
    { label: 'Package Version', fieldName: 'MetadataPackageVersionId', hideDefaultActions: true},
    { label: 'Org Type', fieldName: 'OrgType', hideDefaultActions: true},
    { label: 'Org Status', fieldName: 'OrgStatus', hideDefaultActions: true},
];


export default class PackagingInfo extends LightningElement {
    @track metadataPackageid = '';
    @track packageVersions;
    @track packageSubscribers;

    data = [];
    columns = COLS;
    vColumns = VCOLS;
    sColumns = SCOLS;

    /*
    connectedCallback() {
        const data = getPackageInfo;
        this.data = data;
    }

    @wire(getPackageVersions)
    packageVersions;

    @wire(getPackageSubscribers)
    packageSubscribers;
    */

    @wire(getPackageInfo)
    packages;

    handleRowAction(event) {
        const action = event.detail.action;
        const row = event.detail.row;
        switch (action.name) {
            case 'show_versions':
                alert('Showing versions: ' + JSON.stringify(row));
                break;
            case 'show_subscribers':
                /*
                const rows = this.data;
                const rowIndex = rows.indexOf(row);
                rows.splice(rowIndex, 1);
                this.data = rows;*/

                alert('Showing subscribers: ' + JSON.stringify(row));
                break;
        }
    }

    onRowSelection( event ) {
        this.metadataPackageid = '033Hn0000007JkrIAE';
        const selectedRows = event.detail.selectedRows;
        console.log(
            'selectedRows are ',
            JSON.stringify( selectedRows )
        );

    }

    @wire(getPackageVersions,{metadataPackageid: '$metadataPackageid'})
    wiredPackageVersions({data, error}){
        if(data){
            this.packageVersions = data;
        }
        else if(error){
            this.packageVersions = undefined;
        }
    }

    @wire(getPackageSubscribers,{metadataPackageid: '$metadataPackageid'})
    wiredPackageSubscribers({data, error}){
        if(data){
            this.packageSubscribers = data;
        }
        else if(error){
            this.packageSubscribers = undefined;
        }
    }
}