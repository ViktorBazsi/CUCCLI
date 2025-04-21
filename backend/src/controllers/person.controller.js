import personService from "../services/person.service.js";
import dateService from "../services/date.service.js";
import deleteFile from "../utils/delete.file.js";

const listAll = async (req, res, next) => {
  try {
    const { role } = req.query;

    const filter = role
      ? {
          where: {
            roles: {
              hasSome: role.split(","),
            },
          },
        }
      : {};

    const allPeople = await personService.listAll(filter);
    res.status(200).json(allPeople);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const person = await personService.getById(id);
    if (!person) {
      return res
        .status(404)
        .json({ message: "A megadott alkotó nem található." });
    }
    res.status(200).json(person);
  } catch (error) {
    next(error);
  }
};

const listByDateId = async (req, res, next) => {
  const { dateId } = req.params;

  try {
    // lekérjük az elérhető dátumot
    const chosenDate = await dateService.getById(dateId);
    if (!chosenDate) {
      return res.status(404).json({ message: "Dátum nem található" });
    }

    const targetDateISO = new Date(chosenDate.date).toISOString();

    // lekérjük az összes személyt + availability-t
    const allPeople = await personService.listAll();

    // kiszűrjük azokat, akiknél van legalább egy egyező dátum
    const availablePeople = allPeople.filter((person) =>
      person.availability.some(
        (a) => new Date(a.date).toISOString() === targetDateISO
      )
    );

    res.status(200).json(availablePeople);
  } catch (error) {
    next(error);
  }
};

// const create = async (req, res, next) => {
//   try {
//     const newPerson = await personService.create(req.body);
//     res.status(201).json(newPerson);
//   } catch (error) {
//     next(error);
//   }
// };

const create = async (req, res, next) => {
  try {
    const data = req.body;

    if (req.file) {
      data.imageUrl = `/uploads/pictures/performer/${req.file.filename}`;
    }

    if (typeof data.roles === "string") {
      try {
        data.roles = JSON.parse(data.roles);
      } catch {
        data.roles = data.roles.split(",").map((r) => r.trim());
      }
    }

    // ⬇️ Duplikáció ellenőrzés (név alapján)
    const existing = await personService.findByName(data.name);
    if (existing) {
      return res.status(400).json({ message: "Ez az alkotó már létezik." });
    }

    const newPerson = await personService.create(data);
    res.status(201).json(newPerson);
  } catch (error) {
    next(error);
  }
};

// const update = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const updated = await personService.update(id, req.body);
//     res.status(200).json(updated);
//   } catch (error) {
//     next(error);
//   }
// };

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, bio, roles } = req.body;

  try {
    const parsedRoles = typeof roles === "string" ? JSON.parse(roles) : roles;

    // 🔍 Ellenőrizzük, létezik-e a személy
    const existingPerson = await personService.getById(id);
    if (!existingPerson) {
      return res.status(404).json({ message: "Alkotó nem található" });
    }

    // 🖼️ Ha új fájl érkezik, régit töröljük, újat mentjük
    let imageUrl = existingPerson.imageUrl;
    if (req.file) {
      if (imageUrl) deleteFile(imageUrl);
      imageUrl = req.file.path.replace(/\\/g, "/");
    }

    // 💾 Meghatározott mezők alapján új objektum
    const updateData = {
      name,
      bio,
      roles: parsedRoles,
      imageUrl,
    };

    const updated = await personService.update(id, updateData);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;
  try {
    const person = await personService.getById(id);
    if (!person) {
      return res.status(404).json({ message: "Alkotó nem található" });
    }

    // 🔥 Töröljük a fájlt, ha van
    if (person.imageUrl) {
      deleteFile(person.imageUrl);
    }

    await personService.destroy(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
const addAvailability = async (req, res, next) => {
  const { id } = req.params;
  const { date } = req.body;
  try {
    const added = await personService.addAvailability(id, date);
    res.status(201).json(added);
  } catch (error) {
    next(error);
  }
};

const updateAvailability = async (req, res, next) => {
  const { availabilityId } = req.params;
  const { date } = req.body;
  try {
    const updated = await personService.updateAvailability(
      availabilityId,
      date
    );
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

const removeAvailability = async (req, res, next) => {
  const { availabilityId } = req.params;
  try {
    const deleted = await personService.removeAvailability(availabilityId);
    res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
};

export default {
  listAll,
  getById,
  listByDateId,
  create,
  update,
  destroy,
  addAvailability,
  updateAvailability,
  removeAvailability,
};
