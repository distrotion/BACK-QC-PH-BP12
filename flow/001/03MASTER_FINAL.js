const express = require("express");
const router = express.Router();
var mongodb = require('../../function/mongodb');
var mssql = require('../../function/mssql');
var request = require('request');

let masterDB = "master_FN";
let TYPE = "TYPE";
let UNIT = "UNIT";
let ITEMs = "ITEMs";
let MACHINE = "MACHINE";
let METHOD = "METHOD";
let INSTRUMENTS = "INSTRUMENTS";
let RESULTFORMAT = "RESULTFORMAT";
let SPECIFICATION = "SPECIFICATION";
let TOLERANCE = "TOLERANCE";
let GRAPHTYPE = "GRAPHTYPE";
let CALCULATE = "CALCULATE";
let COMMENT = "COMMENT";

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

router.get('/FINALMASTER', async (req, res) => {
  return res.json("READY");
});

router.post('/GET_TYPE_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--GET_TYPE_FINAL--");
  input = req.body;
  output = [];
  //-------------------------------------
  let find = await mongodb.find(masterDB, TYPE, { "activeid": "active_id" });
  if (find.length > 0) {
    output = find;
  }
  return res.json(output);
});

router.post('/DROP_TYPE_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--DROP_TYPE_FINAL--");
  input = req.body;
  output = "NOK";
  console.log(req.body);
  //-------------------------------------
  if (input.masterID != undefined) {
    let DROPTYPE = await mongodb.update(masterDB, TYPE, { 'masterID': input.masterID }, { "$set": { "activeid": "no_active_id" } });
    output = "OK";
  }

  return res.json(output);
});

router.post('/GET_UNIT_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--GET_UNIT_FINAL--");
  input = req.body;
  output = [];
  //-------------------------------------
  let findTYPE = await mongodb.find(masterDB, TYPE, {});
  let findUNIT = await mongodb.find(masterDB, UNIT, { "activeid": "active_id" });


  if (findUNIT.length > 0) {
    //
    for (i = 0; i < findUNIT.length; i++) {
      for (j = 0; j < findTYPE.length; j++) {
        if (findUNIT[i][`TYPE`] === findTYPE[j][`masterID`]) {
          findUNIT[i][`TYPEname`] = findTYPE[j][`TYPE`]
          break;
        }
      }
    }
    //
    output = findUNIT;
  }
  return res.json(output);
});

router.post('/DROP_UNIT_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--DROP_UNIT_FINAL--");
  input = req.body;
  output = "NOK";
  //-------------------------------------
  if (input.masterID != undefined) {
    let DROPUNIT = await mongodb.update(masterDB, UNIT, { 'masterID': input.masterID }, { "$set": { "activeid": "no_active_id" } });
    output = "OK";
  }

  return res.json(output);
});

router.post('/GET_ITEMSget_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--GET_ITEMSget_FINAL--");
  input = req.body;
  output = [];
  //-------------------------------------
  let findTYPE = await mongodb.find(masterDB, TYPE, {});
  let findITEMs = await mongodb.find(masterDB, ITEMs, { "activeid": "active_id" });
  let findCALCULATE = await mongodb.find(masterDB, CALCULATE, { "activeid": "active_id" });


  if (findITEMs.length > 0) {
    //
    for (i = 0; i < findITEMs.length; i++) {
      for (j = 0; j < findTYPE.length; j++) {
        if (findITEMs[i][`TYPE`] === findTYPE[j][`masterID`]) {
          findITEMs[i][`TYPEname`] = findTYPE[j][`TYPE`]
          break;
        }
      }
    }
    for (i = 0; i < findITEMs.length; i++) {
      for (j = 0; j < findCALCULATE.length; j++) {
        if (findITEMs[i][`CALCULATE`] === findCALCULATE[j][`masterID`]) {
          findITEMs[i][`CALCULATEname`] = findCALCULATE[j][`CALCULATE`]
          break;
        }
      }
    }
    //
    output = findITEMs;
  }
 
  return res.json(output);
});



