import DataPegawai from "../models/DataPegawaiModel.js";
import argon2 from "argon2";
import path from "path";

// menampilkan semua data Pegawai
export const getDataPegawai = async (req, res) => {
    try {
        const response = await DataPegawai.findAll({
            attributes: [
                'id', 'id_pegawai', 'nik', 'nama_pegawai',
                'jenis_kelamin', 'jabatan', 'tanggal_masuk',
                'status', 'photo', 'hak_akses'
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// method untuk mencari data Pegawai berdasarkan ID
export const getDataPegawaiByID = async (req, res) => {
    try {
        const response = await DataPegawai.findOne({
            attributes: [
                'id', 'nik', 'nama_pegawai',
                'jenis_kelamin', 'jabatan', 'username', 'tanggal_masuk',
                'status', 'photo', 'hak_akses'
            ],
            where: {
                id: req.params.id
            }
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: 'Data pegawai dengan ID tersebut tidak ditemukan' })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// method untuk mencari data pegawai berdasarkan NIK
export const getDataPegawaiByNik = async (req, res) => {
    try {
        const response = await DataPegawai.findOne({
            attributes: [
                'id', 'nik', 'nama_pegawai',
                'jenis_kelamin', 'jabatan', 'tanggal_masuk',
                'status', 'photo', 'hak_akses'
            ],
            where: {
                nik: req.params.nik
            }
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: 'Data pegawai dengan NIK tersebut tidak ditemukan' })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


// method untuk mencari data pegawai berdasarkan Nama
export const getDataPegawaiByName = async (req, res) => {
    try {
        const response = await DataPegawai.findOne({
            attributes: [
                'id', 'nik', 'nama_pegawai',
                'jenis_kelamin', 'jabatan', 'tanggal_masuk',
                'status', 'photo', 'hak_akses'
            ],
            where: {
                nama_pegawai: req.params.name
            }
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: 'Data pegawai dengan Nama tersebut tidak ditemukan' })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Create new employee (simplified version without file upload)
export const createDataPegawai = async (req, res) => {
    const {
        nik, nama_pegawai,
        username, password, confPassword,
        jenis_kelamin, jabatan,
        tanggal_masuk, status, hak_akses
    } = req.body;

    // Validate password match
    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password dan Konfirmasi Password Tidak Cocok" });
    }

    try {
        // Hash password before saving
        const hashPassword = await argon2.hash(password);

        // Create new employee record
        await DataPegawai.create({
            nik,
            nama_pegawai,
            username,
            password: hashPassword,
            jenis_kelamin,
            jabatan,
            tanggal_masuk,
            status,
            photo: "default.jpg", // default image
            url: "",
            hak_akses
        });

        res.status(201).json({ msg: "Registrasi Berhasil" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message });
    }
};


// method untuk update data Pegawai
export const updateDataPegawai = async (req, res) => {
    const pegawai = await DataPegawai.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!pegawai) return res.staus(404).json({ msg: "Data pegawai tidak ditemukan" });
    const {
        nik, nama_pegawai,
        username, jenis_kelamin,
        jabatan, tanggal_masuk,
        status, hak_akses
    } = req.body;

    try {
        await DataPegawai.update({
            nik: nik,
            nama_pegawai: nama_pegawai,
            username: username,
            jenis_kelamin: jenis_kelamin,
            jabatan: jabatan,
            tanggal_masuk: tanggal_masuk,
            status: status,
            hak_akses: hak_akses
        }, {
            where: {
                id: pegawai.id
            }
        });
        res.status(200).json({ msg: "Data Pegawai Berhasil di Perbarui" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Method untuk update password Pegawai
export const changePasswordAdmin = async (req, res) => {
    const pegawai = await DataPegawai.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!pegawai) return res.status(404).json({ msg: "Data pegawai tidak ditemukan" });


    const { password, confPassword } = req.body;

    if (password !== confPassword) return res.status(400).json({ msg: "Password dan Konfirmasi Password Tidak Cocok" });

    try {
        if (pegawai.hak_akses === "pegawai") {
            const hashPassword = await argon2.hash(password);

            await DataPegawai.update(
                {
                    password: hashPassword
                },
                {
                    where: {
                        id: pegawai.id
                    }
                }
            );

            res.status(200).json({ msg: "Password Pegawai Berhasil di Perbarui" });
        } else {
            res.status(403).json({ msg: "Forbidden" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


// method untuk delete data Pegawai
export const deleteDataPegawai = async (req, res) => {
    const pegawai = await DataPegawai.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!pegawai) return res.status(404).json({ msg: "Data Pegawai tidak ditemukan" });
    try {
        await DataPegawai.destroy({
            where: {
                id: pegawai.id
            }
        });
        res.status(200).json({ msg: "Data Pegawai Berhasil di Hapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}