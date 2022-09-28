import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionspageComponent } from './questionspage/questionspage.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';

const routes: Routes = [
  {path:'',redirectTo:'welcome',pathMatch:"full"},
  {path:"welcome",component:WelcomepageComponent},
  {path:"question",component:QuestionspageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
