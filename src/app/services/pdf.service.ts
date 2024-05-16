import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import { TDocumentDefinitions } from 'pdfmake/interfaces'

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs

@Injectable({
  providedIn: 'root'
})
export class PDFService {

  public generatePdf(objectId: string, type: 'D' | 'P'): void {
    const qrLabel: TDocumentDefinitions = this.createQrLabel(objectId + type)
    pdfMake.createPdf(qrLabel).open()
  }

    private createQrLabel(objectId: string): TDocumentDefinitions {
      const mm: number = 28
      const mmPerPoint: number = 0.352777778
      const length: number = mm / mmPerPoint
      return {
        pageSize: {width: length, height: length},
        pageMargins: 7,
        pageOrientation: 'landscape',
        defaultStyle: {
          fontSize: 5,
        },
        content: [{qr: objectId, fit: 70, eccLevel: 'Q'}],
      }
    }
}
