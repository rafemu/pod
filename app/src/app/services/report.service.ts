import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { logoData } from './../app.model';
import { ProjectService } from './../services/project.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private projectService: ProjectService) {}

  public async generatePDF(data, projectId, filterOptions = null) {
    const project = await this.projectService
      .get(projectId)
      .pipe(take(1))
      .toPromise();
    const time = this.projectService.calculateTimelogs(data);
    const doc = new Report(data, time, project, filterOptions);
    doc.save(`${project.title}-time-report.pdf`);
  }
}

/**
 * @author Sharan (Zweck)
 * @description Create a report using jsPdf
 */
class Report {
  private report;
  private page = 1;
  private rowPosition = 65;
  private isFirstPage: Boolean = true;
  private calculatedTime;
  private filterOptions;
  private project;
  constructor(data, calculatedTime, project, filterOptions) {
    this.report = new jsPDF();
    this.calculatedTime = calculatedTime;
    this.filterOptions = filterOptions;
    this.project = project;
    this.generate(data);
  }

  /**
   * Save the Report using the filename provided
   * @param filename string
   */
  public save(filename) {
    return this.report.save(filename);
  }

  /**
   * Generate the data
   * @param data Array of Time
   */
  private generate(data) {
    this.drawTable();

    data.forEach(log => {
      if (this.rowPosition >= 285) {
        this.addPage();
      }

      this.report.setFontType('thin');
      this.rowPosition += 5;
      const description = log.description
        ? log.description.replace(/[^a-zA-Z ]/g, '')
        : 'N/A';

      this.report.text(
        10,
        this.rowPosition,
        log.date ? moment.unix(log.date.seconds).format('ll') : 'N/A'
      );

      this.report.text(158, this.rowPosition, log.isBillable ? 'Yes' : 'No');
      this.report.text(
        180,
        this.rowPosition,
        log.time ? log.time.toFixed(2) + ' Hours' : 'N/A'
      );

      this.splitDescription(description, 80).forEach(string => {
        this.report.text(40, this.rowPosition, string);
        this.rowPosition += 3;
      });
    });
  }

  /**
   * @author Sharan (Zweck)
   * @description Generates the table Border.
   * Checks if the page is cover / not
   */
  private drawTable() {
    let textPosition = 19;
    let topLinePosition = 15;

    this.report.line(5, 290, 205, 290);
    this.report.line(5, 290, 205, 290);
    if (this.isFirstPage == true) {
      topLinePosition += 40;
      textPosition += 40;
      this.report.text(15, 25, `Timesheet - ${this.project.title}`);

      if (this.filterOptions) {
        this.report.setFontSize(9);
        this.report.text(
          15,
          33,
          `Start Date : ${
            this.filterOptions.startDate
              ? moment(this.filterOptions.startDate).format('ll')
              : '-'
          }`
        );

        this.report.text(
          15,
          38,
          `End Date : ${
            this.filterOptions.endDate
              ? moment(this.filterOptions.endDate).format('ll')
              : '-'
          }`
        );
      }
      this.report.addImage(logoData, 'PNG', 155, 22, 38, 20);
      // doc.addImage("https://promo.bradbrownmagic.com/pdf-flyer/flyers/poster-dark-cmyk.jpg","JPEG",0,0);

      this.report.setFontSize(9);
      this.report.setFontType('bold');
      this.report.text(
        140,
        50,
        `Billable : ${this.calculatedTime.billableTime} Hrs | Non Billable : ${
          this.calculatedTime.nonBillabletime
        } Hrs`
      );

      this.report.setFontType('thin');
      this.addFooter();
    }
    this.report.line(5, topLinePosition, 205, topLinePosition);
    this.report.line(5, topLinePosition + 7, 205, topLinePosition + 7);

    // Vertical lines
    this.report.line(35, topLinePosition, 35, 290);
    this.report.line(150, topLinePosition, 150, 290);
    this.report.line(172, topLinePosition, 172, 290);
    this.report.line(5, topLinePosition, 5, 290);
    this.report.line(205, topLinePosition, 205, 290);

    this.report.setFontType('bold');
    this.report.setFontSize(9);
    this.report.text(15, textPosition, 'DATE');
    this.report.text(85, textPosition, 'DESCRIPTION');
    this.report.text(153, textPosition, 'BILLABLE');
    this.report.text(183, textPosition, 'TIME');
  }

  /**
   * Add a new page
   */
  private addPage() {
    this.page++;
    this.isFirstPage = false;
    this.report.addPage();
    this.drawTable();
    this.rowPosition = 24;
    this.addFooter();
  }

  /**
   * Add the page footer
   */
  private addFooter() {
    this.report.setFontType('thin');
    this.report.text(195, 10, `Page ${this.page}`);
    this.report.text(
      140,
      294,
      `Powered by POD | http://zweck.io/downloads/pod/`
    );
    this.report.text(7, 294, `Project : ${this.project.title}`);
  }

  /**
   * Split the description into an array
   * of string based on string length
   * @author Sharan Mohandas
   * @param description string
   */
  private splitDescription(description, length) {
    const strings = [];
    if (!description) {
      return strings;
    }
    let l = length;
    while (description.length > l) {
      let pos = description.substring(0, l).lastIndexOf(' ');
      pos = pos <= 0 ? l : pos;
      strings.push(description.substring(0, pos));
      let i = description.indexOf(' ', pos) + 1;
      if (i < pos || i > pos + l) {
        i = pos;
      }
      description = description.substring(i);
      l = length;
    }
    strings.push(description);
    return strings;
  }
}
