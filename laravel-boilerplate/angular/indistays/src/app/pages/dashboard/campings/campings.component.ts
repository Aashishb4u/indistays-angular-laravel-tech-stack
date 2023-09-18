import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {SharedService} from "../../../services/shared.service";
import {Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {StorageService} from "../../../services/storage.service";
import {HttpParams} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-campings',
  templateUrl: './campings.component.html',
  styleUrls: ['./campings.component.scss']
})
export class CampingsComponent {
  searchForm: FormGroup;
  pageSize = 20;
  totalLength = 0;
  currentPage = 1;
  users: [];
  dataSource: any = [];
  mapSrc: any = '';
  displayedColumns: string[] = ['name', 'destinationName', 'mapLink', 'address', 'gallery', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private sanitizer: DomSanitizer,
    public fb: FormBuilder, public sharedService: SharedService, public router: Router, public apiService: ApiService, public storageService: StorageService) {

  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ['', Validators.required]
    });
    this.getCampings();
    this.dataSource.paginator = this.paginator;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getCampings();
  }

  onSearch() {
    console.log(this.searchForm.value);
  }

  onAddCamping() {
    this.router.navigate(['/dashboard/add-camping']);
  }

  getCampings(nameFilter = '') {
    let params = new HttpParams()
      .set('currentPage', this.currentPage.toString())
      .set('pageSize', this.pageSize.toString());
    if(nameFilter) {
      params = params.set('name', nameFilter);
    }
    this.apiService.getCampings(params).subscribe(
      res => this.getCampingsSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  getCampingsSuccess(res) {
    const total = res.data.total;
    this.dataSource = res && res.data && res.data.data && res.data.data.length > 0 ?
      res.data.data.map((val) => {
        val.destinationName = val.destination.name;
        val.mapLink = this.sanitizer.bypassSecurityTrustHtml(val.location_map_link);
        val.profile_image_url = this.sharedService.generateImageUrl(val.profile_image_url);
        val.images = val.images.map((img) => {
          img.url = this.sharedService.generateImageUrl(img.url);
          return img;
        });
        return val;
      }) : [];
    this.totalLength = total;
  }

  onEditUser(id) {
    this.router.navigate([`/dashboard/edit-camping/${id}`])
  }

  onDeleteUser(id) {
    const data = {
      title: 'Delete Camping',
      confirmLabel: 'Ok',
      message: 'Are you sure you want to delete Camping',

    }
    this.sharedService.openDialogPrompt(
      data.title,
      data.confirmLabel,
      data.message,
      this.onDeleteUserConfirmation.bind(this),
      id)
  }

  onDeleteUserConfirmation(data) {
    this.deleteCampingById(data.entityId);
  }

  deleteCampingById(id) {
    this.apiService.deleteCamping(id).subscribe(
      res => this.deleteCampingByIdSuccess(res),
      error => {
        this.apiService.commonError(error);
      }
    );
  }

  deleteCampingByIdSuccess(res) {
    this.getCampings();
  }

  handleDebouncedKeyUp(event) {
    this.getCampings(event.target.value);
  }
}
