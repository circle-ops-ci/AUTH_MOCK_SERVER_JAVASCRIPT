// Copyright (c) 2018-2020 The CYBAVO developers
// All Rights Reserved.
// NOTICE: All information contained herein is, and remains
// the property of CYBAVO and its suppliers,
// if any. The intellectual and technical concepts contained
// herein are proprietary to CYBAVO
// Dissemination of this information or reproduction of this materia
// is strictly forbidden unless prior written permission is obtained
// from CYBAVO.

const express = require('express');
const api = require('../helper/apicaller');
const cfg = require('../models/config');
const crypto = require('crypto');
const router = express.Router();

function getQueryParams(query) {
  return Object.keys(query).map((key) => {
    return `${key}=${query[key]}`;
  }); 
}

router.post('/users', async function(req, res) {
  const apires = await api.makeRequest("POST", '/v1/api/users',
    null, JSON.stringify(req.body));
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.post('/devices', async function(req, res) {
  const apires = await api.makeRequest("POST", '/v1/api/devices',
    getQueryParams(req.query), null);
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.post('/users/pin', async function(req, res) {
  const apires = await api.makeRequest("POST", '/v1/api/users/pin',
    getQueryParams(req.query), null);
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.get('/devices', async function(req, res) {
  const apires = await api.makeRequest("GET", '/v1/api/devices',
    getQueryParams(req.query), null);
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.delete('/devices', async function(req, res) {
  const apires = await api.makeRequest("DELETE", '/v1/api/devices',
    getQueryParams(req.query), JSON.stringify(req.body));
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.post('/devices/2fa', async function(req, res) {
  const apires = await api.makeRequest("POST", '/v1/api/devices/2fa',
    getQueryParams(req.query), JSON.stringify(req.body));
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.get('/users/2fa', async function(req, res) {
  const apires = await api.makeRequest("GET", '/v1/api/users/2fa',
    getQueryParams(req.query), null);
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.delete('/users/2fa/:token', async function(req, res) {
  const apires = await api.makeRequest("DELETE", `/v1/api/users/2fa/${req.params.token}`,
    getQueryParams(req.query), null);
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.get('/users/me', async function(req, res) {
  const apires = await api.makeRequest("GET", '/v1/api/users/me',
    getQueryParams(req.query), null);
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.post('/order/status', async function(req, res) {
  const apires = await api.makeRequest("POST", '/v1/api/order/status',
    getQueryParams(req.query), JSON.stringify(req.body));
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.post('/users/emailotp', async function(req, res) {
  const apires = await api.makeRequest("POST", '/v1/api/users/emailotp',
    getQueryParams(req.query), JSON.stringify(req.body));
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.get('/users/emailotp/verify', async function(req, res) {
  const apires = await api.makeRequest("GET", '/v1/api/users/emailotp/verify',
    getQueryParams(req.query), null);
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.get('/users/totpverify', async function(req, res) {
  const apires = await api.makeRequest("GET", '/v1/api/users/totpverify',
    getQueryParams(req.query), null);
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.post('/users/info/email', async function(req, res) {
  const apires = await api.makeRequest("POST", '/v1/api/users/info/email',
    getQueryParams(req.query), JSON.stringify(req.body));
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.get('/users/info/verify', async function(req, res) {
  const apires = await api.makeRequest("GET", '/v1/api/users/info/verify',
    getQueryParams(req.query), null);
  if (apires.statusCode) {
    res.status(apires.statusCode).json(apires.result);
  } else {
    res.status(400).json(apires);
  }
});

router.post('/callback', function(req, res) {
  console.log('callback ->', req.body);

  const checksum = req.get('X-CHECKSUM');
  const payload = JSON.stringify(req.body) + cfg.api_secret;
  const buff = Buffer.from(crypto.createHash('sha256').update(payload).digest());
  const checksumVerf = buff.toString('base64').replace(/\+/g, "-").replace(/\//g, "_");
  if (checksum !== checksumVerf) {
    res.status(400).send('Bad checksum');
    return;
  }
  res.status(200).send('OK');
});

module.exports = router;