router.post('/DROP_ITEMS_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--DROP_ITEMS_FINAL--");
  input = req.body;
  output = "NOK";
  //-------------------------------------
  if (input.masterID != undefined) {
    let DROPUNIT = await mongodb.update(masterDB, ITEMs, { 'masterID': input.masterID }, { "$set": { "activeid": "no_active_id" } });
    output = "OK";
  }

  return res.json(output);
});

router.post('/GET_MACHINENAMEget_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--GET_MACHINENAMEget_FINAL--");
  input = req.body;
  output = [];
  //-------------------------------------
  let findMACHINE = await mongodb.find(masterDB, MACHINE, { "activeid": "active_id" });


  if (findMACHINE.length > 0) {
    //

    //
    output = findMACHINE;
  }
  return res.json(output);
});

router.post('/DROP_MACHINENAME_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--DROP_MACHINENAME_FINAL--");
  input = req.body;
  output = "NOK";
  //-------------------------------------
  if (input.masterID != undefined) {
    let DROPUNIT = await mongodb.update(masterDB, MACHINE, { 'masterID': input.masterID }, { "$set": { "activeid": "no_active_id" } });
    output = "OK";
  }

  return res.json(output);
});

router.post('/GET_METHODEget_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--GET_METHODEget_FINAL--");
  input = req.body;
  output = [];
  //-------------------------------------
  let findTYPE = await mongodb.find(masterDB, TYPE, {});
  let findITEMs = await mongodb.find(masterDB, ITEMs, {});
  let findMACHINE = await mongodb.find(masterDB, MACHINE, {});
  let findMETHOD = await mongodb.find(masterDB, METHOD, { "activeid": "active_id" });


  if (findMETHOD.length > 0) {
    //
    for (i = 0; i < findMETHOD.length; i++) {
      for (j = 0; j < findITEMs.length; j++) {
        if (findMETHOD[i][`ITEMs`] === findITEMs[j][`masterID`]) {
          findMETHOD[i][`ITEMsname`] = findITEMs[j][`ITEMs`]
          break;
        }
      }
      for (k = 0; k < findMACHINE.length; k++) {
        if (findMETHOD[i][`METHOD`] === findMACHINE[k][`masterID`]) {
          findMETHOD[i][`METHODname`] = findMACHINE[k][`METHOD`]
          break;
        }
      }
    }
    //
    output = findMETHOD;
  }
  return res.json(output);
});

router.post('/DROP_METHODE_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--DROP_METHODE_FINAL--");
  input = req.body;
  output = "NOK";
  //-------------------------------------
  if (input.masterID != undefined) {
    let DROPUNIT = await mongodb.update(masterDB, METHOD, { 'masterID': input.masterID }, { "$set": { "activeid": "no_active_id" } });
    output = "OK";
  }

  return res.json(output);
});

router.post('/GET_SPECIALSPECget_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--GET_SPECIALSPECget_FINAL--");
  input = req.body;
  output = [];
  //-------------------------------------

  let findITEMs = await mongodb.find(masterDB, ITEMs, {});
  let findSPECIALSPEC = await mongodb.find(masterDB, SPECIFICATION, { "activeid": "active_id" });

  if (findSPECIALSPEC.length > 0) {
    //
    for (i = 0; i < findSPECIALSPEC.length; i++) {
      for (j = 0; j < findITEMs.length; j++) {
        if (findSPECIALSPEC[i][`ITEMs`] === findITEMs[j][`masterID`] || '') {
          findSPECIALSPEC[i][`ITEMsname`] = findITEMs[j][`ITEMs`]
          break;
        }
      }
    }
    //
    output = findSPECIALSPEC;
  }
  return res.json(output);
});

