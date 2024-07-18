export type PlanBaseSchema = {
    Asignatura: string;
    Grado: string;
    Tema: string;
    Subtema: string[];
    Contenidos_Conceptuales: string[];
    Contenidos_Procedimentales: string[];
    Contenidos_Actitudinales: string[];
    Indicadores_de_logro: string[];
    Preguntas_esenciales: string;
    Motivacion_inicial: string;
}
export type ErrorSchema = {
    detail: [
        {
            loc: [
                string
            ],
            msg: string,
            type: string
        }
    ]
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
    Recursos: string;
    Estrategias_de_evaluacion: string;
    Competencias_especificas: string;
    Secuencia_didactica: any;
}

import { z } from "astro/zod"

export const UnitPlanFormSchema = z
    .object({
        materia : z.string().nonempty(),
        grado : z.string().nonempty(),
        tema : z.string().nonempty(),
    }   
    )
export const ClassPlanFormSchema = z
    .object({
        materia: z.string().nonempty(),
        grado: z.string().nonempty(),
        tema: z.string().nonempty(),
        subtema: z.array(z.string()).nonempty(),
    })
export const ClassPlanEmbeddingFormSchema = z
    .object({
        materia: z.string().nonempty(),
        grado: z.string().nonempty(),
        texto: z.string().nonempty(),

    })

// tipado de todos los tamas
export interface AlltopicSchema {
    "1": [string, N1]
    "2": [string, N23]
    "3": [string, N36]
    "4": [string, N410]
    "5": [string, N512]
    "6": [string, N614]
    "7": [string, N72]
    "8": [string, N82]
}

export interface N1 {
    "1": [string, N12]
    "2": [string, N22]
    "3": [string, N32]
    "4": [string, N42]
    "5": [string, N52]
    "6": [string, N62]
}

export interface N12 {
    "1": [string, N13]
    "2": [string, N2]
    "3": [string, N3]
    "4": [string, N4]
    "5": [string, N5]
    "6": [string, N6]
    "7": [string, N7]
    "8": [string, N8]
    "9": [string, N9]
    "10": [string, N10]
}

export interface N13 {
    "1": string
    "2": string
    "3": string
    "4": string
    "5": string
    "6": string
}

export interface N2 {
    "7": string
    "8": string
    "9": string
    "10": string
    "11": string
    "12": string
    "13": string
}

export interface N3 {
    "14": string
    "15": string
    "16": string
    "17": string
    "18": string
    "19": string
}

export interface N4 {
    "20": string
    "21": string
    "22": string
    "23": string
    "24": string
    "25": string
}

export interface N5 {
    "26": string
    "27": string
    "28": string
    "29": string
    "30": string
}

export interface N6 {
    "31": string
    "32": string
    "33": string
    "34": string
}

export interface N7 {
    "35": string
    "36": string
    "37": string
    "38": string
    "39": string
}

export interface N8 {
    "40": string
    "41": string
    "42": string
    "43": string
}

export interface N9 {
    "44": string
    "45": string
    "46": string
    "47": string
    "48": string
    "49": string
}

export interface N10 {
    "50": string
    "51": string
    "52": string
    "53": string
    "54": string
    "55": string
}

export interface N22 {
    "13": [string, N132]
    "14": [string, N14]
    "15": [string, N15]
    "16": [string, N16]
    "17": [string, N17]
    "18": [string, N18]
    "19": [string, N19]
    "20": [string, N20]
    "21": [string, N21]
    "22": [string, N222]
}

export interface N132 {
    "56": string
    "57": string
    "58": string
    "59": string
    "60": string
    "61": string
    "62": string
    "63": string
    "64": string
    "65": string
    "66": string
}

export interface N14 {
    "67": string
    "68": string
    "69": string
    "70": string
    "71": string
    "72": string
    "73": string
    "74": string
    "75": string
}

export interface N15 {
    "76": string
    "77": string
    "78": string
    "79": string
}

export interface N16 {
    "80": string
    "81": string
    "82": string
    "83": string
    "84": string
    "85": string
    "86": string
}

export interface N17 {
    "87": string
    "88": string
    "89": string
    "90": string
}

export interface N18 {
    "91": string
    "92": string
    "93": string
    "94": string
}

