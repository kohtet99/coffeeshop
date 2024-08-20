const employeeShift = require("../models/employeeShift.model");

exports.create = async (req, res, next) => {
  const { employee_id, shift_date, start_time, end_time } = req.body;

  const newShift = await employeeShift.create({
    employee_id,
    shift_date,
    start_time,
    end_time,
  });

  res.status(200).json({
    newShift,
    success: true,
  });
};

// exports.test = async (req, res) => {
//   //   const id = req.params.id;
//   const shift = await employeeShift
//     .findById("66c311491764267c33e77bff")
//     .populate("employee_id")
//     .exec();

//   res.status(200).json({
//     shift,
//   });
// };

exports.test = async (req, res) => {
  const populate = await employeeShift
    .findOne({ shift_id: 1 })
    .populate("shift");
  // .then((doc) => {
  //   console.log(doc.shift);
  //   res.status(200).json({
  //     shift: doc.shift,
  //   });
  // });

  res.status(200).json({
    populate,
  });
};