router.post('/DROP_SPECIFICATION_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--DROP_SPECIFICATION_FINAL--");
  input = req.body;
  output = "NOK";
  //-------------------------------------
  if (input.masterID != undefined) {
    let DROPUNIT = await mongodb.update(masterDB, SPECIFICATION, { 'masterID': input.masterID }, { "$set": { "activeid": "no_active_id" } });
    output = "OK";
  }

  return res.json(output);
});

//CALCULATE

router.post('/GET_CALCULATEget_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--GET_CALCULATEget_FINAL--");
  input = req.body;
  output = [];
  //-------------------------------------

  let findSPECIALSPEC = await mongodb.find(masterDB, CALCULATE, { "activeid": "active_id" });

  // if (findSPECIALSPEC.length > 0) {
  //   //
  //   for (i = 0; i < findSPECIALSPEC.length; i++) {
  //     for (j = 0; j < findITEMs.length; j++) {
  //       if (findSPECIALSPEC[i][`ITEMs`] === findITEMs[j][`masterID`] || '') {
  //         findSPECIALSPEC[i][`ITEMsname`] = findITEMs[j][`ITEMs`]
  //         break;
  //       }
  //     }
  //   }
    //
    output = findSPECIALSPEC;
  // }
  return res.json(output);
});

router.post('/DROP_CALCULATE_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--DROP_CALCULATE_FINAL--");
  input = req.body;
  output = "NOK";
  //-------------------------------------
  if (input.masterID != undefined) {
    let DROPUNIT = await mongodb.update(masterDB, CALCULATE, { 'masterID': input.masterID }, { "$set": { "activeid": "no_active_id" } });
    output = "OK";
  }

  return res.json(output);
});

router.post('/GET_COMMENT_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--GET_COMMENT_FINAL--");
  input = req.body;
  output = [];
  //-------------------------------------
  let find = await mongodb.find(masterDB, COMMENT, { "activeid": "active_id" });
  if (find.length > 0) {
    output = find;
  }
  return res.json(output);
});

router.post('/DROP_COMMENT_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--DROP_COMMENT_FINAL--");
  input = req.body;
  output = "NOK";
  console.log(req.body);
  //-------------------------------------
  if (input.masterID != undefined) {
    let DROPTYPE = await mongodb.update(masterDB, COMMENT, { 'masterID': input.masterID }, { "$set": { "activeid": "no_active_id" } });
    output = "OK";
  }

  return res.json(output);
});

router.post('/DROPDOWN_MASTER_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--DROPDOWN_TYPE_FINAL--");
  input = req.body;
  output1 = [];
  output2 = [];
  output3 = [];
  output4 = [];
  output5 = [];
  output6 = [];
  output7 = [];
  output8 = [];
  //-------------------------------------
  let find1 = await mongodb.find(masterDB, TYPE, { "activeid": "active_id" });

  if (find1.length > 0) {
    for (i = 0; i < find1.length; i++) {
      output1.push({ "TYPE": find1[i]['TYPE'], "masterID": find1[i]['masterID'] })
    }
  }

  let find2 = await mongodb.find(masterDB, ITEMs, { "activeid": "active_id" });
  if (find2.length > 0) {
    for (i = 0; i < find2.length; i++) {
      output2.push({ "ITEMs": find2[i]['ITEMs'], "masterID": find2[i]['masterID'] })
    }
  }

  let find3 = await mongodb.find(masterDB, MACHINE, { "activeid": "active_id" });
  if (find3.length > 0) {
    for (i = 0; i < find3.length; i++) {
      output3.push({ "METHOD": find3[i]['METHOD'], "masterID": find3[i]['masterID'] })
    }
  }

  let find4 = await mongodb.find(masterDB, RESULTFORMAT, {});
  if (find4.length > 0) {
    for (i = 0; i < find4.length; i++) {
      output4.push({ "RESULTFORMAT": find4[i]['value'] })
    }
  }
  let find5 = await mongodb.find(masterDB, GRAPHTYPE, {});
  if (find5.length > 0) {
    for (i = 0; i < find5.length; i++) {
      output5.push({ "GRAPHTYPE": find5[i]['value'] })
    }
  }
  let find6 = await mongodb.find(masterDB, INSTRUMENTS, {});
  if (find6.length > 0) {
    for (i = 0; i < find6.length; i++) {
      output6.push({ "INSTRUMENTS": find6[i]['value'] })
    }
  }
  let find7 = await mongodb.find(masterDB, CALCULATE, {"activeid": "active_id"});
  if (find7.length > 0) {
    for (i = 0; i < find7.length; i++) {
      output7.push({ "CALCULATE": find7[i]['CALCULATE'], "masterID": find7[i]['masterID']  })
    }
  }

  let find8 = await mongodb.find(masterDB, UNIT, {"activeid": "active_id"});
  if (find8.length > 0) {
    for (i = 0; i < find8.length; i++) {
      output8.push({ "UNIT": find8[i]['UNIT'], "masterID": find8[i]['masterID']  })
    }
  }
  return res.json({ "TYPE": output1, "ITEMS": output2, "METHOD": output3, "RESULTFORMAT": output4, "GRAPHTYPE": output5, "INSTRUMENTS": output6, "CALCULATE": output7 , "UNIT": output8 });
});
//---------------------------------------EDIT---------------------------------------

