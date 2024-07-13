// models/Form.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

interface IForm extends Document {
    dateofapplication: string;
    position: string;
    fullname: string;
    nationality: string;
    address: string;
    phonenumber: string;
    email: string;
    DOB: string;
    drivinglicense: string;
}

const FormSchema: Schema = new Schema({
  dateofapplication: { type: String, required: true },
  position: { type: String, required: true },
  fullname: { type: String, required: true },
  nationality: { type: String, required: true },
  address: { type: String, required: true },
  phonenumber: { type: String, required: true },
  email: { type: String, required: true },
  DOB: { type: String, required: true },
  drivinglicense: { type: String, required: true },
});

const Form: Model<IForm> = mongoose.models.Form || mongoose.model<IForm>('Form', FormSchema);
export default Form;
