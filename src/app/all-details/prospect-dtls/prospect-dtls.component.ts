import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
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
import { DocumentPreviewModalComponent } from '../document-preview-modal/document-preview-modal.component';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-prospect-dtls',
  templateUrl: './prospect-dtls.component.html',
  styleUrl: './prospect-dtls.component.scss',
})
export class ProspectDtlsComponent {
  @ViewChild('previewFrame') previewFrame!: ElementRef;
  blobUrl!: string;
  prospect: any;
  selectedFile: File | null = null;

  selectedTemplate: string | null = null;

  showTemplateSelector: boolean = false;
  documentBlobUrl: string='';


  
  constructor(
    private route: ActivatedRoute,
    private prs: ProspectdetailsService,
    private wordService: WordServiceService,
    public dialog: MatDialog,
    private fileserv: FileuploadService,
    private snackBar: MatSnackBar,
    private router: Router,
    private sanitizer : DomSanitizer,
    private cdRef : ChangeDetectorRef
  ) {
    // this.previewFrame = new ElementRef(null);
   }
  //  urlSafe: SafeResourceUrl | null = null;

   urlSafe: SafeResourceUrl | undefined;
  //  urlSafeString: string | null = null;
  // urlSafe : any ;
  callback: any;
  ngOnInit() {
    // console.log('URL Safe Value:', this.urlSafe);

    const ProsIdparam = this.route.snapshot.paramMap.get('id');
    if (ProsIdparam === null || ProsIdparam === undefined) {
      return console.log('error');
    }
    const prospectId = +ProsIdparam;

    this.prs.getProspectdetails(prospectId).subscribe((data) => {
      if (data) {
        this.prospect = data;
        this.formatExperienceText(data.experienceprofessionnelle);
      } else {
        console.error('Prospect data is undefined');
      }
    });
  }

  // ngAfterViewInit(){this.generate();}
  @Input() value: any;

