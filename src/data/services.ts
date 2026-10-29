export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  pillarId: 'corporativo' | 'litigios' | 'patrimonio' | 'laboral';
  pillarTitle: string;
  badge: string;
  shortDescription: string;
  detailedScope: string;
  approach: 'Preventivo y Estratégico' | 'Litigioso y Contencioso' | 'Integral y Mixto';
  keyDeliverables: string[];
  typicalCases: string[];
  targetAudience: string;
  ctaText: string;
}

export interface PracticePillar {
  id: 'corporativo' | 'litigios' | 'patrimonio' | 'laboral';
  number: string;
  code: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  highlightText: string;
  serviceIds: string[];
}

export const PRACTICE_PILLARS: PracticePillar[] = [
  {
    id: 'corporativo',
    number: '01',
    code: 'CORP-01',
    title: 'Derecho Corporativo & Negocios',
    subtitle: 'Arquitectura societaria, gobierno corporativo y escalamiento transaccional',
    tagline: 'Estructuración jurídica de vanguardia para la alta dirección y vehículos de inversión.',
    description:
      'Acompañamos a holdings, empresas familiares y fondos de inversión en la concepción y blindaje de sus operaciones mercantiles, fusiones, adquisiciones y gobiernos corporativos con un enfoque preventivo de máxima exigencia.',
    highlightText: 'Seguridad jurídica institucional en cada ciclo económico y transacción transfronteriza.',
    serviceIds: ['derecho-sociedades', 'derecho-empresarial', 'consultoria-empresarial', 'gestion-proyectos'],
  },
  {
    id: 'litigios',
    number: '02',
    code: 'LIT-02',
    title: 'Litigios, Consumo & Responsabilidad',
    subtitle: 'Defensa contenciosa de alta complejidad, protección al consumidor y resarcimiento',
    tagline: 'Estrategia litigiosa probada en cortes arbitrales, tribunales civiles y órganos regulatorios.',
    description:
      'Representación rigurosa ante litigios civiles, mercantiles y regulatorios. Mitigamos contingencias reputacionales y económicas mediante una defensa técnica de pulcritud procesal inquebrantable.',
    highlightText: 'Eficacia en juicio y determinación en la resolución pacífica de controversias críticas.',
    serviceIds: ['derecho-consumidor', 'danos-personales'],
  },
  {
    id: 'patrimonio',
    number: '03',
    code: 'PAT-03',
    title: 'Patrimonio, Bienes & Sucesiones',
    subtitle: 'Planificación hereditaria fiduciaria, blindaje de activos y derecho inmobiliario',
    tagline: 'Perpetuación generacional del patrimonio familiar e inmobiliario con serenidad y certeza.',
    description:
      'Diseñamos estructuras de relevo generacional, protocolos de familia y saneamiento inmobiliario estratégico para proteger el capital forjado por nuestros clientes frente a volatilidades normativas.',
    highlightText: 'Preservación patrimonial que trasciende generaciones con estricto orden civil.',
    serviceIds: ['derecho-sucesiones', 'derecho-propiedad'],
  },
  {
    id: 'laboral',
    number: '04',
    code: 'LAB-04',
    title: 'Relaciones Laborales & Estrategia Legal',
    subtitle: 'Compliance laboral preventivo, negociación colectiva y consultoría de alto nivel',
    tagline: 'Armonía jurídica entre capital humano, productividad y cumplimiento normativo estricto.',
    description:
      'Optimizamos las políticas de contratación, esquemas de compensación ejecutiva y gestión de crisis laborales para garantizar la continuidad operativa sin fricciones jurídicas ni sanciones disciplinarias.',
    highlightText: 'Tranquilidad patronal sustentada en marcos laborales modernos y defensas sólidas.',
    serviceIds: ['derecho-laboral', 'consultoria-legal'],
  },
];

