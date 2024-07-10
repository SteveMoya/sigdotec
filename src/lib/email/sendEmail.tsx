import { BASE_URL, RESEND_API_KEY, isDev } from '@/utils';
import { Resend } from 'resend';
import { VerifyIdentityEmail } from './VerificationEmail';
import ResetPasswordEmail from './ResetPasswordEmail';
import { render } from '@react-email/components';

const resend = new Resend(RESEND_API_KEY);

if (!resend) {
    throw new Error('RESEND_API_KEY es requerido')
}

function getHTML(react:any) {
    return render(react, {
        pretty: true
    });
}
function getTEXT(react:any) {
    return render(react, {
        plainText: true
    })
}

export const sendEmailVerificationEmail = async (email:string, token:string) => {
    if (isDev) {
         await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: ['stevemc201666@gmail.com'],
            subject: 'Email de Verificacion',
            html: getHTML(<VerifyIdentityEmail validationCode={token} />),
             tags: [
                 {
                     name: 'category',
                     value: 'confirm_email',
                 },
             ],        
        });
    }
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: [email],
        subject: 'Email de Verificacion',
        html: getHTML(<VerifyIdentityEmail validationCode={token} />),
        tags: [
            {
                name: 'category',
                value: 'confirm_email',
            },
        ],
    }); 
    return
}

export const sendResetPasswordEmail = async (username: string, token: string, email:string) => {
    if (isDev) {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: ['stevemc201666@gmail.com'],
            subject: 'Reset Password',
            html: getHTML(<ResetPasswordEmail username={username} updatedDate={
                new Date()} validationCode={token} />),
            tags: [
                {
                    name: 'category',
                    value: 'reset_password',
                },
            ],
        });
    }
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: [email],
        subject: 'Reset Password',
        html: getHTML(<ResetPasswordEmail username={username} updatedDate={
            new Date()} validationCode={token} />),
        tags: [
            {
                name: 'category',
                value: 'reset_password',
            },
        ],
    });
    return
}