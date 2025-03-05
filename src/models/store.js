// In-memory storage
const store = {
  services: [
    {
      id: '1',
      name: 'Facial Treatment',
      description: 'Rejuvenating facial treatment',
      duration: 60,
      price: 99.99
    },
    {
      id: '2',
      name: 'Massage Therapy',
      description: 'Relaxing full body massage',
      duration: 90,
      price: 129.99
    }
  ],
  appointments: []
};

module.exports = store;