import {
    Body,
    Container,
    Column,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components";


interface ResetPasswordEmailProps {
    username?: string;
    updatedDate?: Date;
    validationCode: string;
    baseUrl: string;
}


export const ResetPasswordEmail = ({
    username,
    updatedDate,
    validationCode,
    baseUrl
}: ResetPasswordEmailProps) => {
    const formattedDate = new Intl.DateTimeFormat("es-ES", {
        dateStyle: "long",
        timeStyle: "medium",
    }).format(updatedDate);

    return (
        <Html>
            <Head />
            <Preview>Haz perdido la contraseña</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={logo}>
                        <Img src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwrRQrpJFFpPyZ9kIOqOsDP-YwoC5XvoAlnA&s`}
                            height="88"
                            alt="SIGDOTEC-logo"
                            style={logo} />
                    </Section>
                    <Section style={sectionsBorders}>
                        <Row>
                            <Column style={sectionBorder} />
                            <Column style={sectionCenter} />
                            <Column style={sectionBorder} />
                        </Row>
                    </Section>
                    <Section style={content}>
                        <Text style={paragraph}>Hola {username},</Text>
                        <Text style={paragraph}>
                            Recientemente haz perdido tu contraseña
                            {" "}
                            el
                            {formattedDate}. 

                        </Text>
                        <Text style={paragraph}>
                            Si no solicitaste este cambio, por favor, ignora este mensaje,{" "} 
                            si solicitaste este cambio, por favor{" "}
                            <Link href={`${baseUrl}auth/password-reset/${validationCode}`} style={link}>
                            Recuperar contraseña
                            </Link>. Este enlace expirará en 1 hora.
                        </Text>
                        <Text style={paragraph}>
                            Recuerda usar una contraseña que sea fuerte, única y facil de recordar para tu
                            cuenta de SIGDOTEC.
                        </Text>
                        <Text style={paragraph}>
                            ¿Tienes alguna pregunta? Por favor contacta{" "}
                            <Link href="mailto:soporte@sigdotec.com" style={link}>
                                Soporte SIGDOTEC 
                            </Link>.
                        </Text>
                        <Text style={paragraph}>
                            Gracias,
                            <br />
                            Equipo de Soporte de SIGDOTEC
                        </Text>
                    </Section>
                </Container>

                <Section style={footer}>
                    <Row>
                        <Column align="center" style={{ paddingRight: "8px", }}>
                            <Img width="100px" src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwrRQrpJFFpPyZ9kIOqOsDP-YwoC5XvoAlnA&s`} />
                        </Column>
                    </Row>
                    <Row>
                        <Text style={{ textAlign: "center", color: "#706a7b" }}>
                            © {new Date().getFullYear()} SIIGDOTEC, Todos Los Derechos Reservados <br />
                            Santo Domingo, Distrito Nacional, Republica Dominicana
                        </Text>
                    </Row>
                </Section>
            </Body>
        </Html>
    );
};

ResetPasswordEmail.PreviewProps = {
    username: "alanturing",
    updatedDate: new Date("June 23, 2022 4:06:00 pm UTC"),
} as ResetPasswordEmailProps;

export default ResetPasswordEmail;

const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif";

const main = {
    backgroundColor: "#efeef1",
    fontFamily,
    border: "1px solid #d8d8d8",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
};

const paragraph = {
    lineHeight: 1.5,
    fontSize: 14,
};

const container = {
    maxWidth: "580px",
    margin: "30px auto",
    backgroundColor: "#ffffff",
};

const footer = {
    maxWidth: "580px",
    margin: "0 auto",
};

const content = {
    padding: "5px 20px 10px 20px",
};

const logo = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid rgb(238,238,238)",
};


const sectionsBorders = {
    width: "100%",
    display: "flex",
};

const sectionBorder = {
    borderBottom: "1px solid rgb(238,238,238)",
    width: "249px",
};

const sectionCenter = {
    borderBottom: "1px solid #0861c5",
    width: "102px",
};

const link = {
    textDecoration: "underline",
};