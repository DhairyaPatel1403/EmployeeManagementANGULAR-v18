import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddEmpComponent } from './components/add-emp/add-emp.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ShowEmpComponent } from './components/show-emp/show-emp.component';
import { EditEmpComponent } from './components/edit-emp/edit-emp.component';

export const routes: Routes = [
    {path:'add-employee', component:AddEmpComponent},
    {path:'show-employees', component:ShowEmpComponent},
    {path:'edit-employees', component:EditEmpComponent},
];
