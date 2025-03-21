export interface IVerificationMail {
  to: string;
  subject: string;
  code: number;
  [key: string]: any;
}

export interface ITicketCodeMail {
  to: string;
  subject: string;
  code: string;
  [key: string]: any;
}
