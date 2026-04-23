import {Resend} from'resend';
import 'dotenv/config';

export const Resendclient = new Resend(process.env.RESEND_API_KEY);

export const sender={
    email:process.env.EMAIL_FROM,
    email:process.env.EMAIL_FROM_NAME,
};
