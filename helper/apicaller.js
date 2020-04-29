// Copyright (c) 2018-2020 The CYBAVO developers
// All Rights Reserved.
// NOTICE: All information contained herein is, and remains
// the property of CYBAVO and its suppliers,
// if any. The intellectual and technical concepts contained
// herein are proprietary to CYBAVO
// Dissemination of this information or reproduction of this materia
// is strictly forbidden unless prior written permission is obtained
// from CYBAVO.

const https = require('https');
const crypto = require('crypto');
const rs = require('./randstr');
const cfg = require('../models/config');

function buildChecksum(params, secret, t, r, postData) {
  const p = params || [];
  p.push(`t=${t}`, `r=${r}`);
  if (!!postData) {
    p.push(postData);
  }
  p.sort();
  p.push(`secret=${secret}`);
  return crypto.createHash('sha256').update(p.join('&')).digest('hex');
}

function tryParseJSON(s) {
  try {
    const o = JSON.parse(s);
    if (o && typeof o === 'object') {
      return o;
    }
  } catch (e) {}
  return s;
}

function doRequest(url, options, postData) {
  console.log(`request -> ${url}, options -> `, options, `, postData -> ${postData}`);
  return new Promise((resolve, reject) => {
    let req = https.request(url, options, (res) => {
      let resData = [];
      res.on('data', (fragments) => {
        resData.push(fragments);
      });
      res.on('end', () => {
        let resBody = Buffer.concat(resData);
        resolve({ result: tryParseJSON(resBody.toString()), statusCode: res.statusCode });
      });
      res.on('error', (error) => {
        reject(error);
      });
    });
    req.on('error', (error) => {
      reject(error);
    });
    if (!!postData) {
      req.write(postData);
    }
    req.end();
  });
}

module.exports.makeRequest = async function (method, api, params, postData) {
  if (method === '' || api === '') {
    return { error: 'invalid parameters' };
  }
  const r = rs.randomString(8);
  const t = Math.floor(Date.now()/1000);
  let url = `${cfg.api_server_url}${api}?t=${t}&r=${r}`;
  if (!!params) {
    url += `&${params.join('&')}`;
  }
  const options = {
    method,
    headers: {
      'X-API-CODE': cfg.api_code,
      'X-CHECKSUM': buildChecksum(params, cfg.api_secret, t, r, postData)
    },
  };
  if (method === 'POST' || method === 'DELETE') {
    options.headers['Content-Type'] = 'application/json';
    if (!!postData.length) {
      options.headers['Content-Length'] = postData.length;
    }
  }

  try {
    let result = await doRequest(url, options, postData);
    return tryParseJSON(result);
  } catch(error) {
    return tryParseJSON(error);
  }
}