  updateData(updatedData: any): void {
    // Update the parent component's data
    this.prospect = updatedData;
    this.formatExperienceText(updatedData.experienceprofessionnelle);
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
        this.formatExperienceText(result.experienceprofessionnelle);
        this.cdRef.detectChanges();
      }
    });
  }

  formattedExperience: SafeHtml = 'Non renseigné';

  
  private formatExperienceText(experience: string) {
    if (!experience) {
      this.formattedExperience = 'Non renseigné';
    } else {
      const formatted = experience.replace(/\n/g, '<br/>');
      this.formattedExperience = this.sanitizer.bypassSecurityTrustHtml(formatted);
    }
    this.cdRef.detectChanges();
  }

  toggleTemplateSelector(): void {
    this.showTemplateSelector = !this.showTemplateSelector;
  }

  selectTemplate(template: string): void {
    this.selectedTemplate = template;
    // this.generateAndPreview();
    this.generate();
  }

  generate(): void {


    if (!this.selectedTemplate) {
      console.error('Aucun modèle sélectionné.');
      return;
    }

    // const templatePath = 'assets/nom.docx';
    const templatePath = 'assets/' + this.selectedTemplate;
    // const templatePath = 'assets/nom.docx';
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
          anneeexperience: this.prospect.anneeexperience,
          exppro: this.prospect.experienceprofessionnelle,
          competencetech: this.prospect.competencetechnique,
          langue: this.prospect.langue,
          competencemet: this.prospect.competencemetier,
          disponibilite : this.prospect.disponibilite
        });
        const blob = doc.getZip().generate({
          type: 'blob',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          compression: 'DEFLATE',
        });

        // const blobUrl = URL.createObjectURL(blob);
        // this.openPreviewModal(blobUrl);


        

        saveAs(blob, this.prospect.nom + '.docx');

        if (this.callback) {
          this.callback();
        }
        // this.blobUrl = 'C:\Users\DELL\OneDrive\Bureau\RHAPP\Angular_rh-main\src\assets\nom.docx'
        this.blobUrl = URL.createObjectURL(blob);
        //console.log('Blob URL:', this.blobUrl);
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.blobUrl);
        //console.log('Safe URL:', this.urlSafe);

        // this.urlSafeString = this.urlSafe ? this.urlSafe.toString() : null;

        // this.previewFrame.nativeElement.src = this.sanitizer.bypassSecurityTrustResourceUrl(this.blobUrl);
        // console.log(this.urlSafe);
      })
      .catch((error) => {
        console.error('Error loading template:', error);
      });
      
  }

  //---------------------------//

  // generate(): void {
  //   if (!this.selectedTemplate) {
  //     console.error('Aucun modèle sélectionné.');
  //     return;
  //   }
  
  //   const templatePath = 'assets/' + this.selectedTemplate;
  
  //   fetch(templatePath)
  //     .then((response) => response.arrayBuffer())
  //     .then((templateBuffer) => {
  //       const zip = new PizZip(templateBuffer);
  
  //       const doc = new Docxtemplater(zip, {
  //         paragraphLoop: true,
  //         linebreaks: true,
  //       });
  
  //       doc.render({
  //         nom: this.prospect.nom,
  //         activite: this.prospect.secteuractivite,
  //         formation: this.prospect.formation,
  //         anneeexperience: this.prospect.anneeexperience,
  //         exppro: this.prospect.experienceprofessionnelle,
  //         competencetech: this.prospect.competencetechnique,
  //         langue: this.prospect.langue,
  //         competencemet: this.prospect.competencemetier,
  //       });
  
  //       const blob = doc.getZip().generate({
  //         type: 'blob',
  //         mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  //         compression: 'DEFLATE',
  //       });
  
  //       saveAs(blob, this.prospect.nom + '.docx');
  
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         const blobUrl = reader.result as string;
  //         console.log('Blob URL:', blobUrl); // Vérifiez cette valeur
  //         this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
  //         console.log('URL SAFE:', this.urlSafe); // Vérifiez cette valeur
  //       };
  //       reader.readAsDataURL(blob);
  //     })
  //     .catch((error) => {
  //       console.error('Error loading template:', error);
  //     });
  // }
  

  getUrlSafe(): string | null {
    return this.urlSafe ? this.urlSafe.toString() : null;
  }

  // generateAndPreview(): void {
  //   if (!this.selectedTemplate) {
  //     console.error('Aucun modèle sélectionné.');
  //     return;
  //   }
  
  //   const templatePath = 'assets/' + this.selectedTemplate;
  //   fetch(templatePath)
  //     .then((response) => response.arrayBuffer())
  //     .then((templateBuffer) => {
  //       const zip = new PizZip(templateBuffer);
  //       const doc = new Docxtemplater(zip, {
  //         paragraphLoop: true,
  //         linebreaks: true,
  //       });
  
  //       // Render the document with data
  //       doc.render({
  //         nom: this.prospect.nom,
  //         activite: this.prospect.secteuractivite,
  //         formation: this.prospect.formation,
  //         anneeexperience: this.prospect.anneeexperience,
  //         exppro: this.prospect.experienceprofessionnelle,
  //         competencetech: this.prospect.competencetechnique,
  //         langue: this.prospect.langue,
  //         competencemet: this.prospect.competencemetier,
  //       });
  
  //       // Generate the document as a blob
  //       const blob = doc.getZip().generate({
  //         type: 'blob',
  //         mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  //         compression: 'DEFLATE',
  //       });
  
  //       this.documentBlobUrl = URL.createObjectURL(blob);

  
  //       // Open a preview modal with the document preview
  //       this.openPreviewModal(this.documentBlobUrl);
  
  //       if (this.callback) {
  //         this.callback();
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error loading template:', error);
  //     });
  // }
  
  
  openPreviewModal(blobUrl: string): void {
     
    const dialogRef = this.dialog.open(DocumentPreviewModalComponent, {
      data: { blobUrl: blobUrl },
      maxWidth:'90%',
      maxHeight: '90%'
    });
  
    // Subscribe to the dialog close event if you need to perform any action after the modal closes
    dialogRef.afterClosed().subscribe(() => {
      // Do something after the modal is closed, if needed
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
          //console.log('File uploaded successfully', response);
        });
      this.snackBar.open('Cv téléchargé ' + this.prospect.nom, 'fermer', {
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
