import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {

  // Limpia datos anteriores
  await prisma.event.deleteMany();
  await prisma.party.deleteMany();

  // === PARTIDOS (EJEMPLOS PERÚ) ===
  const parties = await prisma.party.createMany({
    data: [
      {
        name: "Acción Popular",
        description:
          "Partido de tradición peruana con énfasis en democracia, institucionalidad y desarrollo descentralizado.",
        logoUrl: null,
        website: "https://www.accionpopular.org.pe",
      },
      {
        name: "Alianza para el Progreso",
        description:
          "Agrupación con énfasis en educación, infraestructura regional y programas sociales.",
        logoUrl: null,
        website: "https://app.pe",
      },
      {
        name: "Fuerza Popular",
        description:
          "Partido con enfoque en orden, seguridad ciudadana y estabilidad económica.",
        logoUrl: null,
        website: "https://fuerzapopular.pe",
      },
      {
        name: "Partido Morado",
        description:
          "Agrupación que prioriza la educación, la innovación, los derechos ciudadanos y la lucha contra la corrupción.",
        logoUrl: null,
        website: "https://partidomorado.pe",
      },
      {
        name: "Juntos por el Perú",
        description:
          "Coalición de izquierda con énfasis en derechos sociales, salud pública y defensa del medio ambiente.",
        logoUrl: null,
        website: "https://juntosxperu.pe",
      },
      {
        name: "Partido Ejemplo A",
        description: "Agrupación enfocada en educación y salud.",
        logoUrl: null,
        website: null,
      },
      {
        name: "Partido Ejemplo B",
        description: "Propuestas en seguridad ciudadana y empleo.",
        logoUrl: null,
        website: null,
      },
    ],
  });

  console.log(`Partidos creados: ${parties.count}`);

  // === EVENTOS DEL PROCESO ELECTORAL (PERÚ, ESTILO REALISTA 2026) ===
  await prisma.event.createMany({
    data: [
      {
        title: "Convocatoria oficial a Elecciones Generales 2026",
        description:
          "Publicación del decreto de convocatoria para elecciones presidenciales y congresales.",
        date: new Date("2025-12-15T09:00:00Z"),
        type: "OTHER",
        targetRole: "ALL",
      },
      {
        title: "Cierre de inscripción de organizaciones políticas",
        description:
          "Fecha límite para que las organizaciones políticas queden inscritas para participar en las Elecciones 2026.",
        date: new Date("2026-01-31T23:59:00Z"),
        type: "DEADLINE",
        targetRole: "ALL",
      },
      {
        title: "Cierre de inscripción de listas de candidatos",
        description:
          "Último día para la presentación e inscripción de fórmulas presidenciales y listas al Congreso.",
        date: new Date("2026-02-28T23:59:00Z"),
        type: "DEADLINE",
        targetRole: "ALL",
      },
      {
        title: "Publicación del padrón electoral definitivo",
        description:
          "ONPE y RENIEC publican el padrón electoral definitivo para las Elecciones Generales 2026.",
        date: new Date("2026-03-10T09:00:00Z"),
        type: "OTHER",
        targetRole: "ALL",
      },
      {
        title: "Inicio de la franja electoral en medios",
        description:
          "Comienza la difusión de propaganda electoral en radio y TV según cronograma oficial.",
        date: new Date("2026-03-15T00:00:00Z"),
        type: "OTHER",
        targetRole: "ALL",
      },
      {
        title: "Capacitación presencial para miembros de mesa",
        description:
          "Jornada de capacitación obligatoria para miembros de mesa en locales designados por ONPE.",
        date: new Date("2026-03-21T09:00:00Z"),
        type: "TRAINING",
        targetRole: "MESA",
      },
      {
        title: "Capacitación virtual para miembros de mesa",
        description:
          "Módulos virtuales de capacitación disponibles para miembros de mesa.",
        date: new Date("2026-03-25T09:00:00Z"),
        type: "TRAINING",
        targetRole: "MESA",
      },
      {
        title: "Debate presidencial oficial",
        description:
          "Debate organizado por el Jurado Nacional de Elecciones con participación de candidatos presidenciales.",
        date: new Date("2026-04-05T20:00:00Z"),
        type: "OTHER",
        targetRole: "ALL",
      },
      {
        title: "Veda electoral",
        description:
          "Inicio del periodo de veda en el que se prohíbe la propaganda política.",
        date: new Date("2026-04-10T00:00:00Z"),
        type: "DEADLINE",
        targetRole: "ALL",
      },
      {
        title: "Elecciones generales 2026",
        description:
          "Jornada principal de votación para elegir Presidente, Congreso y representantes ante el Parlamento Andino.",
        date: new Date("2026-04-12T08:00:00Z"),
        type: "ELECTION",
        targetRole: "ALL",
      },
      {
        title: "Instalación de mesas de sufragio",
        description:
          "Los miembros de mesa deben presentarse en sus locales para la instalación de la mesa y de los materiales.",
        date: new Date("2026-04-12T07:00:00Z"),
        type: "TRAINING",
        targetRole: "MESA",
      },
      {
        title: "Cierre de votación y conteo rápido",
        description:
          "Cierre de mesas de sufragio y primera difusión de resultados de conteo rápido.",
        date: new Date("2026-04-12T16:00:00Z"),
        type: "ELECTION",
        targetRole: "ALL",
      },
      {
        title: "Eventual segunda vuelta presidencial",
        description:
          "Fecha estimada para la eventual segunda vuelta presidencial, en caso ningún candidato supere el porcentaje requerido.",
        date: new Date("2026-06-07T08:00:00Z"),
        type: "ELECTION",
        targetRole: "ALL",
      },
    ],
  });

  console.log("Eventos creados");

  // === OBTENER PARTIDOS PARA RELACIONES ===
  const partiesDb = await prisma.party.findMany();
  const ap = partiesDb.find((p) => p.name === "Acción Popular");
  const app = partiesDb.find((p) => p.name === "Alianza para el Progreso");
  const fp = partiesDb.find((p) => p.name === "Fuerza Popular");
  const pm = partiesDb.find((p) => p.name === "Partido Morado");
  const jpp = partiesDb.find((p) => p.name === "Juntos por el Perú");

  // === CANDIDATOS (EJEMPLO) ===
  if (ap && app && fp && pm && jpp) {
    await prisma.candidate.createMany({
      data: [
        // Acción Popular
        {
          fullName: "Candidato Presidencial Acción Popular",
          role: "PRESIDENT",
          regionLevel: "NATIONAL",
          bio: "Candidato con trayectoria en gestión pública y enfoque en descentralización.",
          cvUrl: null,
          partyId: ap.id,
        },
        {
          fullName: "Candidata a la Primera Vicepresidencia AP",
          role: "VICE_PRESIDENT",
          regionLevel: "NATIONAL",
          bio: "Profesional con experiencia en políticas sociales y desarrollo regional.",
          cvUrl: null,
          partyId: ap.id,
        },

        // Alianza para el Progreso
        {
          fullName: "Candidato Presidencial APP",
          role: "PRESIDENT",
          regionLevel: "NATIONAL",
          bio: "Empresario y político con énfasis en infraestructura y educación.",
          cvUrl: null,
          partyId: app.id,
        },
        {
          fullName: "Candidata al Congreso por La Libertad",
          role: "CONGRESS",
          regionLevel: "REGIONAL",
          bio: "Docente universitaria enfocada en reforma educativa y gestión regional.",
          cvUrl: null,
          partyId: app.id,
        },

        // Fuerza Popular
        {
          fullName: "Candidata Presidencial Fuerza Popular",
          role: "PRESIDENT",
          regionLevel: "NATIONAL",
          bio: "Candidata con énfasis en seguridad ciudadana y estabilidad económica.",
          cvUrl: null,
          partyId: fp.id,
        },
        {
          fullName: "Candidato al Congreso por Lima",
          role: "CONGRESS",
          regionLevel: "REGIONAL",
          bio: "Abogado con propuestas en seguridad y lucha contra el crimen organizado.",
          cvUrl: null,
          partyId: fp.id,
        },

        // Partido Morado
        {
          fullName: "Candidato Presidencial Partido Morado",
          role: "PRESIDENT",
          regionLevel: "NATIONAL",
          bio: "Profesional liberal con enfoque en innovación, educación y derechos civiles.",
          cvUrl: null,
          partyId: pm.id,
        },
        {
          fullName: "Candidata al Congreso por Lima Metropolitana",
          role: "CONGRESS",
          regionLevel: "REGIONAL",
          bio: "Activista por la transparencia y el gobierno digital.",
          cvUrl: null,
          partyId: pm.id,
        },

        // Juntos por el Perú
        {
          fullName: "Candidato Presidencial Juntos por el Perú",
          role: "PRESIDENT",
          regionLevel: "NATIONAL",
          bio: "Dirigente con énfasis en justicia social, salud pública y protección ambiental.",
          cvUrl: null,
          partyId: jpp.id,
        },
        {
          fullName: "Candidata al Congreso por Cusco",
          role: "CONGRESS",
          regionLevel: "REGIONAL",
          bio: "Líder social con trabajo en comunidades andinas y defensa del territorio.",
          cvUrl: null,
          partyId: jpp.id,
        },
      ],
    });

    // === PROPUESTAS POR PARTIDO ===
    await prisma.proposal.createMany({
      data: [
        // Acción Popular
        {
          title: "Plan de infraestructura vial descentralizada",
          description:
            "Construcción y mantenimiento de corredores viales en regiones para mejorar el acceso a mercados y servicios.",
          topic: "ECONOMY",
          partyId: ap.id,
        },
        {
          title: "Fortalecimiento de gobiernos locales",
          description:
            "Reforma para transferir competencias y presupuesto a municipalidades con mejores mecanismos de control.",
          topic: "OTHER",
          partyId: ap.id,
        },

        // Alianza para el Progreso
        {
          title: "Escuelas seguras y conectadas",
          description:
            "Programa para mejorar infraestructura educativa con acceso a internet en zonas urbanas y rurales.",
          topic: "EDUCATION",
          partyId: app.id,
        },
        {
          title: "Hospitales regionales equipados",
          description:
            "Inversión en hospitales regionales con equipamiento moderno y personal especializado.",
          topic: "HEALTH",
          partyId: app.id,
        },

        // Fuerza Popular
        {
          title: "Plan nacional de seguridad ciudadana",
          description:
            "Incremento de presencia policial, inteligencia contra el crimen organizado y coordinación con gobiernos locales.",
          topic: "SECURITY",
          partyId: fp.id,
        },
        {
          title: "Estabilidad macroeconómica y empleo",
          description:
            "Políticas para promover la inversión privada, reducir la informalidad y generar empleo formal.",
          topic: "ECONOMY",
          partyId: fp.id,
        },

        // Partido Morado
        {
          title: "Reforma educativa con enfoque digital",
          description:
            "Actualización curricular, formación docente y plataformas digitales para aprendizaje híbrido.",
          topic: "EDUCATION",
          partyId: pm.id,
        },
        {
          title: "Gobierno digital y transparencia",
          description:
            "Digitalización de trámites, acceso abierto a datos públicos y plataformas de control ciudadano.",
          topic: "OTHER",
          partyId: pm.id,
        },

        // Juntos por el Perú
        {
          title: "Fortalecimiento de la salud pública",
          description:
            "Incremento de presupuesto para atención primaria, abastecimiento de medicamentos y prevención.",
          topic: "HEALTH",
          partyId: jpp.id,
        },
        {
          title: "Protección del medio ambiente y recursos naturales",
          description:
            "Regulación más estricta para actividades extractivas y protección de comunidades vulnerables.",
          topic: "OTHER",
          partyId: jpp.id,
        },
      ],
    });
  }

  // === GUÍAS PARA ROL (RoleGuide) ===
  await prisma.roleGuide.deleteMany();
  await prisma.roleGuide.createMany({
    data: [
      // INFO general
      {
        role: "INFO",
        section: "OVERVIEW",
        title: "¿Qué se elige en las Elecciones Generales 2026?",
        content:
          "En las Elecciones Generales se elige a la persona que ocupará la Presidencia de la República, a los congresistas y a las y los representantes ante el Parlamento Andino.",
      },
      {
        role: "INFO",
        section: "OVERVIEW",
        title: "¿Quién organiza las elecciones en el Perú?",
        content:
          "El sistema electoral peruano está conformado por la ONPE, el JNE y el RENIEC, instituciones encargadas de organizar, supervisar y administrar el padrón electoral.",
      },

      // ELECTOR
      {
        role: "ELECTOR",
        section: "BEFORE",
        title: "Antes del día de la elección",
        content:
          "1. Verifica tu local de votación en la plataforma oficial de la ONPE.\n2. Revisa que tu DNI esté vigente.\n3. Infórmate sobre las propuestas de las organizaciones políticas.\n4. Ten claro el horario de votación recomendado según tu grupo de riesgo.",
      },
      {
        role: "ELECTOR",
        section: "DURING",
        title: "El día de la elección",
        content:
          "1. Lleva tu DNI físico.\n2. Acude a tu local de votación dentro del horario establecido.\n3. Ubica tu número de mesa y sigue las indicaciones del personal de apoyo.\n4. Emite tu voto de forma reservada en la cámara secreta.\n5. Deposita tu cédula en el ánfora y verifica el sello en tu DNI.",
      },
      {
        role: "ELECTOR",
        section: "AFTER",
        title: "Después de votar",
        content:
          "1. Conserva tu DNI con el sello correspondiente.\n2. Retírate del local evitando aglomeraciones.\n3. Sigue los resultados oficiales a través de los canales del sistema electoral.\n4. No participes en la difusión de resultados no oficiales o información falsa.",
      },

      // MESA (miembro de mesa)
      {
        role: "MESA",
        section: "INSTALLATION",
        title: "Instalación de la mesa de sufragio",
        content:
          "1. Preséntate en tu local de votación a la hora indicada por la ONPE.\n2. Identifícate como miembro de mesa titular o suplente.\n3. Revisa el material electoral entregado (cédulas, actas, lista de electores, ánfora).\n4. Completa y firma el acta de instalación junto con los demás miembros.",
      },
      {
        role: "MESA",
        section: "SUFRAGIO",
        title: "Durante el sufragio",
        content:
          "1. Recibe a las y los electores verificando su identidad con el DNI.\n2. Ubica su número en la lista de electores y solicita su firma o huella.\n3. Entrega la cédula de votación y explica brevemente cómo marcar el voto.\n4. Mantén el orden en la mesa y coordina con personal de la ONPE ante cualquier incidencia.",
      },
      {
        role: "MESA",
        section: "CLOSING",
        title: "Escrutinio y cierre de la mesa",
        content:
          "1. Al cierre de la votación, verifica que solo se atienda a las personas que se encuentren dentro del local.\n2. Procede al conteo de votos siguiendo el procedimiento establecido.\n3. Completa las actas de escrutinio con sumo cuidado.\n4. Firma y entrega el material electoral según las indicaciones de la ONPE.",
      },
    ],
  });

  // === LOCALES DE VOTACIÓN (EJEMPLO) ===
  await prisma.votingLocation.deleteMany();
  await prisma.votingLocation.createMany({
    data: [
      {
        department: "Lima",
        province: "Lima",
        district: "San Juan de Lurigancho",
        placeName: "IE 1224 José María Arguedas",
        address:
          "Av. Próceres de la Independencia 1234, San Juan de Lurigancho",
        lat: -12.003,
        lng: -77.001,
      },
      {
        department: "Lima",
        province: "Lima",
        district: "Comas",
        placeName: "IE 3045 Perú Futuro",
        address: "Av. Universitaria 5678, Comas",
        lat: -11.936,
        lng: -77.062,
      },
    ],
  });

  const locations = await prisma.votingLocation.findMany();
  const sjl = locations.find((l) => l.district === 'San Juan de Lurigancho');
  const comas = locations.find((l) => l.district === 'Comas');
  
  if (sjl && comas) {
    await prisma.voterAssignment.createMany({
      data: [
        {
          dni: '12345678',
          fullName: 'Juan Pérez Ejemplo',
          isMesaMember: false,
          tableNumber: '345621',
          votingLocationId: sjl.id,
        },
        {
          dni: '87654321',
          fullName: 'María López Ejemplo',
          isMesaMember: true,        // Miembro de mesa
          tableNumber: '345621',
          votingLocationId: sjl.id,
        },
        {
          dni: '11112222',
          fullName: 'Carlos Ramírez',
          isMesaMember: false,
          tableNumber: '412389',
          votingLocationId: comas.id,
        },
        {
          dni: '99998888',
          fullName: 'Ana Fernández',
          isMesaMember: true,         // Miembro de mesa
          tableNumber: '412389',
          votingLocationId: comas.id,
        },
        {
          dni: '55554444',
          fullName: 'Luis Mendoza',
          isMesaMember: false,
          tableNumber: '345621',
          votingLocationId: sjl.id,
        },
      ],
    });
  }
  
  console.log('Asignaciones de votantes creadas.');
}

main()
  .then(() => {
    console.log("Seed completado con datos de Perú");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
