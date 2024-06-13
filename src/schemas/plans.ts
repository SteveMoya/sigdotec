export type PlanBaseSchema = {
    Asignatura: string;
    Grado: string;
    Tema: string;
    Subtema: string[];
    Contenidos_Conceptuales: string[];
    Contenidos_Procedimentales: string[];
    Contenidos_Actitudinales: string[];
    Indicadores_de_logro: string[];
    Preguntas_esenciales: string[];
    Motivacion_inicial: string[];
}
export type PlanClassSchema = {
    Asignatura: string;
    Grado: string;
    Tema: string;
    Subtema: string[];
    Contenidos_Conceptuales: string[];
    Contenidos_Procedimentales: string[];
    Contenidos_Actitudinales: string[];
    Indicadores_de_logro: string[];
    Competencias_especificas: string[];
    Secuencia_didactica: string[];
}