export const SERVICES: ServiceItem[] = [
  // PILAR 01: Corporativo
  {
    id: 'derecho-sociedades',
    slug: 'derecho-de-sociedades',
    title: 'Derecho de Sociedades',
    pillarId: 'corporativo',
    pillarTitle: 'Pilar 01 — Derecho Corporativo y Negocios',
    badge: 'Gobierno Societario & M&A',
    shortDescription:
      'Constitución, reorganización, acuerdos de accionistas y fusiones con arquitectura estatutaria a medida.',
    detailedScope:
      'Estructuración holística de vehículos societarios mercantiles: acuerdos parasociales de sindicación de voto, salidas estructuradas (drag-along / tag-along), disolución, escisiones complejas y secretaría corporativa permanente.',
    approach: 'Preventivo y Estratégico',
    keyDeliverables: [
      'Pactos de socios con cláusulas de resolución de empates y restricciones de transferibilidad.',
      'Auditorías societarias previas a rondas de financiamiento o procesos de Due Diligence.',
      'Protocolos de asambleas ordinarias/extraordinarias y reformas de capital blindadas.',
      'Estructuración de grupos empresariales y matrices subordinadas.',
    ],
    typicalCases: [
      'Entrada de nuevos socios inversionistas con dilución controlada y derechos de veto.',
      'Prevención de abusos de mayoría o minoría en juntas directivas.',
      'Reestructuración de sociedades holding para optimización de riesgos operacionales.',
    ],
    targetAudience: 'Holdings, directores ejecutivos, fondos de capital privado y empresas familiares.',
    ctaText: 'Estructurar Gobierno Corporativo',
  },
  {
    id: 'derecho-empresarial',
    slug: 'derecho-empresarial',
    title: 'Derecho Empresarial',
    pillarId: 'corporativo',
    pillarTitle: 'Pilar 01 — Derecho Corporativo y Negocios',
    badge: 'Contratación Mercantil & Operaciones',
    shortDescription:
      'Blindaje de la operación comercial cotidiana mediante contratos mercantiles nacionales e internacionales.',
    detailedScope:
      'Redacción y negociación estratégica de contratos marco de distribución, suministro, agencia, franquicias, joint ventures y licencias tecnológicas, asegurando que cada riesgo operativo quede debidamente asignado y delimitado.',
    approach: 'Preventivo y Estratégico',
    keyDeliverables: [
      'Matrices de riesgo contractual adaptadas a la cadena de valor de la compañía.',
      'Términos y condiciones omnicanal con cumplimiento de normativas vigentes.',
      'Contratos de confidencialidad (NDA), exclusividad y no competencia reforzados.',
      'Estructuras de garantías mercantiles y prendas sobre flujos futuros.',
    ],
    typicalCases: [
      'Renegociación de condiciones contractuales críticas ante disrupciones de mercado.',
      'Cierre de acuerdos de distribución exclusiva con proveedores extranjeros.',
      'Implementación de modelos de negocio B2B de alta recurrencia.',
    ],
    targetAudience: 'Directores de operaciones, gerencias generales y empresas en expansión comercial.',
    ctaText: 'Blindar Operaciones Comerciales',
  },
  {
    id: 'consultoria-empresarial',
    slug: 'consultoria-empresarial',
    title: 'Consultoría Empresarial',
    pillarId: 'corporativo',
    pillarTitle: 'Pilar 01 — Derecho Corporativo y Negocios',
    badge: 'Diagnóstico & Estrategia Integral',
    shortDescription:
      'Asesoramiento integral de cabecera para juntas directivas en decisiones estratégicas de alta repercusión.',
    detailedScope:
      'Diagnóstico legal periódico de riesgos corporativos (Legal Health Check), acompañamiento en reestructuración de pasivos, compliance antilavado/anticorrupción y adecuación a cambios normativos de alto impacto.',
    approach: 'Preventivo y Estratégico',
    keyDeliverables: [
      'Informes ejecutivos de viabilidad jurídica de nuevas líneas de negocio.',
      'Planes de mitigación y matrices de contingencias frente a autoridades regulatorias.',
      'Acompañamiento en comités directivos como asesores jurídicos independientes.',
      'Diseño e implantación de programas integrales de cumplimiento ético-legal.',
    ],
    typicalCases: [
      'Incursión en sectores altamente regulados con exigencias de licencias especiales.',
      'Transformación de modelos tradicionales a plataformas digitales y fintech.',
      'Prevención de responsabilidad patrimonial y penal de administradores y directivos.',
    ],
    targetAudience: 'Miembros de juntas directivas, presidentes ejecutivos y comités de auditoría.',
    ctaText: 'Solicitar Diagnóstico Estratégico',
  },
  {
    id: 'gestion-proyectos',
    slug: 'gestion-de-proyectos',
    title: 'Gestión de Proyectos',
    pillarId: 'corporativo',
    pillarTitle: 'Pilar 01 — Derecho Corporativo y Negocios',
    badge: 'Project Legal Management',
    shortDescription:
      'Coordinación jurídica y cierre contractual de megaproyectos de infraestructura, tecnología e inversión.',
    detailedScope:
      'Supervisión legal integral de las etapas de formulación, licitación, adjudicación, ejecución y liquidación de proyectos de gran escala, coordinando sinergias entre ingenieros, auditores financieros y entidades estatales.',
    approach: 'Integral y Mixto',
    keyDeliverables: [
      'Contratos tipo EPC (Engineering, Procurement and Construction), O&M y llave en mano.',
      'Gestión de reclamaciones y variaciones en obra (Claims Management preventivo).',
      'Cumplimiento de hitos regulatorios, licencias ambientales y permisos sectoriales.',
      'Mecanismos alternos de resolución de disputas en tiempo real (Dispute Boards).',
    ],
    typicalCases: [
      'Desarrollo de proyectos inmobiliarios, energéticos y tecnológicos de capital intensivo.',
      'Negociación de consorcios y uniones temporales para contratación pública o privada.',
      'Cierre ordenado de contratos de obra sin incurrir en penalidades contractuales.',
    ],
    targetAudience: 'Promotores inmobiliarios, firmas constructoras e inversionistas de infraestructura.',
    ctaText: 'Gestionar Proyecto Estratégico',
  },

  // PILAR 02: Litigios y Responsabilidad
  {
    id: 'derecho-consumidor',
    slug: 'derecho-del-consumidor',
    title: 'Derecho del Consumidor',
    pillarId: 'litigios',
    pillarTitle: 'Pilar 02 — Litigios, Consumo y Responsabilidad',
    badge: 'Cumplimiento Regulatorio & Defensa',
    shortDescription:
      'Defensa técnica en investigaciones administrativas y auditoría de políticas de consumo y garantías.',
    detailedScope:
      'Representación ante entidades de vigilancia y control frente a quejas de usuarios, investigaciones sancionatorias por publicidad engañosa, efectividad de garantías y protección de datos en comercio electrónico masivo.',
    approach: 'Litigioso y Contencioso',
    keyDeliverables: [
      'Auditoría y redacción de protocolos de servicio al cliente y políticas de garantías.',
      'Descargos y recursos de reposición/apelación en expedientes sancionatorios.',
      'Estrategias de contención de crisis ante reclamos colectivos o virales.',
      'Revisión preventiva de campañas publicitarias y promociones comerciales.',
    ],
    typicalCases: [
      'Investigaciones por presunta publicidad engañosa o cláusulas abusivas en contratos tipo.',
      'Reclamaciones masivas de consumidores en el sector retail, automotriz o tecnológico.',
      'Imposición de multas administrativas y su demanda contenciosa de nulidad.',
    ],
    targetAudience: 'Comercializadores masivos, plataformas e-commerce e importadores.',
    ctaText: 'Atender Contingencia de Consumo',
  },
  {
    id: 'danos-personales',
    slug: 'derecho-de-danos-personales',
    title: 'Derecho de Daños Personales',
    pillarId: 'litigios',
    pillarTitle: 'Pilar 02 — Litigios, Consumo y Responsabilidad',
    badge: 'Responsabilidad Civil & Indemnizaciones',
    shortDescription:
      'Determinación técnica y litigio en responsabilidad civil contractual y extracontractual por perjuicios.',
    detailedScope:
      'Cuantificación pericial y litigio de daño emergente, lucro cesante y daño moral derivados de accidentes, mala praxis profesional, siniestros corporativos y fallas en productos, con representación de demandantes o aseguradoras.',
    approach: 'Litigioso y Contencioso',
    keyDeliverables: [
      'Dictámenes de tasación de perjuicios materiales e inmateriales bajo jurisprudencia actualizada.',
      'Negociaciones de acuerdos transaccionales con compañías de seguros y reaseguros.',
      'Defensa contenciosa en tribunales judiciales y tribunales de arbitramento.',
      'Estrategia probatoria con peritajes biomédicos, actuariales y financieros.',
    ],
    typicalCases: [
      'Reclamaciones millonarias derivadas de siniestros industriales o de transporte.',
      'Defensa de profesionales y corporaciones ante demandas por supuesta negligencia.',
      'Recuperación de indemnizaciones ante aseguradoras por pólizas de responsabilidad civil.',
    ],
    targetAudience: 'Víctimas de perjuicios graves, aseguradoras y directivos ante contingencias de responsabilidad.',
    ctaText: 'Consultar Caso de Responsabilidad',
  },

  // PILAR 03: Patrimonio y Sucesiones
  {
    id: 'derecho-sucesiones',
    slug: 'derecho-de-sucesiones',
    title: 'Derecho de Sucesiones',
    pillarId: 'patrimonio',
    pillarTitle: 'Pilar 03 — Patrimonio, Bienes y Sucesiones',
    badge: 'Planificación Familiar & Fideicomisos',
    shortDescription:
      'Planificación sucesoral pacífica, testamentos blindados y partición fiduciaria libre de disputas.',
    detailedScope:
      'Estructuración preventiva de la transferencia patrimonial intergeneracional: testamentos solemnes, donaciones con reserva de usufructo, constitución de patrimonios de familia inembargables y liquidación notarial o judicial de herencias.',
    approach: 'Preventivo y Estratégico',
    keyDeliverables: [
      'Protocolos sucesorios y minutas de testamentos abiertos o cerrados con blindaje formal.',
      'Acuerdos de partición de herencia con asignaciones equitativas sin descapitalizar activos.',
      'Trámites de sucesión notarial expeditos con común acuerdo.',
      'Representación técnica en procesos de sucesión contenciosos y juicios de filiación.',
    ],
    typicalCases: [
      'Transición del patrimonio familiar a la siguiente generación sin conflictos familiares.',
      'Sucesiones ilíquidas con multiplicidad de bienes inmuebles, cuotas societarias y activos en el exterior.',
      'Protección de herederos con condiciones especiales mediante encargos fiduciarios.',
    ],
    targetAudience: 'Patrimonios familiares, personas naturales de alto patrimonio y herederos en liquidación.',
    ctaText: 'Planificar Relevo Sucesoral',
  },
  {
    id: 'derecho-propiedad',
    slug: 'derecho-de-propiedad',
    title: 'Derecho de Propiedad',
    pillarId: 'patrimonio',
    pillarTitle: 'Pilar 03 — Patrimonio, Bienes y Sucesiones',
    badge: 'Bienes Raíces & Saneamiento Predial',
    shortDescription:
      'Estudio de títulos, saneamiento inmobiliario, estructuración de parcelaciones y litigio reivindicatorio.',
    detailedScope:
      'Seguridad jurídica integral sobre inmuebles rurales y urbanos: estudios de títulos a 20+ años, licencias urbanísticas, reglamentos de propiedad horizontal, constitución de servidumbres y acciones de dominio reivindicatorias y posesorias.',
    approach: 'Integral y Mixto',
    keyDeliverables: [
      'Conceptos de estudio de títulos con identificación de gravámenes, embargos y falsas tradiciones.',
      'Contratos de promesa de compraventa, permuta y fiducias inmobiliarias.',
      'Procesos de pertenencia, deslinde, amojonamiento y restitución de inmuebles.',
      'Estructuración jurídica de conjuntos comerciales y condominios residenciales.',
    ],
    typicalCases: [
      'Adquisición de lotes estratégicos para proyectos residenciales o de bodegas logísticas.',
      'Resolución de disputas limítrofes entre predios o posesiones irregulares.',
      'Regularización de inmuebles antiguos sin cadena de tradición perfecta.',
    ],
    targetAudience: 'Inversionistas inmobiliarios, constructoras, propietarios y administradores fiduciarios.',
    ctaText: 'Saneamiento y Títulos Inmobiliarios',
  },

  // PILAR 04: Laboral y Estrategia Legal
  {
    id: 'derecho-laboral',
    slug: 'derecho-laboral',
    title: 'Derecho Laboral',
    pillarId: 'laboral',
    pillarTitle: 'Pilar 04 — Relaciones Laborales y Estrategia Legal',
    badge: 'Gestión Patronal & Contencioso Laboral',
    shortDescription:
      'Defensa patronal, auditoría de riesgos de nómina, contratación directiva y negociación colectiva.',
    detailedScope:
      'Asesoría integral en la relación empresa-trabajador: esquemas de desvinculación sin riesgo de reintegro, acuerdos de confidencialidad y retención de talento clave, defensa en demandas ordinarias laborales e investigaciones del Ministerio del Trabajo.',
    approach: 'Preventivo y Estratégico',
    keyDeliverables: [
      'Reglamentos internos de trabajo, políticas de teletrabajo y desconexión laboral.',
      'Auditorías prestacionales y de aportes al sistema de seguridad social integral.',
      'Diseño de planes de retiro voluntario y mutuo acuerdo para mandos medios y directivos.',
      'Defensa jurídica contenciosa en procesos judiciales laborales de única y primera instancia.',
    ],
    typicalCases: [
      'Prevención de contingencias por estabilidad laboral reforzada (fueros de salud o maternidad).',
      'Desvinculación de personal de alta confianza con blindaje de secretos industriales.',
      'Atención de pliegos de peticiones y mesas de diálogo sindical en el marco de la huelga.',
    ],
    targetAudience: 'Gerentes de recursos humanos, directores administrativos y directores jurídicos corporativos.',
    ctaText: 'Blindar Gestión Laboral Patronal',
  },
  {
    id: 'consultoria-legal',
    slug: 'consultoria-legal',
    title: 'Consultoría Legal',
    pillarId: 'laboral',
    pillarTitle: 'Pilar 04 — Relaciones Laborales y Estrategia Legal',
    badge: 'Legal Advisory On-Demand',
    shortDescription:
      'Estrategia normativa personalizada, emisión de conceptos vinculantes y auditoría preventiva continua.',
    detailedScope:
      'Mesa de ayuda jurídica estratégica con tiempos de respuesta garantizados para absolver dudas regulatorias complejas, evaluar riesgos operativos y respaldar la toma de decisiones críticas de la gerencia con soporte normativo inequívoco.',
    approach: 'Preventivo y Estratégico',
    keyDeliverables: [
      'Emisión de dictámenes y conceptos jurídicos formales con respaldo jurisprudencial.',
      'Canal prioritario de consulta legal para resolución inmediata de dudas contractuales.',
      'Boletines y alertas de impacto normativo tailor-made para el sector económico del cliente.',
      'Capacitaciones in-company sobre prevención de riesgos penales y civiles corporativos.',
    ],
    typicalCases: [
      'Dudas urgentes sobre interpretación de nuevas reformas tributarias, civiles o laborales.',
      'Evaluación de viabilidad de nuevas alianzas estratégicas antes de firmar memorandos de entendimiento.',
      'Revisión externa de decisiones de alta gerencia para evitar conflictos de interés.',
    ],
    targetAudience: 'Presidencia, directores ejecutivos y departamentos legales internos que requieren un segundo criterio especializado.',
    ctaText: 'Activar Consultoría Jurídica',
  },
];

