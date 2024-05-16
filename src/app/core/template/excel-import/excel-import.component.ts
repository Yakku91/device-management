import { Component } from '@angular/core';
import { ExcelparserService } from 'src/app/services/excelparser.service';

@Component({
  selector: 'app-excel-import',
  templateUrl: './excel-import.component.html',
  styleUrls: ['./excel-import.component.scss']
})
export class ExcelImportComponent {
  constructor(
    private excelparser: ExcelparserService,
  ){}

  uploadExcelFile(event: Event) {
    this.excelparser.createItems(event)
  }
}
