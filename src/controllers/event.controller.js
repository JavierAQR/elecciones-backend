import prisma from "../lib/prisma.js";

export const getEvents = async (req, res) => {
    const { role } = req.query;
  
    try {
      const where = {};
  
      if (role) {
        const normalizedRole = role.toUpperCase();
        where.OR = [
          { targetRole: "ALL" },
          { targetRole: normalizedRole },
        ];
      }
  
      const events = await prisma.event.findMany({
        where,
        orderBy: { date: "asc" },
      });
  
      res.json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener eventos" });
    }
  };

export const getNextEvent = async (req, res) => {
  try {
    const now = new Date();
    const nextEvent = await prisma.event.findFirst({
      where: {
        date: {
          gte: now,
        },
      },
      orderBy: { date: "asc" },
    });
    res.json(nextEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener próximo evento" });
  }
};
