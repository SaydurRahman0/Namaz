const ApiResponse = require('../utils/apiResponse');

// Placeholder — data will be added in Phase 05
const duas = [];

function getAll(req, res) {
  const { category, search } = req.query;

  let filtered = [...duas];

  if (category && category !== 'all') {
    filtered = filtered.filter(d => d.category === category);
  }

  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter(d =>
      d.title.en.toLowerCase().includes(term) ||
      d.title.bn.includes(term) ||
      d.transliteration.toLowerCase().includes(term) ||
      d.translation.toLowerCase().includes(term)
    );
  }

  return ApiResponse.success(res, filtered);
}

function getById(req, res) {
  const dua = duas.find(d => d.id === req.params.id);
  if (!dua) {
    return ApiResponse.notFound(res, 'Dua not found');
  }
  return ApiResponse.success(res, dua);
}

module.exports = { getAll, getById };
