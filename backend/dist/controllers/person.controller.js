import personService from "../services/person.service.js";
import dateService from "../services/date.service.js";
const listAll = async (req, res, next) => {
  try {
    const {
      role
    } = req.query;
    const filter = role ? {
      where: {
        roles: {
          hasSome: role.split(",")
        }
      }
    } : {};
    const allPeople = await personService.listAll(filter);
    res.status(200).json(allPeople);
  } catch (error) {
    next(error);
  }
};
const listByDateId = async (req, res, next) => {
  const {
    dateId
  } = req.params;
  try {
    // lekérjük az elérhető dátumot
    const chosenDate = await dateService.getById(dateId);
    if (!chosenDate) {
      return res.status(404).json({
        message: "Dátum nem található"
      });
    }
    const targetDateISO = new Date(chosenDate.date).toISOString();

    // lekérjük az összes személyt + availability-t
    const allPeople = await personService.listAll();

    // kiszűrjük azokat, akiknél van legalább egy egyező dátum
    const availablePeople = allPeople.filter(person => person.availability.some(a => new Date(a.date).toISOString() === targetDateISO));
    res.status(200).json(availablePeople);
  } catch (error) {
    next(error);
  }
};
export default {
  listAll,
  listByDateId
};