router.post('/EDIT_TYPE_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--EDIT_TYPE_FINAL--");
  input = req.body;
  output = "NOK";
  //-------------------------------------
  if (input.masterID !== undefined) {

    if (input.masterID === '') {
      delete input.masterID
      console.log(input)
      let find02 = await mongodb.find(masterDB, TYPE, { "TYPE": input[`TYPE`], "activeid": "active_id" });
      // let find02 = await mongodb.find(masterDB, TYPE, { $or: [{ "TYPE":input[`TYPE`] }, { "activeid":"active_id"} ] });
      if (find02.length > 0) {
        output = "HAVEONE";
      } else {
        input[`activeid`] = 'active_id';
        input[`masterID`] = `TYPE-${Date.now()}${makeid(15)}`
        let insert01 = await mongodb.insertMany(masterDB, TYPE, [input]);
        output = "OK";
      }
    } else {
      let find01 = await mongodb.find(masterDB, TYPE, { "masterID": input[`masterID`] });

      if (find01.length > 0) {
        let uid = input.masterID;
        delete input.masterID;
        input[`activeid`] = 'active_id';
        let find02 = await mongodb.find(masterDB, TYPE, { "TYPE": input[`TYPE`], "activeid": "active_id" });
        // let find02 = await mongodb.find(masterDB, TYPE, { $or: [{ "TYPE":input[`TYPE`] }, { "activeid":"active_id"} ] });
        if (find02.length > 0) {
          output = "HAVEONE";
        } else {
          let update01 = await mongodb.update(masterDB, TYPE, { 'masterID': uid }, { "$set": input });
          output = "OK";
        }

      } else {

      }
    }

  } else {

  }


  return res.json(output);
});

