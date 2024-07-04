import Worker from "../models/Worker.js";

export const getWorkers = async (req, res) => {
  try {
    const { loc, WoRk } = req.body;
    const WorkData = await Worker.find({
      status: true,
      district: loc,
      skillset: { $in: [WoRk] }
    });
    res.status(203).json(WorkData);
  } catch (err) {
    res.status(404).json(err);
  }
};

export const ChangeStatus = async (req, res) => {
  try {
    const worker = await Worker.findById(req.body.id);
    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    worker.status = !worker.status
    await worker.save();
    res.status(200).json({ message:worker.status});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};




