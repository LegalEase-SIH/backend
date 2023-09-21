import mongoose from "mongoose";

interface PetitionAttrs extends mongoose.Document {
  url: string;
  userId: string;
  publicId: string;
  createdAt: Date;
  successRate: number;
  ner: NerAttrs;
}

interface NerAttrs extends mongoose.Document {
  WITNESS: string[];
  OTHER_PERSON: string[];
  STATUTE: string[];
  CASE_NUMBER: string[];
  GPE: string[];
  ORG: string[];
  DATE: string[];
  JUDGE: string[];
  PROVISION: string[];
  PETITIONER: string[];
  RESPONDENT: string[];
  COURT: string[];
  PRECEDENT: string[];
}

const nerSchema = new mongoose.Schema<NerAttrs>({
  WITNESS: [{
    type: String
  }],
  OTHER_PERSON: [{
    type: String
  }],
  STATUTE: [{
    type: String
  }],
  CASE_NUMBER: [
    {
      type: String
    }
  ],
  GPE: [{
    type: String
  }],
  ORG: [{
    type: String
  }],
  DATE: [{
    type: String
  }],
  JUDGE: [{
    type: String
  }],
  PROVISION: [{
    type: String
  }],
  PETITIONER: [{
    type: String
  }],
  RESPONDENT: [{
    type: String
  }],
  COURT: [{
    type: String
  }],
  PRECEDENT: [{
    type: String
  }]
})

interface PetitionModel extends mongoose.Model<PetitionAttrs> { }


const petitionSchema = new mongoose.Schema<PetitionAttrs>({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  publicId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now()
  },
  ner: {
    type: nerSchema,
  },
  successRate: {
    type: Number,
    default: 0,
  }
})

const petitionModel = mongoose.model<PetitionAttrs, PetitionModel>("petition", petitionSchema);

export default petitionModel;