router.post('/EDIT_UNIT_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--EDIT_UNIT_FINAL--");
  input = req.body;
  output = "NOK";
  //-------------------------------------
  if (input.masterID !== undefined) {

    if (input.masterID === '') {
      delete input.masterID
      let find02 = await mongodb.find(masterDB, UNIT, { "UNIT": input[`UNIT`], "activeid": "active_id" });
      // let find02 = await mongodb.find(masterDB, UNIT, { $or: [ { "UNIT":input[`UNIT`],"activeid":"active_id" }, { "TYPE":input[`TYPE`],"activeid":"active_id" }, ] });
      if (find02.length > 0) {
        output = "HAVEONE";
      } else {
        input[`activeid`] = 'active_id';
        input[`masterID`] = `UNIT-${Date.now()}${makeid(15)}`
        let insert01 = await mongodb.insertMany(masterDB, UNIT, [input]);
        output = "OK";
      }
    } else {
      let find01 = await mongodb.find(masterDB, UNIT, { "masterID": input[`masterID`] });

      if (find01.length > 0) {
        let uid = input.masterID;
        delete input.masterID;
        input[`activeid`] = 'active_id';
        let find02 = await mongodb.find(masterDB, UNIT, { "UNIT": input[`UNIT`], "activeid": "active_id" });
        // let find02 = await mongodb.find(masterDB, UNIT, { $or: [ { "UNIT":input[`UNIT`],"TYPE":input[`TYPE`] ,"activeid":"active_id" }, { "UNIT":input[`UNIT`],"TYPE":input[`TYPE`] ,"activeid":"active_id"}] });
        if (find02.length > 0) {
          let update01 = await mongodb.update(masterDB, UNIT, { 'masterID': uid }, { "$set": { "TYPE": input[`TYPE`], "DESIMAL": input[`DESIMAL`] } });
          output = "OK";
        } else {
          console.log(input);
          let update01 = await mongodb.update(masterDB, UNIT, { 'masterID': uid }, { "$set": input });
          output = "OK";
        }

      } else {

      }
    }

  } else {

  }

  return res.json(output);
});

router.post('/EDIT_ITEMS_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--EDIT_ITEMS_FINAL--");
  input = req.body;
  output = "NOK";
  //-------------------------------------
  if (input.masterID !== undefined) {

    if (input.masterID === '') {
      delete input.masterID
      let find02 = await mongodb.find(masterDB, ITEMs, { "ITEMs": input[`ITEMs`], "activeid": "active_id" });
      // let find02 = await mongodb.find(masterDB, ITEMs, { $or: [ { "ITEMs":input[`ITEMs`],"activeid":"active_id" }, { "TYPE":input[`TYPE`],"activeid":"active_id" }, ] });
      if (find02.length > 0) {
        output = "HAVEONE";
      } else {
        input[`activeid`] = 'active_id';
        input[`masterID`] = `ITEMs-${Date.now()}${makeid(15)}`
        let insert01 = await mongodb.insertMany(masterDB, ITEMs, [input]);
        output = "OK";
      }
    } else {
      let find01 = await mongodb.find(masterDB, ITEMs, { "masterID": input[`masterID`] });

      if (find01.length > 0) {
        let uid = input.masterID;
        delete input.masterID;
        input[`activeid`] = 'active_id';
        let find02 = await mongodb.find(masterDB, ITEMs, { "ITEMs": input[`ITEMs`], "activeid": "active_id" });
        // let find02 = await mongodb.find(masterDB, ITEMs, { $or: [ { "ITEMs":input[`ITEMs`],"TYPE":input[`TYPE`] ,"activeid":"active_id" }, { "ITEMs":input[`ITEMs`],"TYPE":input[`TYPE`] ,"activeid":"active_id"}] });
        if (find02.length > 0) {
          let update01 = await mongodb.update(masterDB, ITEMs, { 'masterID': uid }, { "$set": { "RESULTFORMAT": input[`RESULTFORMAT`], "GRAPHTYPE": input[`GRAPHTYPE`], "INTERSECTION": input[`GRAPHINTERSECTION`], "CALCULATE": input[`CALCULATE`] } });
          output = "OK";
        } else {
          console.log(input);
          let update01 = await mongodb.update(masterDB, ITEMs, { 'masterID': uid }, { "$set": input });
          output = "OK";
        }

      } else {

      }
    }

  } else {

  }


  return res.json(output);
});

