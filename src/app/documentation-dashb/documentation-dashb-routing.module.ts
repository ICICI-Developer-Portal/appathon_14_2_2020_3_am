import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentationDashbComponent } from './documentation-dashb.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { ApiDetailsComponent } from './api-details/api-details.component';
import { BuildingBlocksComponent } from './Sidenav-pages/building-blocks/building-blocks.component';
import { CommertialBankComponent } from './Sidenav-pages/commertial-bank/commertial-bank.component';
import { CorporateBankComponent } from './Sidenav-pages/corporate-bank/corporate-bank.component';
import { LoanandCardComponent } from './Sidenav-pages/loanand-card/loanand-card.component';
import { PaymentsComponent } from './Sidenav-pages/payments/payments.component';
import { ViewAllApiComponent } from './Sidenav-pages/view-all-api/view-all-api.component';
import { AccountDepositComponent } from './Sidenav-pages/account-deposit/account-deposit.component';
import { MerchantOnboardingComponent } from './merchant-onboarding/merchant-onboarding.component';
import { OffersComponent } from './Sidenav-pages/Sidenav-Subpages/offers/offers.component';
import { CustomerAuthComponent } from './Sidenav-pages/Sidenav-Subpages/customer-auth/customer-auth.component';
import { CustomerOnboardingComponent } from './Sidenav-pages/Sidenav-Subpages/customer-onboarding/customer-onboarding.component';
import { AutoloanComponent } from './Sidenav-pages/Sidenav-Subpages/autoloan/autoloan.component';
import { PersonalLoanComponent } from './Sidenav-pages/Sidenav-Subpages/personal-loan/personal-loan.component';
import { LoanTopUpComponent } from './Sidenav-pages/Sidenav-Subpages/loan-top-up/loan-top-up.component';
import { LoanmanagementComponent } from './Sidenav-pages/Sidenav-Subpages/loanmanagement/loanmanagement.component';
import { CreditcardsComponent } from './Sidenav-pages/Sidenav-Subpages/creditcards/creditcards.component';
import { PaylaterComponent } from './Sidenav-pages/Sidenav-Subpages/paylater/paylater.component';
import { PaymentUPIComponent } from './Sidenav-pages/Sidenav-Subpages/payment-upi/payment-upi.component';
import { PaymentsUPI2Component } from './Sidenav-pages/Sidenav-Subpages/payments-upi2/payments-upi2.component';
import { UtilityPaymentsComponent } from './Sidenav-pages/Sidenav-Subpages/utility-payments/utility-payments.component';
import { FixeddepositComponent } from './Sidenav-pages/Sidenav-Subpages/fixeddeposit/fixeddeposit.component';
import { SavingaccountComponent } from './Sidenav-pages/Sidenav-Subpages/savingaccount/savingaccount.component';
import { IwishaccountComponent } from './Sidenav-pages/Sidenav-Subpages/iwishaccount/iwishaccount.component';
import { CorporateinternetbankingComponent } from './Sidenav-pages/Sidenav-Subpages/corporateinternetbanking/corporateinternetbanking.component';
import { CashdepositmachineComponent } from './Sidenav-pages/Sidenav-Subpages/cashdepositmachine/cashdepositmachine.component';
import { CmspaymentComponent } from './Sidenav-pages/Sidenav-Subpages/cmspayment/cmspayment.component';
import { CmscollectionComponent } from './Sidenav-pages/Sidenav-Subpages/cmscollection/cmscollection.component';
import { InstaIMPSComponent } from './Sidenav-pages/Sidenav-Subpages/insta-imps/insta-imps.component';
import { AutoLoanComponent } from './Sidenav-pages/Sidenav-Subpages/auto-loan/auto-loan.component';
import { PrepaidcardComponent } from './Sidenav-pages/Sidenav-Subpages/prepaidcard/prepaidcard.component';
import { EazypayComponent } from './Sidenav-pages/Sidenav-Subpages/eazypay/eazypay.component';
import { RecurringdepositComponent } from './Sidenav-pages/Sidenav-Subpages/recurringdeposit/recurringdeposit.component';
import { CurrentaccountComponent } from './Sidenav-pages/Sidenav-Subpages/currentaccount/currentaccount.component';
import { AccountopeningComponent } from './Sidenav-pages/Sidenav-Subpages/accountopening/accountopening.component';
import { EcollectionComponent } from './Sidenav-pages/Sidenav-Subpages/ecollection/ecollection.component';
import { IsurepayComponent } from './Sidenav-pages/Sidenav-Subpages/isurepay/isurepay.component';
import { RemittanceComponent } from './Sidenav-pages/Sidenav-Subpages/remittance/remittance.component';
import { AuthGuard } from '../services/auth.guard';
import { CompositepayComponent } from './Sidenav-pages/Sidenav-Subpages/compositepay/compositepay.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentationDashbComponent,
    children: [
      
      {
        path: '',
        component: DocumentationComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'apidetails/:id',
        component: ApiDetailsComponent,
        canActivate: [AuthGuard],
      },
      // sidenav pages
      {
        path: 'accountdeposit',
        component: AccountDepositComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'buildingblock',
        component: BuildingBlocksComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'commercialbank',
        component: CommertialBankComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'corporatebank',
        component: CorporateBankComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'loanandcard',
        component: LoanandCardComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'payment',
        component: PaymentsComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'viewallapi',
        component: ViewAllApiComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'merchantonboarding',
        component: MerchantOnboardingComponent,
        canActivate: [AuthGuard],
      },

      // subpages pages
      {
        path: 'offers',
        component: OffersComponent,
        //canActivate: [AuthGuard]
      },
      {
        path: 'customerauthentication',
        component: CustomerAuthComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'customeronboarding',
        component: CustomerOnboardingComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'autoloan',
        component: AutoloanComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'personalloan',
        component: PersonalLoanComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'autoloan',
        component: AutoLoanComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'loantopup',
        component: LoanTopUpComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'loanmanagement',
        component: LoanmanagementComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'creditcards',
        component: CreditcardsComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'prepaidcards',
        component: PrepaidcardComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'paylater',
        component: PaylaterComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'PaymentUPI1',
        component: PaymentUPIComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'PaymentUPI2',
        component: PaymentsUPI2Component,
        //canActivate: [AuthGuard],
      },
      {
        path: 'utilitypayments',
        component: UtilityPaymentsComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'fixeddeposit',
        component: FixeddepositComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'savingaccount',
        component: SavingaccountComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'iWishaccount',
        component: IwishaccountComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'corporateinternetbanking',
        component: CorporateinternetbankingComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'cashdepositmachine',
        component: CashdepositmachineComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'cmspayment',
        component: CmspaymentComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'cmscollection',
        component: CmscollectionComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'IMPSapi',
        component: InstaIMPSComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'eazypay',
        component: EazypayComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'recurringdeposit',
        component: RecurringdepositComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'currentaccount',
        component: CurrentaccountComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'accountopening',
        component: AccountopeningComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'ecollection',
        component: EcollectionComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'isurepay',
        component: IsurepayComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'remittance',
        component: RemittanceComponent,
        //canActivate: [AuthGuard],
      },
      {
        path: 'compositepay',
        component: CompositepayComponent,
        //canActivate: [AuthGuard],
      },
      // {
      //   path: 'appathon-dashboard',
      //   component: AppathonDashboardComponent,
      //   //canActivate: [AuthGuard],
      // },
      { path: 'appathon-dashboard', 
      loadChildren: './appathon-dashboard/appathon-dashboard.module#AppathonDashboardModule'}

    ],
  },

  { path: 'appathon-dashboard', 
      loadChildren: './appathon-dashboard/appathon-dashboard.module#AppathonDashboardModule'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentationDashbRoutingModule {}
