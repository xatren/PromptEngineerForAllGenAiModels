import mongoose from 'mongoose';

const promptSchema = mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
    },
    useCase: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    tips: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Prompt = mongoose.model('Prompt', promptSchema);

export default Prompt; 