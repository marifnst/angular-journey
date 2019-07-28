import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbButtonModule, NbProgressBarModule, NbSelectModule, } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { FsIconComponent } from './tree-grid/tree-grid.component';
import { FsIconDynamicComponent } from './tree-grid-dynamic/tree-grid-dynamic.component';
import { DialogFormComponent } from '../modal-overlays/dialog/dialog-form/dialog-form.component';
import { DialogExportComponent } from '../modal-overlays/dialog/dialog-export/dialog-export.component';
import { ModalOverlaysModule } from '../modal-overlays/modal-overlays.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    NbButtonModule,
    NbSelectModule,
    NbProgressBarModule,
    ModalOverlaysModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ...routedComponents,
    FsIconComponent,   
    FsIconDynamicComponent,   
    DialogFormComponent,
    DialogExportComponent    
  ],
  entryComponents:[ 
    DialogFormComponent,
    DialogExportComponent
  ]
})
export class TablesModule { }
