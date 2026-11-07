const { describe, it, before, after } = require('node:test');
const assert = require('node:assert');
const http = require('http');
const axios = require('axios');
const app = require('../src/app');

let server;
let baseUrl;

before((_, done) => {
  server = http.createServer(app);
  server.listen(0, () => {
    const port = server.address().port;
    baseUrl = `http://127.0.0.1:${port}/api`;
    done();
  });
});

after((_, done) => {
  server.close(done);
});

describe('Prayer Times API Endpoints', () => {
  it('GET /api/prayer-times returns 400 when coordinates are missing', async () => {
    try {
      await axios.get(`${baseUrl}/prayer-times`);
      assert.fail('Should have failed with 400');
    } catch (err) {
      assert.strictEqual(err.response?.status, 400);
      assert.strictEqual(err.response?.data?.success, false);
      assert.match(err.response?.data?.message, /Latitude and longitude are required/i);
    }
  });

  it('GET /api/prayer-times returns 400 for out-of-range latitude', async () => {
    try {
      await axios.get(`${baseUrl}/prayer-times?latitude=95&longitude=90`);
      assert.fail('Should have failed with 400');
    } catch (err) {
      assert.strictEqual(err.response?.status, 400);
      assert.match(err.response?.data?.message, /Invalid latitude/i);
    }
  });

  it('GET /api/prayer-times returns 200 with normalized timings, hijri, gregorian and meta', async () => {
    const res = await axios.get(`${baseUrl}/prayer-times?latitude=23.8103&longitude=90.4125&method=1&school=1`);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);

    const { data } = res.data;
    assert.ok(data.timings, 'Should have timings');
    assert.ok(data.timings.fajr, 'Should have Fajr');
    assert.ok(data.timings.sunrise, 'Should have Sunrise');
    assert.ok(data.timings.dhuhr, 'Should have Dhuhr');
    assert.ok(data.timings.asr, 'Should have Asr');
    assert.ok(data.timings.maghrib, 'Should have Maghrib');
    assert.ok(data.timings.isha, 'Should have Isha');

    assert.ok(data.date?.gregorian, 'Should have gregorian date');
    assert.ok(data.date?.hijri, 'Should have hijri date');
    assert.ok(data.date?.hijri?.formatted, 'Should have formatted hijri date');

    assert.strictEqual(data.meta.school.id, 1);
    assert.strictEqual(data.meta.school.name, 'Hanafi');
  });

  it('GET /api/prayer-times reflects difference between Hanafi (school=1) and Shafi\'i (school=0) Asr time', async () => {
    const hanafiRes = await axios.get(`${baseUrl}/prayer-times?latitude=23.8103&longitude=90.4125&method=1&school=1`);
    const shafiiRes = await axios.get(`${baseUrl}/prayer-times?latitude=23.8103&longitude=90.4125&method=1&school=0`);

    assert.strictEqual(hanafiRes.status, 200);
    assert.strictEqual(shafiiRes.status, 200);

    // Hanafi Asr is later than Shafi'i Asr
    const hanafiAsr = hanafiRes.data.data.timings.asr;
    const shafiiAsr = shafiiRes.data.data.timings.asr;

    assert.notStrictEqual(hanafiAsr, shafiiAsr, 'Hanafi and Shafi\'i Asr times must differ');
  });

  it('GET /api/prayer-times/methods returns list of calculation methods', async () => {
    const res = await axios.get(`${baseUrl}/prayer-times/methods`);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    assert.ok(Array.isArray(res.data.data), 'Methods must be an array');
    assert.ok(res.data.data.length > 5, 'Should return multiple calculation methods');

    const karachi = res.data.data.find((m) => m.id === 1);
    assert.ok(karachi, 'Must include Karachi method ID 1');
  });

  it('GET /api/location/search returns matching city results', async () => {
    const res = await axios.get(`${baseUrl}/location/search?query=Dhaka`);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    assert.ok(Array.isArray(res.data.data), 'Search results must be an array');
    assert.ok(res.data.data.length > 0, 'Should return at least one match for Dhaka');
    assert.ok(res.data.data[0].latitude, 'Must have latitude');
    assert.ok(res.data.data[0].longitude, 'Must have longitude');
  });

  it('GET /api/location/reverse returns city and country from coordinates', async () => {
    const res = await axios.get(`${baseUrl}/location/reverse?latitude=23.8103&longitude=90.4125`);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    assert.ok(res.data.data.city, 'Must resolve city');
  });
});

