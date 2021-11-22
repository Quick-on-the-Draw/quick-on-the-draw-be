const Drawing = require('../models/Drawing.js');

module.exports = class DrawingService {
  static async create({ title, createdDate, timerSetting, url }) {
    const newDrawing = await Drawing.insert({
      title,
      createdDate,
      timerSetting,
      url,
    });

    return newDrawing;
  }

  static async get() {
    const allDrawings = await Drawing.get();

    return allDrawings;
  }
};
