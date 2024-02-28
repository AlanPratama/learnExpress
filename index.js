const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  const qSQL = "SELECT * FROM mahasiswa";
  db.query(qSQL, (err, result) => {
    // const resss = response({  statusCode: 200, message: "SUCCESSFULLY FETCH MAHASISWA DATAS", datas: result, })
    response(200, "SUCCESSFULLY FETCH MAHASISWA DATAS", result, res);
  });
});

app.get("/mahasiswa", (req, res) => {
  const qSQL = "SELECT * FROM mahasiswa";
  db.query(qSQL, (err, result) => {
    // if (err) {
    //     console.error(err);
    //     response(500, err, null, res)
    //     return
    // }
    if (err) throw err;

    response(200, "SUCCESSFULLY GET MAHASISWA DATAS", result, res);
  });
});

app.get("/mahasiswa/:nim", (req, res) => {
  const qSQL = `SELECT * FROM mahasiswa WHERE nim = ${db.escape(
    req.params.nim
  )}`;

  db.query(qSQL, (err, result) => {
    if (err) {
      console.error(err);
      response(500, err, null, res);
      return;
    }
    console.log(result);

    if (result.length > 0) {
      response(
        200,
        `SUCCESSFULLT GET MAHASISWA DATA WHERE NIM IS ${req.params.nim}`,
        result,
        res
      );
    } else {
      response(
        404,
        `CANNOT FIND MAHASISWA DATA WHERE NIM IS ${req.params.nim}`,
        null,
        res
      );
    }
  });
});

app.post("/mahasiswa", (req, res) => {
  const { nim, nama, kelas, alamat } = req.body;
  const qSQL = `INSERT INTO mahasiswa (nim, nama, kelas, alamat) VALUES (${nim}, '${nama}', '${kelas}', '${alamat}')`;
  db.query(qSQL, (err, result) => {
    console.log(result);
    if (err) {
      response(500, err.sqlMessage, null, res);
    } else {
      // res.send('success')
      if (result.affectedRows == 1) {
        response(200, "SUCCESSFULLY ADD NEW MAHASISWA", result, res);
      } else {
        response(500, "ERROR", null, res);
      }
    }
  });
});

app.put('/mahasiswa/:nim', (req, res) => {
    const getNim = `SELECT * FROM mahasiswa WHERE nim = ${db.escape(req.params.nim)}`
    db.query(getNim, (err, mahasiswa) => {
        if (err) {
            response(500, err.sqlMessage, null, res)
        } else {
            const { nim, nama, kelas, alamat } = req.body
            const updateSQL = `UPDATE mahasiswa SET nim = ${nim}, nama = '${nama}', kelas = '${kelas}', alamat = '${alamat}' WHERE nim = ${db.escape(req.params.nim)}`
            db.query(updateSQL, (error, result) => {
                if (error) {
                    response(500, error.sqlMessage, null, res)
                } else {
                    response(200, 'SUCCESSFULLY UPDATED DATA', result, res)
                }

            })
        }
    })
})


app.delete('/mahasiswa/:nim', (req, res) => {
    const qSQL = `DELETE FROM mahasiswa WHERE nim = ${db.escape(req.params.nim)}`
    db.query(qSQL, (err, result) => {
        if (err) {
            response(500, err.sqlMessage, null, res)
        } else {
            response(200, "SUCCESSFULLY DELETE DATA", result, res)
        }
    })
})
























app.get("/find", (req, res) => {
  if (typeof req.query.nim == "undefined" || req.query.nim.length == 0) {
    const qSQL = `SELECT * FROM mahasiswa`;
    const message = "SUCCESSFULLY FETCH MAHASISWA DATAS";
    db.query(qSQL, (err, result) => {
      if (err) {
        console.error(err);
        response(500, err, null, res);
        return;
      }

      response(200, message, result, res);
    });
  } else {
    const qSQL = `SELECT * FROM mahasiswa WHERE nim = ${db.escape(
      req.query.nim
    )}`;
    db.query(qSQL, (err, result) => {
      if (err) {
        console.error(err);
        response(500, err, null, res);
        return;
      }

      if (result.length > 0) {
        const message =
          "SUCCESSFULLY FETCH MAHASISWA DATAS WHERE NIM IS " + req.query.nim;
        response(200, message, result, res);
      } else {
        const message = `CANNOT FIND MAHASISWA WHERE NIM IS ${req.query.nim}`;
        response(404, message, result, res);
      }
    });
  }
});

app.post("/login", (req, res) => {
  if (req.body.username === "lalala") {
    res.send("LOGIN LALA");
  } else {
    res.send("xixixi");
  }
});

app.put("/username", (req, res) => {
  const response = req.body;
  if (response.oldUsername == response.newUsername) {
    res.json({
      status: 500,
      message: "USERNAME NOT CHANGED",
      username: {
        old: response.oldUsername,
        new: response.newUsername,
      },
    });
  } else {
    res.json({
      status: 200,
      message: "USERNAME CHANGED",
      newUsername: response.newUsername,
    });
  }
});

app.listen(port, () => {
  console.log("SERVER IS RUN AT PORT " + port);
});
