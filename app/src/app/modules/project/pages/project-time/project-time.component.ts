import { Component, OnInit } from '@angular/core';
import { Time } from './../../../../app.model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

//Services
import { ProjectService } from './../../../../services/project.service';
import { ReportService } from './../../../../services/report.service';

@Component({
  selector: 'app-project-time',
  templateUrl: './project-time.component.html',
  styleUrls: ['./project-time.component.scss']
})
export class ProjectTimeComponent implements OnInit {
  public sortTimeForm: FormGroup;
  public timeLogs: Array<Object> = [];
  public time;
  public projectId: string;
  public users = [];
  public projectUsers: Array<any> = [];
  public nonBillabletime;
  constructor(
    private projectService: ProjectService,
    private reportService: ReportService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.sortTimeForm = this.fb.group({
      billableOrNot: ['both'],
      startDate: [null],
      endDate: [null]
    });
    this.route.parent.params.subscribe(params => {
      this.projectId = params.projectId;
      this.getTime();
      this.getProjectUsers();
    });
  }

  public createPDF() {
    this.reportService.generatePDF(this.timeLogs, this.projectId, this.sortTimeForm.value);
  }

  public getTime() {
    this.projectService
      .filterTimeLogs(this.sortTimeForm.value, this.projectId)
      .subscribe(logs => {
        console.log('test', this.users);
        if (this.users.length > 0) {
          logs = logs.filter(log => this.users.includes(log.userId));
        }
        this.timeLogs = logs;
        this.time = this.projectService.calculateTimelogs(this.timeLogs);
      });
  }

  public clearForm(form) {
    this.users = [];
    form.reset();
    this.sortTimeForm.controls['billableOrNot'].setValue('both');
    this.getTime();
  }

  public getProjectUsers() {
    this.projectService.getPeople(this.projectId).subscribe(people => {
      this.projectUsers = people;
    });
  }
}
