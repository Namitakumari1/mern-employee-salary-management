import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

// Employee table model
const DataPegawai = db.define('data_pegawai', {

    // Unique employee ID (UUID)
    id_pegawai:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true
    },

    // National ID
    nik: {
        type: DataTypes.STRING(16),
        allowNull: false,
        unique: true
    },

    // Login username
    username: {
        type: DataTypes.STRING(120),
        allowNull: false,
        unique: true
    },

    // Hashed password
    password: {
        type: DataTypes.STRING
    },

    // Employee name
    nama_pegawai: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    // Gender
    jenis_kelamin: {
        type: DataTypes.STRING(15),
        allowNull: false
    },

    // Job position
    jabatan: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    // Join date
    tanggal_masuk: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // Employment status
    status: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    // Default profile image
    photo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: "default.jpg"
    },

    // Image URL
    url: {
        type: DataTypes.STRING,
        defaultValue: ""
    },

    // Role (admin / employee)
    hak_akses: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    freezeTableName: true
});


export default DataPegawai;