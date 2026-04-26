import React, { useState } from "react";
import axios from "axios";

export default function Overtime() {
  const [form, setForm] = useState({
    id_pegawai: "",
    date: "",
    hours: "",
    reason: ""
  });

  // handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/overtime",
        form,
        { withCredentials: true } // IMPORTANT for session
      );

      alert(res.data.msg);

      // reset form after success
      setForm({
        id_pegawai: "",
        date: "",
        hours: "",
        reason: ""
      });

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Overtime Form</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee ID</label><br />
          <input
            type="text"
            name="id_pegawai"
            value={form.id_pegawai}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Date</label><br />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Hours</label><br />
          <input
            type="number"
            name="hours"
            value={form.hours}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Reason</label><br />
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            required
          />
        </div>

        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}