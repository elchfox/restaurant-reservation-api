const Info = require("../models/Info");
const Reservation = require("../models/Reservation");
const Table = require("../models/Table");

const router = require("express").Router();

//CREATE
router.get("/info", async (req, res) => {
  try {
     await Reservation.deleteMany( { date: { $lt: new Date() } })
    const infoRes = await Info.find({});
    const tableRes = await Table.find({});
    const reservations = await Reservation.aggregate([
      { $match: { date: { $gte: new Date() } } },
      {
        $project: {
          _id: 0,
          date: 1,
          tableSize: 1,
          reservations: 1,
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            day: { $dayOfMonth: "$date" },
          },
          reservations: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateFromParts: {
              year: "$_id.year",
              month: "$_id.month",
              day: "$_id.day",
            },
          },
          tableSize: 1,
          reservations: 1,
        },
      },

      {
        $group: {
          _id: null,
          reservationsByDate: {
            $push: {
              k: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
              v: "$reservations",
            },
          },
        },
      },

      {
        $replaceRoot: {
          newRoot: {
            $arrayToObject: "$reservationsByDate",
          },
        },
      },
    ]);
    const data = {
      details:infoRes.length > 0 ? infoRes[0] : {},
      tables:tableRes,
      reservations: reservations.length > 0 ? reservations[0] : {},
    };
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const data = req.body;
  let date = new Date(data.date.replace(/\d{2}:\d{2}/, data.time));
  let dateEnd = new Date(date.setHours(date.getHours() + 1));
  let findAvailability = await Reservation.aggregate([
    {
      $match: {
        $and: [
          { tableSize: { $gte: data.diners } },
          {
            date: {
              $gte: date,
              $lte: dateEnd,
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: "$tableSize",
        countTable: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "tables",
        localField: "_id",
        foreignField: "tableSize",
        as: "table",
      },
    },
    { $unwind: "$table" },
    {
      $project: {
        availability: { $gt: ["$table.total", "$countTable"] },
      },
    },
  ]);

  try {
    let saveData = {
      ...data,
      tableSize: data.diners,
      date,
    };
    if (
      findAvailability.length === 0 ||
      (findAvailability.length > 0 && findAvailability[0].availability)
    ) {
      const newReservation = new Reservation(saveData);
      const savedReservation = await newReservation.save();
      res.status(200).json(savedReservation);
    } else {
      res.status(200).json({ errorMessage: "not available", error: true });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Reservation.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    res.status(200).json(reservation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
