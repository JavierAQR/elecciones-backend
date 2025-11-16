import prisma from "../lib/prisma";

export const getVoterByDni = async (req, res) => {
    const { dni } = req.params;
  
    try {
      const assignment = await prisma.voterAssignment.findUnique({
        where: { dni },
        include: {
          votingLocation: true,
        },
      });
  
      if (!assignment) {
        return res.status(404).json({ found: false, message: "DNI no encontrado" });
      }
  
      const { votingLocation } = assignment;
  
      res.json({
        dni: assignment.dni,
        fullName: assignment.fullName,
        isMesaMember: assignment.isMesaMember,
        tableNumber: assignment.tableNumber,
        votingLocation: {
          id: votingLocation.id,
          department: votingLocation.department,
          province: votingLocation.province,
          district: votingLocation.district,
          placeName: votingLocation.placeName,
          address: votingLocation.address,
          lat: votingLocation.lat,
          lng: votingLocation.lng,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Error al buscar información por DNI",
      });
    }
  };