"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ModalDoctor = exports.DoctorListComponent = void 0;
var core_1 = require("@angular/core");
var doctor_1 = require("../../../models/doctor");
var collections_1 = require("@angular/cdk/collections");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var DoctorListComponent = /** @class */ (function () {
    function DoctorListComponent(adminService, modal, router, route, modalService, fb) {
        this.adminService = adminService;
        this.modal = modal;
        this.router = router;
        this.route = route;
        this.modalService = modalService;
        this.fb = fb;
        this.displayedColumns = ['select', 'doctor_id', 'first_name', 'last_name', 'passport_number', 'profession', 'address', 'actions'];
        this.dataSource = new table_1.MatTableDataSource();
        this.selection = new collections_1.SelectionModel(true, []);
    }
    DoctorListComponent.prototype.ngOnInit = function () {
        this.getDoctors();
        this.editProfileForm = this.fb.group({
            doctor_id: [''],
            first_name: [''],
            last_name: [''],
            passport_number: [''],
            profession: [''],
            address: ['']
        });
    };
    DoctorListComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    };
    DoctorListComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    DoctorListComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    DoctorListComponent.prototype.checkboxLabel = function (row) {
        if (!row) {
            return (this.isAllSelected() ? 'select' : 'deselect') + " all";
        }
        return (this.selection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.doctor_id + 1);
    };
    DoctorListComponent.prototype.doFilter = function (value) {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    };
    DoctorListComponent.prototype.openDialog = function () {
        var _this = this;
        var modal = this.modal.open(ModalDoctor, {
            width: '640px'
        });
        modal.afterClosed().subscribe(function (result) {
            _this.getDoctors();
        });
    };
    DoctorListComponent.prototype.openModal = function (targetModal, doctor) {
        this.modalService.open(targetModal, {
            centered: true,
            backdrop: 'static'
        });
        this.editProfileForm.patchValue({
            doctor_id: doctor.doctor_id,
            first_name: doctor.first_name,
            last_name: doctor.last_name,
            passport_number: doctor.passport_number,
            profession: doctor.profession,
            address: doctor.address
        });
    };
    DoctorListComponent.prototype.updateDoctor = function () {
        this.adminService.updateDoctor(this.editProfileForm.getRawValue().doctor_id, this.editProfileForm.getRawValue()).subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); });
        this.doctor = new doctor_1.Doctor();
        this.modalService.dismissAll();
        this.getDoctors();
    };
    DoctorListComponent.prototype.getDoctors = function () {
        var _this = this;
        this.adminService.getDoctorList().subscribe(function (data) {
            _this.dataSource.data = data;
        });
    };
    DoctorListComponent.prototype.getDoctor = function (id) {
        this.adminService.getDoctor(id).subscribe(function (data) {
            console.log(data);
        });
    };
    DoctorListComponent.prototype.deleteDoctor = function (id) {
        var _this = this;
        if (confirm('Are you sure to delete?')) {
            this.adminService.deleteDoctor(id).subscribe(function (data) {
                _this.getDoctors();
            });
        }
    };
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], DoctorListComponent.prototype, "sort");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], DoctorListComponent.prototype, "paginator");
    DoctorListComponent = __decorate([
        core_1.Component({
            selector: 'app-doctor-list',
            templateUrl: './doctor-list.component.html',
            styleUrls: ['./doctor-list.component.css']
        })
    ], DoctorListComponent);
    return DoctorListComponent;
}());
exports.DoctorListComponent = DoctorListComponent;
var ModalDoctor = /** @class */ (function () {
    function ModalDoctor(adminService, modal) {
        this.adminService = adminService;
        this.modal = modal;
        this.doctors = new doctor_1.Doctor();
        this.submitted = false;
    }
    ModalDoctor.prototype.create = function (value) {
        this.submitted = true;
        this.adminService.addDoctor(this.doctors)
            .subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); });
        this.doctors = new doctor_1.Doctor();
    };
    ModalDoctor.prototype.close = function () {
        this.modal.close();
    };
    ModalDoctor = __decorate([
        core_1.Component({
            selector: 'app-modal-add-doctor',
            templateUrl: 'modal-add-doctor.html',
            styleUrls: ['./doctor-list.component.css']
        })
    ], ModalDoctor);
    return ModalDoctor;
}());
exports.ModalDoctor = ModalDoctor;
