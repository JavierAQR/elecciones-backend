import prisma from "../lib/prisma.js";

export const getParties = async (req, res) => {
  try {
    const parties = await prisma.party.findMany({
      orderBy: { name: "asc" },
    });
    res.json(parties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener partidos" });
  }
};

export const getPartyById = async (req, res) => {
  const { id } = req.params;

  try {
    const partyId = Number(id);
    if (Number.isNaN(partyId)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const party = await prisma.party.findUnique({
      where: { id: partyId },
      include: {
        candidates: true,
        proposals: true,
      },
    });

    if (!party) {
      return res.status(404).json({ error: "Partido no encontrado" });
    }

    res.json(party);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener detalle del partido" });
  }
};
