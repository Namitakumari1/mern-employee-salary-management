// Controller for handling overtime logic

import Overtime from "../models/OvertimeModel.js";
import DataPegawai from "../models/DataPegawaiModel.js";
import { Op } from "sequelize";

// Create overtime entry
export const createOvertime = async (req, res) => {

  const { id_pegawai, date, hours, reason } = req.body;

  try {

    // Validate required fields
    if (!id_pegawai || !date || !hours || !reason) {
      return res.status(400).json({ msg: "All fields required" });
    }

    // Validate hours range
    if (hours < 1 || hours > 6) {
      return res.status(400).json({ msg: "Hours must be 1-6" });
    }

    const today = new Date();
    const inputDate = new Date(date);

    // Prevent future date entry
    if (inputDate > today) {
      return res.status(400).json({ msg: "Future date not allowed" });
    }

    // Prevent entries older than 7 days
    const diffDays = (today - inputDate) / (1000 * 60 * 60 * 24);
    if (diffDays > 7) {
      return res.status(400).json({ msg: "Too old entry" });
    }

    // Check if employee exists
    const employee = await DataPegawai.findOne({
      where: { id_pegawai }
    });

    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    // Prevent duplicate entry (same employee + same date)
    const existing = await Overtime.findOne({
      where: { id_pegawai, date }
    });

    if (existing) {
      return res.status(400).json({ msg: "Duplicate entry" });
    }

    // Calculate monthly total hours
    const startMonth = new Date(inputDate.getFullYear(), inputDate.getMonth(), 1);
    const endMonth = new Date(inputDate.getFullYear(), inputDate.getMonth() + 1, 0);

    const total = await Overtime.sum("hours", {
      where: {
        id_pegawai,
        date: { [Op.between]: [startMonth, endMonth] }
      }
    });

    // Max 60 hours per month
    if ((total || 0) + hours > 60) {
      return res.status(400).json({ msg: "Monthly limit exceeded" });
    }

    // Save overtime record
    await Overtime.create({
      id_pegawai,
      date,
      hours,
      reason
    });

    return res.status(201).json({
      msg: "Overtime added successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Server error"
    });
  }
};