import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProspectdetailsService } from '../../details-service/prospectdetails.service';
import { MatDialog } from '@angular/material/dialog';
import { ProspectDialogComponent } from '../../dialog/prospect-dialog/prospect-dialog.component';
import { WordServiceService } from '../../Docserv/word-service.service';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import { FileuploadService } from '../../Docserv/fileupload.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from '../../Auth/auth-service.service';

@Component({
  selector: 'app-prospect-dtls',
  templateUrl: './prospect-dtls.component.html',
  styleUrl: './prospect-dtls.component.scss',
})
export class ProspectDtlsComponent {
  prospect: any;
  selectedFile: File | null = null;
  constructor(
    private route: ActivatedRoute,
    private prs: ProspectdetailsService,
    private wordService: WordServiceService,
    public dialog: MatDialog,
    private fileserv: FileuploadService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  callback: any;
  ngOnInit() {
    const ProsIdparam = this.route.snapshot.paramMap.get('id');
    if (ProsIdparam === null || ProsIdparam === undefined) {
      return console.log('error');
    }
    const prospectId = +ProsIdparam;

    this.prs.getProspectdetails(prospectId).subscribe((data) => {
      if (data) {
        this.prospect = data;
      } else {
        console.error('Prospect data is undefined');
      }
    });
  }

  @Input() value: any;

  updateData(updatedData: any): void {
    // Update the parent component's data
    this.prospect = updatedData;
  }

  OpenEditDialog(): void {
    const dialogRef = this.dialog.open(ProspectDialogComponent, {
      width: '900px',
      data: { parent: this, prospect: this.prospect },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Update the value after dialog is closed
        this.prospect = result;
      }
    });
  }

  generate(): void {
    const templatePath = 'assets/nom.docx';
    fetch(templatePath)
      .then((response) => response.arrayBuffer())

      .then((templateBuffer) => {
        const zip = new PizZip(templateBuffer);

        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,

          linebreaks: true,
        });

        doc.render({
          nom: this.prospect.nom,
          activite: this.prospect.secteuractivite,
          formation: this.prospect.formation,
          exppro: this.prospect.experienceprofessionnelle,
          competencetech: this.prospect.competencetechnique,
          langue: this.prospect.langue,
          competencemet: this.prospect.competencemetier,
        });
        const blob = doc.getZip().generate({
          type: 'blob',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          compression: 'DEFLATE',
        });
        saveAs(blob, this.prospect.nom + '.docx');
        if (this.callback) {
          this.callback();
        }
      })
      .catch((error) => {
        console.error('Error loading template:', error);
      });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.fileserv
        .uploadFile(this.selectedFile, this.prospect.idtiers)
        .subscribe((response) => {
          // Handle the response as needed
          console.log('File uploaded successfully', response);
        });
      this.snackBar.open('Cv telecharger ' + this.prospect.nom, 'fermer', {
        duration: 3000,
      });
    } else {
      console.warn('No file selected for upload');
    }
  }

  goBack(): void {
    this.router.navigate(['/pros']);
  }

  getStatusClass(): string {
    if (this.prospect) {
      if (this.prospect.status === 'prospect') {
        return 'prospect';
      } else if (this.prospect.status === 'consultant') {
        return 'consultant';
      }
    }
    return ''; // Retourne une chaîne vide par défaut
  }
}