export interface N19 {
    "95": string
    "96": string
    "97": string
    "98": string
}

export interface N20 {
    "99": string
    "100": string
    "101": string
    "102": string
    "103": string
    "104": string
    "105": string
    "106": string
}

export interface N21 {
    "107": string
    "108": string
    "109": string
}

export interface N222 {
    "110": string
    "111": string
    "112": string
    "113": string
}

export interface N32 {
    "25": [string, N25]
    "26": [string, N26]
    "27": [string, N27]
    "28": [string, N28]
    "29": [string, N29]
    "30": [string, N30]
    "31": [string, N31]
    "32": [string, N322]
    "33": [string, N33]
    "34": [string, N34]
}

export interface N25 {
    "114": string
    "115": string
    "116": string
    "117": string
    "118": string
    "119": string
    "120": string
    "121": string
}

export interface N26 {
    "122": string
    "123": string
    "124": string
    "125": string
    "126": string
    "127": string
    "128": string
}

export interface N27 {
    "129": string
    "130": string
    "131": string
    "132": string
}

export interface N28 {
    "133": string
    "134": string
    "135": string
    "136": string
    "137": string
    "138": string
    "139": string
}

export interface N29 {
    "140": string
    "141": string
    "142": string
    "143": string
}

export interface N30 {
    "144": string
    "145": string
    "146": string
    "147": string
}

export interface N31 {
    "148": string
    "149": string
    "150": string
}

export interface N322 {
    "151": string
    "152": string
    "153": string
    "154": string
}

export interface N33 {
    "155": string
    "156": string
    "157": string
    "158": string
    "159": string
}

export interface N34 {
    "160": string
    "161": string
    "162": string
    "163": string
    "164": string
    "165": string
    "166": string
    "167": string
    "168": string
}

export interface N42 {
    "37": [string, N37]
    "38": [string, N38]
    "39": [string, N39]
    "40": [string, N40]
    "41": [string, N41]
    "42": [string, N422]
    "43": [string, N43]
    "44": [string, N44]
    "45": [string, N45]
    "46": [string, N46]
}

export interface N37 {
    "169": string
    "170": string
    "171": string
    "172": string
    "173": string
    "174": string
}

export interface N38 {
    "175": string
    "176": string
    "177": string
    "178": string
    "179": string
}

export interface N39 {
    "180": string
    "181": string
    "182": string
    "183": string
}

export interface N40 {
    "184": string
    "185": string
    "186": string
    "187": string
    "188": string
    "189": string
    "190": string
}

export interface N41 {
    "191": string
    "192": string
    "193": string
    "194": string
    "195": string
    "196": string
    "197": string
}

export interface N422 {
    "198": string
    "199": string
    "200": string
}

export interface N43 {
    "201": string
    "202": string
    "203": string
    "204": string
    "205": string
    "206": string
    "207": string
    "208": string
}

export interface N44 {
    "209": string
    "210": string
    "211": string
    "212": string
    "213": string
    "214": string
}

export interface N45 {
    "215": string
    "216": string
    "217": string
}

export interface N46 {
    "218": string
    "219": string
    "220": string
    "221": string
    "222": string
    "223": string
}

export interface N52 {
    "49": [string, N49]
    "50": [string, N50]
    "51": [string, N51]
    "52": [string, N522]
    "53": [string, N53]
    "54": [string, N54]
    "55": [string, N55]
    "56": [string, N56]
    "57": [string, N57]
    "58": [string, N58]
}

export interface N49 {
    "224": string
    "225": string
    "226": string
    "227": string
    "228": string
    "229": string
    "230": string
    "231": string
    "232": string
}

export interface N50 {
    "233": string
    "234": string
    "235": string
    "236": string
    "237": string
    "238": string
    "239": string
    "240": string
    "241": string
    "242": string
    "243": string
    "244": string
}

export interface N51 {
    "245": string
    "246": string
    "247": string
    "248": string
    "249": string
    "250": string
}

export interface N522 {
    "251": string
    "252": string
    "253": string
    "254": string
}

export interface N53 {
    "255": string
    "256": string
    "257": string
    "258": string
    "259": string
}