router.post('/EDIT_MACHINENAME_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--EDIT_MACHINENAME_FINAL--");
  input = req.body;
  output = "NOK";
  console.log(input);
  //-------------------------------------
  if (input.masterID !== undefined) {

    if (input.masterID === '') {
      delete input.masterID
      let find02 = await mongodb.find(masterDB, MACHINE, { "METHOD": input[`METHOD`], "activeid": "active_id" });
      // let find02 = await mongodb.find(masterDB, METHOD, { $or: [ { "METHOD":input[`METHOD`],"activeid":"active_id" }, { "TYPE":input[`TYPE`],"activeid":"active_id" }, ] });
      if (find02.length > 0) {
        output = "HAVEONE";
      } else {
        input[`activeid`] = 'active_id';
        input[`masterID`] = `MACHINE-${Date.now()}${makeid(15)}`
        let insert01 = await mongodb.insertMany(masterDB, MACHINE, [input]);
        output = "OK";
      }
    } else {
      let find01 = await mongodb.find(masterDB, MACHINE, { "masterID": input[`masterID`] });

      if (find01.length > 0) {
        let uid = input.masterID;
        delete input.masterID;
        input[`activeid`] = 'active_id';
        let find02 = await mongodb.find(masterDB, MACHINE, { "METHOD": input[`METHOD`], "activeid": "active_id" });
        // let find02 = await mongodb.find(masterDB, MACHINE, { $or: [ { "METHOD":input[`METHOD`],"TYPE":input[`TYPE`] ,"activeid":"active_id" }, { "METHOD":input[`METHOD`],"TYPE":input[`TYPE`] ,"activeid":"active_id"}] });
        if (find02.length > 0) {
          let update01 = await mongodb.update(masterDB, MACHINE, { 'masterID': uid }, { "$set": { "DESIMAL": input[`DESIMAL`], "MACHINE": input[`MACHINE`] } });
          output = "OK";
        } else {
          console.log(input);
          let update01 = await mongodb.update(masterDB, MACHINE, { 'masterID': uid }, { "$set": input });
          output = "OK";
        }

      } else {

      }
    }

  } else {

  }


  return res.json(output);
});

router.post('/EDIT_METHODE_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--EDIT_METHODE_FINAL--");
  input = req.body;
  output = "NOK";
  //-------------------------------------
  if (input.masterID !== undefined) {

    if (input.masterID === '') {
      delete input.masterID
      input[`activeid`] = 'active_id';
      input[`masterID`] = `METHODE-${Date.now()}${makeid(15)}`
      let insert01 = await mongodb.insertMany(masterDB, METHOD, [input]);
      output = "OK";

    } else {
      let find01 = await mongodb.find(masterDB, METHOD, { "masterID": input[`masterID`] });

      if (find01.length > 0) {
        let uid = input.masterID;
        delete input.masterID;
        input[`activeid`] = 'active_id';
        // let find02 = await mongodb.find(masterDB, METHOD, { $or: [ { "UNIT":input[`UNIT`],"TYPE":input[`TYPE`] ,"activeid":"active_id" }, { "UNIT":input[`UNIT`],"TYPE":input[`TYPE`] ,"activeid":"active_id"}] });
        console.log(input);
        let update01 = await mongodb.update(masterDB, METHOD, { 'masterID': uid }, { "$set": input });
        output = "OK";
      } else {
      }
    }

  } else {

  }


  return res.json(output);
});

