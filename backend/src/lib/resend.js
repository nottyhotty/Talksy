import {Resend} from "resend";
import { ENV } from "./env.js";

export const resendClient = new Resend(process.env.RESEND_API_KEY);

export const sender={
    email:process.env.EMAIL_FROM,
    email:process.env.EMAIL_FROM_NAME,
};