export interface N54 {
    "260": string
    "261": string
    "262": string
    "263": string
}

export interface N55 {
    "264": string
    "265": string
    "266": string
    "267": string
}

export interface N56 {
    "268": string
    "269": string
    "270": string
    "271": string
}

export interface N57 {
    "272": string
    "273": string
    "274": string
    "275": string
    "276": string
    "277": string
}

export interface N58 {
    "278": string
    "279": string
    "280": string
    "281": string
}

export interface N62 {
    "61": [string, N61]
    "62": [string, N622]
    "63": [string, N63]
    "64": [string, N64]
    "65": [string, N65]
    "66": [string, N66]
    "67": [string, N67]
    "68": [string, N68]
    "69": [string, N69]
    "70": [string, N70]
}

export interface N61 {
    "282": string
    "283": string
    "284": string
}

export interface N622 {
    "285": string
    "286": string
    "287": string
    "288": string
}

export interface N63 {
    "289": string
    "290": string
    "291": string
    "292": string
    "293": string
    "294": string
    "295": string
    "296": string
    "297": string
}

export interface N64 {
    "298": string
    "299": string
    "300": string
    "301": string
    "302": string
    "303": string
    "304": string
    "305": string
    "306": string
}

export interface N65 {
    "307": string
    "308": string
    "309": string
    "310": string
    "311": string
    "312": string
    "313": string
    "314": string
}

export interface N66 {
    "315": string
    "316": string
    "317": string
    "318": string
}

export interface N67 {
    "319": string
    "320": string
    "321": string
    "322": string
    "323": string
}

export interface N68 {
    "324": string
    "325": string
    "326": string
}

export interface N69 {
    "327": string
    "328": string
    "329": string
    "330": string
    "331": string
    "332": string
    "333": string
    "334": string
    "335": string
    "336": string
    "337": string
    "338": string
    "339": string
}

export interface N70 {
    "340": string
    "341": string
    "342": string
    "343": string
}

export interface N23 {
    "1": [string, N110]
    "2": [string, N24]
    "3": [string, N35]
    "4": [string, N47]
    "5": [string, N59]
    "6": [string, N610]
}

export interface N110 { }

export interface N24 { }

export interface N35 { }

export interface N47 { }

export interface N59 { }

export interface N610 { }

export interface N36 {
    "1": [string, N111]
    "2": [string, N210]
    "3": [string, N310]
    "4": [string, N48]
    "5": [string, N510]
    "6": [string, N611]
}

export interface N111 { }

export interface N210 { }

export interface N310 { }

export interface N48 { }

export interface N510 { }

export interface N611 { }

export interface N410 {
    "1": [string, N112]
    "2": [string, N211]
    "3": [string, N311]
    "4": [string, N411]
    "5": [string, N511]
    "6": [string, N612]
}

export interface N112 { }

export interface N211 { }

export interface N311 { }

export interface N411 { }

export interface N511 { }

export interface N612 { }

export interface N512 {
    "1": [string, N113]
    "2": [string, N212]
    "3": [string, N312]
    "4": [string, N412]
    "5": [string, N513]
    "6": [string, N613]
}

export interface N113 { }

export interface N212 { }

export interface N312 { }

export interface N412 { }

export interface N513 { }

export interface N613 { }

export interface N614 {
    "1": [string, N114]
    "2": [string, N213]
    "3": [string, N313]
    "4": [string, N413]
    "5": [string, N514]
    "6": [string, N615]
}

export interface N114 { }

export interface N213 { }

export interface N313 { }

export interface N413 { }

export interface N514 { }

export interface N615 { }

export interface N72 {
    "1": [string, N115]
    "2": [string, N214]
    "3": [string, N314]
    "4": [string, N414]
    "5": [string, N515]
    "6": [string, N616]
}

export interface N115 { }

export interface N214 { }

export interface N314 { }

export interface N414 { }

export interface N515 { }

export interface N616 { }

export interface N82 {
    "1": [string, N116]
    "2": [string, N215]
    "3": [string, N315]
    "4": [string, N415]
    "5": [string, N516]
    "6": [string, N617]
}

export interface N116 { }

export interface N215 { }

export interface N315 { }

export interface N415 { }

export interface N516 { }

export interface N617 { }
