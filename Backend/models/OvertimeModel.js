// Overtime table model
// Stores employee overtime records

import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Overtime = db.define("overtime", {

  // Primary key
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  // Employee ID (foreign reference)
  id_pegawai: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Overtime date
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  // Number of overtime hours (1–6)
  hours: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  // Reason for overtime
  reason: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

}, {
  freezeTableName: true,
});

export default Overtime;