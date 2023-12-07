import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AuthFormModule } from "./auth-form/auth-form.module";

import { AppComponent } from "./app.component";
import { TemplateComponent } from "./template.component";

@NgModule({
  declarations: [AppComponent, TemplateComponent],
  imports: [BrowserModule, AuthFormModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
