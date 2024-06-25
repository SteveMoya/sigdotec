import { BASE_URL, RESEND_API_KEY } from '@/utils';
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
    const send = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: ['stevemc201666@gmail.com'],
        subject: 'Email de Verificacion',
        html: getHTML(<VerifyIdentityEmail validationCode={token} />),
        
    });
    return
}

// export const sendResetPasswordEmail = async (email:string, token: string) => {
//     const { data, error } = await resend.emails.send({
//         from: 'onboarding@resend.dev',
//         to: [email || 'stevemc201666@gmail.com'],
//         subject: 'Email de Verificacion',
//         react: ResetPasswordEmail({ url: `${BASE_URL}/auth/password-reset?email=${email}`, token })
//     })
//     if (data) {
//         return true
//     }
//     if (error) {
//         return false
//     }
// }