router.post('/EDIT_SPECIFICATION_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--EDIT_SPECIFICATION_FINAL--");
  input = req.body;
  output = "NOK";
  console.log(input);
  //-------------------------------------
  if (input.masterID !== undefined) {

    if (input.masterID === '') {
      delete input.masterID
      let find02 = await mongodb.find(masterDB, SPECIFICATION, { "SPECIFICATION": input[`SPECIFICATION`], "activeid": "active_id" });
      // let find02 = await mongodb.find(masterDB, SPECIFICATION, { $or: [ { "UNIT":input[`UNIT`],"activeid":"active_id" }, { "TYPE":input[`TYPE`],"activeid":"active_id" }, ] });
      if (find02.length > 0) {
        output = "HAVEONE";
      } else {
        input[`activeid`] = 'active_id';
        input[`masterID`] = `SPECIFICATION-${Date.now()}${makeid(15)}`
        let insert01 = await mongodb.insertMany(masterDB, SPECIFICATION, [input]);
        output = "OK";
      }
    } else {
      let find01 = await mongodb.find(masterDB, SPECIFICATION, { "masterID": input[`masterID`] });

      if (find01.length > 0) {
        let uid = input.masterID;
        delete input.masterID;
        input[`activeid`] = 'active_id';
        let find02 = await mongodb.find(masterDB, SPECIFICATION, { "SPECIFICATION": input[`SPECIFICATION`], "activeid": "active_id" });
        // let find02 = await mongodb.find(masterDB, SPECIFICATION, { $or: [ { "SPECIFICATION":input[`SPECIFICATION`],"TYPE":input[`TYPE`] ,"activeid":"active_id" }, { "UNIT":input[`UNIT`],"TYPE":input[`TYPE`] ,"activeid":"active_id"}] });
        if (find02.length > 0) {
          let update01 = await mongodb.update(masterDB, SPECIFICATION, { 'masterID': uid }, { "$set": { "ITEMs": input[`ITEMs`],"SPECIFICATION": input[`SPECIFICATION`]} });
          output = "OK";
        } else {
          console.log(input);
          let update01 = await mongodb.update(masterDB, SPECIFICATION, { 'masterID': uid }, { "$set": input });
          output = "OK";
        }

      } else {

      }
    }

  } else {

  }


  return res.json(output);
});

router.post('/EDIT_CALCULATE_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--EDIT_CALCULATE_FINAL--");
  input = req.body;
  output = "NOK";
  //-------------------------------------
  if (input.masterID !== undefined) {

    if (input.masterID === '') {
      let find02 = await mongodb.find(masterDB, CALCULATE, { "CALCULATE": input[`CALCULATE`], "activeid": "active_id" });

      if(find02.length>0){
        output = "HAVEONE";
      }else{
        delete input.masterID
        input[`activeid`] = 'active_id';
        input[`masterID`] = `CALCULATE-${Date.now()}${makeid(15)}`
        let insert01 = await mongodb.insertMany(masterDB, CALCULATE, [input]);
        output = "OK";
      }
      

    } else {
      let find01 = await mongodb.find(masterDB, CALCULATE, { "masterID": input[`masterID`] });

      if (find01.length > 0) {
        let uid = input.masterID;
        delete input.masterID;
        input[`activeid`] = 'active_id';
        let find02 = await mongodb.find(masterDB, CALCULATE, { "CALCULATE": input[`CALCULATE`], "activeid": "active_id" });
        // let find02 = await mongodb.find(masterDB, CALCULATE, { $or: [{ "CALCULATE":input[`CALCULATE`] }, { "activeid":"active_id"} ] });
        if (find02.length > 0) {
          delete input[`CALCULATE`];
          let update01 = await mongodb.update(masterDB, CALCULATE, { 'masterID': uid }, { "$set": input });
          output = "OK";
        } else {
          let update01 = await mongodb.update(masterDB, CALCULATE, { 'masterID': uid }, { "$set": input });
          output = "OK";
        }

      } else {

      }
    }

  } else {

  }


  return res.json(output);
});


router.post('/EDIT_COMMENT_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--EDIT_COMMENT_FINAL--");
  input = req.body;
  output = "NOK";
  //-------------------------------------
  if (input.masterID !== undefined) {

    if (input.masterID === '') {
      delete input.masterID
      console.log(input)
      let find02 = await mongodb.find(masterDB, COMMENT, { "COMMENT": input[`COMMENT`], "activeid": "active_id" });
      // let find02 = await mongodb.find(masterDB, COMMENT, { $or: [{ "COMMENT":input[`COMMENT`] }, { "activeid":"active_id"} ] });
      if (find02.length > 0) {
        output = "HAVEONE";
      } else {
        input[`activeid`] = 'active_id';
        input[`masterID`] = `COMMENT-${Date.now()}${makeid(15)}`
        let insert01 = await mongodb.insertMany(masterDB, COMMENT, [input]);
        output = "OK";
      }
    } else {
      let find01 = await mongodb.find(masterDB, COMMENT, { "masterID": input[`masterID`] });

      if (find01.length > 0) {
        let uid = input.masterID;
        delete input.masterID;
        input[`activeid`] = 'active_id';
        let find02 = await mongodb.find(masterDB, COMMENT, { "COMMENT": input[`COMMENT`], "activeid": "active_id" });
        // let find02 = await mongodb.find(masterDB, COMMENT, { $or: [{ "COMMENT":input[`COMMENT`] }, { "activeid":"active_id"} ] });
        if (find02.length > 0) {
          output = "HAVEONE";
        } else {
          let update01 = await mongodb.update(masterDB, COMMENT, { 'masterID': uid }, { "$set": input });
          output = "OK";
        }

      } else {

      }
    }

  } else {

  }


  return res.json(output);
});


