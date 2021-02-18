"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminService = void 0;
var core_1 = require("@angular/core");
var AdminService = /** @class */ (function () {
    function AdminService(http) {
        this.http = http;
        this.docUrl = 'http://localhost:8084/api/v1/doctors';
        this.patUrl = 'http://localhost:8084/api/v1/patients';
    }
    AdminService.prototype.addDoctor = function (doctor) {
        return this.http.post("" + this.docUrl, doctor);
    };
    AdminService.prototype.addPatient = function (patient) {
        return this.http.post("" + this.patUrl, patient);
    };
    AdminService.prototype.getDoctorList = function () {
        return this.http.get("" + this.docUrl);
    };
    AdminService.prototype.getPatientList = function () {
        return this.http.get("" + this.patUrl);
    };
    AdminService.prototype.getDoctor = function (id) {
        return this.http.get(this.docUrl + "/" + id);
    };
    AdminService.prototype.updateDoctor = function (id, value) {
        return this.http.put(this.docUrl + "/" + id, value);
    };
    AdminService.prototype.updatePatient = function (id, value) {
        return this.http.put(this.patUrl + "/" + id, value);
    };
    AdminService.prototype.deleteDoctor = function (id) {
        return this.http["delete"](this.docUrl + "/" + id);
    };
    AdminService.prototype.deletePatient = function (id) {
        return this.http["delete"](this.patUrl + "/" + id);
    };
    AdminService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AdminService);
    return AdminService;
}());
exports.AdminService = AdminService;
