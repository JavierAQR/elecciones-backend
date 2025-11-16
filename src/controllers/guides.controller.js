import prisma from "../lib/prisma.js";

export const getGuidesByRole = async (req, res) => {
    const { role } = req.params;
  
    // Normalizar a mayúsculas por si acaso
    const normalizedRole = role.toUpperCase();
  
    try {
      const guides = await prisma.roleGuide.findMany({
        where: { role: normalizedRole },
        orderBy: [
          { section: "asc" },
          { id: "asc" },
        ],
      });
  
      if (!guides || guides.length === 0) {
        return res.status(404).json({
          error: "No se encontraron guías para este rol",
        });
      }
  
      res.json(guides);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Error al obtener guías para el rol",
      });
    }
  };