export const FIRM_STATS = [
  { value: '5+', label: 'Años de Trayectoria Combinada', suffix: 'Años' },
  { value: '98.4%', label: 'Índice de Resolución Favorable', suffix: 'Eficacia' },
  { value: '1.200+', label: 'Contratos y Operaciones Blindadas', suffix: 'Casos' },
  { value: '100%', label: 'Confidencialidad y Rigor Técnico', suffix: 'Compromiso' },
];

export const FIRM_METHODOLOGY = [
  {
    step: '01',
    title: 'Rigor Técnico & Diagnóstico',
    subtitle: 'Análisis minucioso del mapa de riesgos',
    description:
      'Desarticulamos cada variable fáctica y jurídica con una perspectiva multidimensional. Identificamos vulnerabilidades ocultas antes de que se transformen en contingencias económicas.',
    quote: 'La certeza jurídica no admite imprecisiones; se construye desde el estudio exhaustivo de cada precedente.',
    stats: '100% rigor analítico',
  },
  {
    step: '02',
    title: 'Visión Empresarial & Estrategia',
    subtitle: 'Alineación de objetivos de negocio con el marco legal',
    description:
      'No somos un obstáculo para los negocios: actuamos como facilitadores estructurantes. Traducimos la complejidad de la ley en soluciones pragmáticas, rentables y sostenibles en el tiempo.',
    quote: 'El mejor abogado no es el que detiene los proyectos por temor al riesgo, sino el que traza el camino seguro para cruzarlos.',
    stats: 'Agilidad en la ejecución',
  },
  {
    step: '03',
    title: 'Acompañamiento Estratégico',
    subtitle: 'Presencia directa de socios sénior en cada fase',
    description:
      'Atención personalizada sin delegación anónima. Los socios de la firma lideran personalmente la estrategia, las negociaciones de alto calibre y la representación en estrados.',
    quote: 'Nuestros clientes no contratan una firma masiva; eligen la tranquilidad de contar con estrategas directos a su lado.',
    stats: 'Socios dedicados',
  },
];

export const CONTACT_INFO = {
  firmName: 'TORRES & TORRES Abogados Asociados',
  tagline: 'Rigor Jurídico, Visión Estratégica & Confianza Institucional',
  phone: '+57 (1) 715 6975',
  mobile: '+57 322 291 5599',
  whatsapp: '+57 322 291 5599',
  whatsappRaw: '573222915599',
  whatsappMessage: 'Hola, me gustaría agendar una consulta jurídica con TORRES & TORRES Abogados Asociados sobre el servicio: ',
  email: 'torrestorresabogadosasociados@gmail.com',
  address: 'Calle 11 # 8-54 Oficina 303',
  city: 'Bogotá D.C., Colombia',
  schedule: 'Lunes a Viernes: 8:00 AM – 6:00 PM',
  postalCode: '111711',
};
