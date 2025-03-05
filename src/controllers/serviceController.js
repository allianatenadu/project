const store = require('../models/store');

class ServiceController {
  static async getServices(req, res) {
    try {
      const services = [...store.services].sort((a, b) => 
        a.name.localeCompare(b.name)
      );
      
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch services' });
    }
  }
}

module.exports = ServiceController;