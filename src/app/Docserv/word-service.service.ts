import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jspdf from 'jspdf';
 

 

@Injectable({
  providedIn: 'root',
})
export class WordServiceService {
  generatePdf(data: any, fileName: string): void {
    const doc = new jspdf();
    doc.text(JSON.stringify(data), 10, 10);

    // Save the PDF
    doc.save(fileName);
  }
}