router.post('/GET_UNIT_ITEM', async (req, res) => {
  //-------------------------------------
  console.log("--GET_UNIT_ITEM--");
  input = req.body;
  output = [];

  //-------------------------------------
  if (input['ITEMs'] !== undefined) {

    let findITEMs = await mongodb.find(masterDB, ITEMs, { "activeid": "active_id" , "masterID": input[`ITEMs`] });
    //UNIT
    
   if(findITEMs.length>0){
    let findUNIT = await mongodb.find(masterDB, UNIT, { "activeid": "active_id" , "TYPE": findITEMs[0]['TYPE'] });
    // console.log(findUNIT)
    output = findUNIT;
    
   }

  } else {

  }


  return res.json(output);
});


router.post('/EDIT_DESIMAL_FINAL', async (req, res) => {
  //-------------------------------------
  console.log("--EDIT_DESIMAL_FINAL--");
  input = req.body;
  output = "NOK";
  //-------------------------------------
  if (input.masterID !== undefined) {

    if (input.masterID === '') {
      delete input.masterID
      let find02 = await mongodb.find(masterDB, ITEMs, { "ITEMs": input[`ITEMs`], "activeid": "active_id" });
      // let find02 = await mongodb.find(masterDB, ITEMs, { $or: [ { "ITEMs":input[`ITEMs`],"activeid":"active_id" }, { "TYPE":input[`TYPE`],"activeid":"active_id" }, ] });
      if (find02.length > 0) {
        output = "HAVEONE";
      } else {
        input[`activeid`] = 'active_id';
        input[`masterID`] = `ITEMs-${Date.now()}${makeid(15)}`
        let insert01 = await mongodb.insertMany(masterDB, ITEMs, [input]);
        output = "OK";
      }
    } else {
      let find01 = await mongodb.find(masterDB, ITEMs, { "masterID": input[`masterID`] });

      if (find01.length > 0) {
        let uid = input.masterID;
        delete input.masterID;
        input[`activeid`] = 'active_id';
        let find02 = await mongodb.find(masterDB, ITEMs, { "ITEMs": input[`ITEMs`], "activeid": "active_id" });
        // let find02 = await mongodb.find(masterDB, ITEMs, { $or: [ { "ITEMs":input[`ITEMs`],"TYPE":input[`TYPE`] ,"activeid":"active_id" }, { "ITEMs":input[`ITEMs`],"TYPE":input[`TYPE`] ,"activeid":"active_id"}] });
        if (find02.length > 0) {
          let update01 = await mongodb.update(masterDB, ITEMs, { 'masterID': uid }, { "$set": { "RESULTFORMAT": input[`RESULTFORMAT`], "GRAPHTYPE": input[`GRAPHTYPE`], "INTERSECTION": input[`GRAPHINTERSECTION`], "CALCULATE": input[`CALCULATE`] } });
          output = "OK";
        } else {
          console.log(input);
          let update01 = await mongodb.update(masterDB, ITEMs, { 'masterID': uid }, { "$set": input });
          output = "OK";
        }

      } else {

      }
    }

  } else {

  }


  return res.json(output);
});


module.exports = router;
