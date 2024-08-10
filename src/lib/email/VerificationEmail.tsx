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


interface VerficationEmailProps {
    username?: string;
    validationCode: string;
    baseUrl: string;
}

export const VerficationEmail = ({
    username,
    validationCode,
    baseUrl,
}: VerficationEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Email de Verificacion</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={logo}>
                        <Img  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwrRQrpJFFpPyZ9kIOqOsDP-YwoC5XvoAlnA&s`}
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
                            Recientemente te haz registrado en SIGDOTEC
                            {" "}
                        </Text>
                        <Text style={paragraph}>
                            Si no fuiste tu, por favor, ignora este correo,{" "}
                            si realmente fuiste tu, por favor{" "}
                            <Link href={`${baseUrl}auth/email-verification/${validationCode}`} style={link}>
                                Confirma tu cuenta
                            </Link>.
                        </Text>
                        <Text style={paragraph}>
                            Este enlace expirará en 4 horas.
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

VerficationEmail.PreviewProps = {
    username: "alanturing",
} as VerficationEmailProps;

export default VerficationEmail;

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